import { create } from "zustand";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type EditorValue = string | number | boolean | null | EditorObject | EditorValue[];
export type EditorObject = { [key: string]: EditorValue };
export type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";
export type Viewport = "desktop" | "tablet" | "mobile";
export type PanelId = "design" | "pages" | "navigation" | "blocks" | "images" | null;

export type Selection = {
  path: string;            // e.g. "hero.title"
  type: "text" | "image" | "link" | "section" | "item";
  sectionId?: string;
  rect?: DOMRect;
} | null;

/* ------------------------------------------------------------------ */
/*  History                                                            */
/* ------------------------------------------------------------------ */

type HistoryEntry = { data: EditorObject; label: string; timestamp: number };
const MAX_HISTORY = 50;

/* ------------------------------------------------------------------ */
/*  State shape                                                        */
/* ------------------------------------------------------------------ */

type VisualEditorState = {
  // Project
  projectId: string | null;
  projectName: string;
  templateId: string | null;

  // Data
  data: EditorObject;

  // History
  past: HistoryEntry[];
  future: HistoryEntry[];

  // Save
  saveStatus: SaveStatus;
  saveError: string | null;
  lastSavedAt: string | null;

  // Viewport
  viewport: Viewport;

  // Selection
  selection: Selection;

  // Panels
  activePanel: PanelId;

  // Actions
  init: (projectId: string, projectName: string, templateId: string, data: EditorObject) => void;
  setProjectName: (name: string) => void;
  setViewport: (viewport: Viewport) => void;
  setSelection: (selection: Selection) => void;
  clearSelection: () => void;
  setActivePanel: (panel: PanelId) => void;

  // Data mutations
  updatePath: (path: string, value: EditorValue, label?: string) => void;
  updateDeep: (pathSegments: Array<string | number>, value: EditorValue, label?: string) => void;
  replaceData: (data: EditorObject, label?: string) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Persistence
  queueAutosave: () => void;
  saveNow: () => Promise<boolean>;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function isEditorObject(value: unknown): value is EditorObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Set a value at a dot-separated path (or segment array) in an immutable way */
function setAtPath(root: EditorObject, segments: Array<string | number>, value: EditorValue): EditorObject {
  if (segments.length === 0) return root;
  const clone: EditorObject = { ...root };
   
  let target: any = clone;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isLast = i === segments.length - 1;

    if (isLast) {
      target[seg] = value;
    } else {
      const current = target[seg];
      const next = Array.isArray(current)
        ? [...current]
        : current && typeof current === "object"
          ? { ...current }
          : typeof segments[i + 1] === "number"
            ? []
            : {};
      target[seg] = next;
      target = next;
    }
  }
  return clone;
}

function parsePath(path: string): Array<string | number> {
  return path.split(".").map((s) => {
    const n = Number(s);
    return Number.isInteger(n) && n >= 0 ? n : s;
  });
}

function getAtPath(root: EditorObject, segments: Array<string | number>): EditorValue | undefined {
   
  let current: any = root;
  for (const seg of segments) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[seg];
  }
  return current as EditorValue;
}

/* ------------------------------------------------------------------ */
/*  Autosave plumbing                                                  */
/* ------------------------------------------------------------------ */

let autosaveTimeout: ReturnType<typeof setTimeout> | null = null;
let saveController: AbortController | null = null;
let revision = 0;

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

export const useVisualEditorStore = create<VisualEditorState>((set, get) => ({
  projectId: null,
  projectName: "My Website",
  templateId: null,
  data: {},
  past: [],
  future: [],
  saveStatus: "idle",
  saveError: null,
  lastSavedAt: null,
  viewport: "desktop",
  selection: null,
  activePanel: null,

  /* ---------- Init ---------- */
  init: (projectId, projectName, templateId, data) => {
    revision = 0;
    set({
      projectId,
      projectName,
      templateId,
      data,
      past: [],
      future: [],
      saveStatus: "saved",
      saveError: null,
      lastSavedAt: new Date().toISOString(),
      selection: null,
      activePanel: null,
    });
  },

  setProjectName: (projectName) => set({ projectName }),
  setViewport: (viewport) => set({ viewport }),
  setSelection: (selection) => set({ selection }),
  clearSelection: () => set({ selection: null }),
  setActivePanel: (panel) => {
    const current = get().activePanel;
    set({ activePanel: current === panel ? null : panel });
  },

  /* ---------- Data mutations (with history) ---------- */
  updatePath: (path, value, label) => {
    const { data, past } = get();
    const segments = parsePath(path);
    const newData = setAtPath(data, segments, value);

    const entry: HistoryEntry = { data, label: label ?? `Edit ${path}`, timestamp: Date.now() };
    const newPast = [...past, entry].slice(-MAX_HISTORY);

    set({ data: newData, past: newPast, future: [] });
    get().queueAutosave();
  },

  updateDeep: (pathSegments, value, label) => {
    const { data, past } = get();
    const newData = setAtPath(data, pathSegments, value);
    const pathStr = pathSegments.join(".");

    const entry: HistoryEntry = { data, label: label ?? `Edit ${pathStr}`, timestamp: Date.now() };
    const newPast = [...past, entry].slice(-MAX_HISTORY);

    set({ data: newData, past: newPast, future: [] });
    get().queueAutosave();
  },

  replaceData: (newData, label) => {
    const { data, past } = get();
    const entry: HistoryEntry = { data, label: label ?? "Replace data", timestamp: Date.now() };
    const newPast = [...past, entry].slice(-MAX_HISTORY);
    set({ data: newData, past: newPast, future: [] });
    get().queueAutosave();
  },

  /* ---------- History ---------- */
  undo: () => {
    const { past, data, future } = get();
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const entry: HistoryEntry = { data, label: "Redo point", timestamp: Date.now() };
    set({ data: prev.data, past: newPast, future: [entry, ...future].slice(0, MAX_HISTORY) });
    get().queueAutosave();
  },

  redo: () => {
    const { future, data, past } = get();
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    const entry: HistoryEntry = { data, label: "Undo point", timestamp: Date.now() };
    set({ data: next.data, past: [...past, entry].slice(-MAX_HISTORY), future: newFuture });
    get().queueAutosave();
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  /* ---------- Autosave ---------- */
  queueAutosave: () => {
    if (!get().projectId) return;
    revision += 1;
    if (autosaveTimeout) clearTimeout(autosaveTimeout);
    set({ saveStatus: "dirty", saveError: null });
    autosaveTimeout = setTimeout(() => void get().saveNow(), 1200);
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

/* ------------------------------------------------------------------ */
/*  Convenience exports                                                */
/* ------------------------------------------------------------------ */

export { getAtPath, parsePath, setAtPath };
