import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export type StoredObject = { body: Buffer; contentType: string };

type StorageDriver = {
  put(key: string, body: Buffer, contentType: string): Promise<void>;
  get(key: string, contentType: string): Promise<StoredObject | null>;
  delete(key: string): Promise<void>;
};

function localRoot(): string {
  const root = path.resolve(process.cwd(), process.env.UPLOAD_LOCAL_DIRECTORY ?? ".data/uploads");
  const projectRoot = `${path.resolve(process.cwd())}${path.sep}`;
  if (!`${root}${path.sep}`.startsWith(projectRoot)) {
    throw new Error("UPLOAD_LOCAL_DIRECTORY must be inside the project directory.");
  }
  return root;
}

function localPath(key: string): string {
  if (!/^[a-zA-Z0-9/_-]+\.[a-z0-9]+$/.test(key) || key.includes("..")) {
    throw new Error("Invalid storage key.");
  }
  const result = path.resolve(localRoot(), key);
  if (!result.startsWith(`${localRoot()}${path.sep}`)) throw new Error("Invalid storage key.");
  return result;
}

const localDriver: StorageDriver = {
  async put(key, body) {
    const target = localPath(key);
    await fs.mkdir(path.dirname(target), { recursive: true, mode: 0o700 });
    await fs.writeFile(target, body, { mode: 0o600 });
  },
  async get(key, contentType) {
    try {
      return { body: await fs.readFile(localPath(key)), contentType };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  },
  async delete(key) {
    try {
      await fs.unlink(localPath(key));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  },
};

function s3Driver(): StorageDriver {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  if (!bucket || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 storage is not fully configured.");
  }

  const client = new S3Client({
    region,
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    credentials: { accessKeyId, secretAccessKey },
  });

  return {
    async put(key, body, contentType) {
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }));
    },
    async get(key, contentType) {
      try {
        const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        if (!result.Body) return null;
        return {
          body: Buffer.from(await result.Body.transformToByteArray()),
          contentType: result.ContentType ?? contentType,
        };
      } catch (error) {
        if ((error as { name?: string }).name === "NoSuchKey") return null;
        throw error;
      }
    },
    async delete(key) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    },
  };
}

export function getStorage(): StorageDriver {
  const driver = process.env.UPLOAD_STORAGE_DRIVER ?? "local";
  if (driver === "s3") return s3Driver();
  if (driver === "local" && process.env.NODE_ENV !== "production") return localDriver;
  throw new Error("Production uploads require UPLOAD_STORAGE_DRIVER=s3.");
}
