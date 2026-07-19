import { z } from "zod";
import type { Prisma } from "@/generated/prisma";

export const projectIdSchema = z.string().cuid();
export const projectNameSchema = z.string().trim().min(1).max(120);

export const createProjectSchema = z.object({
  templateId: z.string().trim().min(1).max(80).regex(/^[a-z0-9-]+$/),
  name: projectNameSchema.optional(),
}).strict();

export const updateProjectSchema = z.object({
  name: projectNameSchema.optional(),
  editableData: z.record(z.string(), z.unknown()).optional(),
  subdomain: z.string().trim().max(63).nullable().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, "At least one field is required.");

export const createVersionSchema = z.object({
  versionName: z.string().trim().min(1).max(120),
}).strict();

export const restoreVersionSchema = z.object({
  versionId: z.string().cuid(),
}).strict();

type JsonValidationState = { nodes: number };

function validateJsonNode(value: unknown, depth: number, state: JsonValidationState): boolean {
  state.nodes += 1;
  if (state.nodes > 5000 || depth > 12) return false;
  if (value === null || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return value.length <= 20_000;
  if (Array.isArray(value)) {
    if (value.length > 500) return false;
    return value.every((entry) => validateJsonNode(entry, depth + 1, state));
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length > 500) return false;
    return entries.every(([key, entry]) => key.length <= 120 && validateJsonNode(entry, depth + 1, state));
  }
  return false;
}

export function isValidEditableData(value: unknown): value is Prisma.InputJsonObject {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return validateJsonNode(value, 0, { nodes: 0 });
}

export function databaseJsonObject(value: Prisma.JsonValue): Prisma.InputJsonObject {
  if (!isValidEditableData(value)) throw new Error("Stored project data is not a JSON object.");
  return value;
}
