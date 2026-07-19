import { create } from "zustand";

export type EditorValue = string | number | boolean | null | EditorObject | EditorValue[];
export type EditorObject = { [key: string]: EditorValue };
export type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

export function isEditorObject(value: unknown): value is EditorObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

type EditorState = {
  projectId: string | null;
  projectName: string;
  viewport: "desktop" | "tablet" | "mobile";
  data: EditorObject;
  saveStatus: SaveStatus;
  saveError: string | null;
  lastSavedAt: string | null;
  setProjectId: (id: string) => void;
  setProjectName: (name: string) => void;
  setViewport: (viewport: "desktop" | "tablet" | "mobile") => void;
  setTemplateData: (data: EditorObject) => void;
  replaceTemplateData: (data: EditorObject) => void;
  updateField: (section: string, field: string, value: EditorValue) => void;
  updateNestedField: (section: string, index: number, field: string, value: EditorValue) => void;
  updatePath: (path: Array<string | number>, value: EditorValue) => void;
  queueAutosave: () => void;
  saveNow: () => Promise<boolean>;
};

let autosaveTimeout: ReturnType<typeof setTimeout> | null = null;
let saveController: AbortController | null = null;
let revision = 0;

function setAtPath(root: EditorObject, path: Array<string | number>, value: EditorValue): EditorObject {
  if (path.length === 0) return root;
  const clone: EditorObject = { ...root };
  let target: EditorObject | EditorValue[] = clone;

  path.forEach((segment, index) => {
    const isLast = index === path.length - 1;
    if (isLast) {
      if (Array.isArray(target) && typeof segment === "number") target[segment] = value;
      else if (!Array.isArray(target) && typeof segment === "string") target[segment] = value;
      return;
    }

    const nextSegment = path[index + 1];
    const current = Array.isArray(target) && typeof segment === "number"
      ? target[segment]
      : !Array.isArray(target) && typeof segment === "string"
        ? target[segment]
        : undefined;
    const next = Array.isArray(current)
      ? [...current]
      : current && typeof current === "object"
        ? { ...current }
        : typeof nextSegment === "number"
          ? []
          : {};

    if (Array.isArray(target) && typeof segment === "number") target[segment] = next;
    else if (!Array.isArray(target) && typeof segment === "string") target[segment] = next;
    target = next;
  });
  return clone;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  projectId: null,
  projectName: "My Website",
  viewport: "desktop",
  data: {},
  saveStatus: "idle",
  saveError: null,
  lastSavedAt: null,
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName) => set({ projectName }),
  setViewport: (viewport) => set({ viewport }),
  setTemplateData: (data) => {
    revision = 0;
    set({ data, saveStatus: "saved", saveError: null, lastSavedAt: new Date().toISOString() });
  },
  replaceTemplateData: (data) => {
    revision += 1;
    set({ data, saveStatus: "dirty", saveError: null });
    get().queueAutosave();
  },

  updateField: (section, field, value) => {
    set((state) => ({ data: setAtPath(state.data, [section, field], value) }));
    get().queueAutosave();
  },
  updateNestedField: (section, index, field, value) => {
    set((state) => ({ data: setAtPath(state.data, [section, index, field], value) }));
    get().queueAutosave();
  },
  updatePath: (path, value) => {
    set((state) => ({ data: setAtPath(state.data, path, value) }));
    get().queueAutosave();
  },

  queueAutosave: () => {
    if (!get().projectId) return;
    revision += 1;
    if (autosaveTimeout) clearTimeout(autosaveTimeout);
    set({ saveStatus: "dirty", saveError: null });
    autosaveTimeout = setTimeout(() => void get().saveNow(), 900);
  },

  saveNow: async () => {
    const { projectId, data } = get();
    if (!projectId) return false;
    if (autosaveTimeout) clearTimeout(autosaveTimeout);
    autosaveTimeout = null;
    saveController?.abort();
    saveController = new AbortController();
    const savingRevision = revision;
    set({ saveStatus: "saving", saveError: null });

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editableData: data }),
        signal: saveController.signal,
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "The project could not be saved.");

      if (savingRevision === revision) {
        set({ saveStatus: "saved", saveError: null, lastSavedAt: new Date().toISOString() });
      } else {
        set({ saveStatus: "dirty" });
        get().queueAutosave();
      }
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return false;
      set({
        saveStatus: "error",
        saveError: error instanceof Error ? error.message : "The project could not be saved.",
      });
      return false;
    }
  },
}));
