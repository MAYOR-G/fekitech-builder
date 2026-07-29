"use client";

import { useState } from "react";
import { Check, Palette, RotateCcw, Type, X } from "lucide-react";
import { getPalettesByGroup, paletteToEditorColors, type Palette as PaletteType } from "@/lib/palettes";
import { fontStack, getTypographyLibrary, googleFontsHref, ORIGINAL_TYPOGRAPHY, type TypographyPairing } from "@/lib/typography";
import { useVisualEditorStore } from "@/store/visualEditorStore";
import { getTemplate } from "@/registry";

type Tab = "colors" | "fonts";

export default function DesignPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("colors");

  return (
    <div className="ve-panel" data-editor-ui onMouseDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
      <div className="ve-panel__header">
        <h2 className="ve-panel__title">Design</h2>
        <button type="button" onClick={onClose} className="ve-toolbar__btn" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      <div className="ve-panel__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "colors"}
          onClick={() => setTab("colors")}
          className={`ve-panel__tab ${tab === "colors" ? "ve-panel__tab--active" : ""}`}
        >
          <Palette size={14} /> Colors
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "fonts"}
          onClick={() => setTab("fonts")}
          className={`ve-panel__tab ${tab === "fonts" ? "ve-panel__tab--active" : ""}`}
        >
          <Type size={14} /> Fonts
        </button>
      </div>

      <div className="ve-panel__body">
        {tab === "colors" ? <PaletteSelector /> : <TypographySelector />}
      </div>
    </div>
  );
}

/* ── Palette Selector ── */

function PaletteSelector() {
  const updatePath = useVisualEditorStore((s) => s.updatePath);
  const undo = useVisualEditorStore((s) => s.undo);
  const data = useVisualEditorStore((s) => s.data);
  const templateId = useVisualEditorStore((s) => s.templateId);
  const currentPrimary = (data.colors && typeof data.colors === "object" && !Array.isArray(data.colors))
    ? (data.colors as Record<string, unknown>).primary
    : undefined;

  const groups = getPalettesByGroup();

  const applyPalette = (palette: PaletteType) => {
    const colors = paletteToEditorColors(palette.tokens);
    updatePath("colors", colors, `Apply palette: ${palette.name}`);
  };

  const restoreOriginal = () => {
    const originalColors = templateId ? getTemplate(templateId)?.defaultData.colors : undefined;
    if (originalColors && typeof originalColors === "object" && !Array.isArray(originalColors)) {
      updatePath("colors", originalColors, "Restore original palette");
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-[#8B8B9E]">
        Choose a palette to instantly update your entire site&apos;s color scheme.
      </p>
      <div>
        <h3 className="ve-panel__group-label">Original</h3>
        <button type="button" onClick={restoreOriginal} className="ve-palette-card" title="Restore original colours">
          <div className="ve-palette-card__swatches">
            <span style={{ background: "#FFFFFF" }} />
            <span style={{ background: "#111827" }} />
            <span style={{ background: "#6C5CE7" }} />
            <span style={{ background: "#E5E7EB" }} />
            <span style={{ background: "#64748B" }} />
          </div>
          <span className="ve-palette-card__name">Original colours</span>
          <RotateCcw size={12} className="text-[#8B8B9E]" />
        </button>
      </div>
      {Array.from(groups.entries()).map(([group, palettes]) => (
        <div key={group}>
          <h3 className="ve-panel__group-label">{group}</h3>
          <div className="grid grid-cols-2 gap-2">
            {palettes.map((palette) => {
              const isActive = currentPrimary === palette.tokens.accent;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => applyPalette(palette)}
                  className={`ve-palette-card ${isActive ? "ve-palette-card--active" : ""}`}
                  title={palette.name}
                >
                  <div className="ve-palette-card__swatches">
                    <span style={{ background: palette.tokens.background }} />
                    <span style={{ background: palette.tokens.sectionAlt }} />
                    <span style={{ background: palette.tokens.card }} />
                    <span style={{ background: palette.tokens.textPrimary }} />
                    <span style={{ background: palette.tokens.accent }} />
                    <span style={{ background: palette.tokens.accentSecondary }} />
                    <span style={{ background: palette.tokens.buttonBg }} />
                  </div>
                  <span className="ve-palette-card__name">{palette.name}</span>
                  {isActive && <Check size={12} className="text-[#6C5CE7]" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="ve-panel__footer-actions">
        <button type="button" className="ve-mini-action" onClick={() => void useVisualEditorStore.getState().saveNow()}>Save</button>
        <button type="button" className="ve-mini-action" onClick={undo}>Undo</button>
      </div>
    </div>
  );
}

/* ── Typography Selector ── */

function TypographySelector() {
  const updatePath = useVisualEditorStore((s) => s.updatePath);
  const undo = useVisualEditorStore((s) => s.undo);
  const data = useVisualEditorStore((s) => s.data);
  const currentTypography = data.typography as TypographyPairing | undefined;
  const pairings = getTypographyLibrary();

  const applyTypography = (pairing: TypographyPairing) => {
    updatePath("typography", pairing, `Apply typography: ${pairing.name}`);
  };

  const restoreOriginal = () => {
    updatePath("typography", null, "Restore original typography");
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-[#8B8B9E]">
        Select a curated font pairing to update headings, body text, and navigation.
      </p>
      <div>
        <h3 className="ve-panel__group-label">Original</h3>
        <TypographyCard pairing={ORIGINAL_TYPOGRAPHY} isActive={!currentTypography} onApply={restoreOriginal} />
      </div>
      <div>
        <h3 className="ve-panel__group-label">Font pairs</h3>
        <div className="space-y-2">
          {pairings.map((pairing) => (
            <TypographyCard
              key={pairing.id}
              pairing={pairing}
              isActive={currentTypography?.id === pairing.id}
              onApply={() => applyTypography(pairing)}
            />
          ))}
        </div>
      </div>
      <div className="ve-panel__footer-actions">
        <button type="button" className="ve-mini-action" onClick={() => void useVisualEditorStore.getState().saveNow()}>Save</button>
        <button type="button" className="ve-mini-action" onClick={undo}>Undo</button>
      </div>
    </div>
  );
}

function TypographyCard({
  pairing,
  isActive,
  onApply,
}: {
  pairing: TypographyPairing;
  isActive: boolean;
  onApply: () => void;
}) {
  const fontHref = googleFontsHref(pairing);
  const headingFamily = fontStack(pairing.headingFont, "serif");
  const bodyFamily = fontStack(pairing.bodyFont);

  return (
    <button
      type="button"
      onClick={onApply}
      className={`ve-typo-card ${isActive ? "ve-typo-card--active ring-2 ring-[#6C5CE7]" : ""}`}
      title={`Apply ${pairing.name} typography`}
    >
      {fontHref && <link rel="stylesheet" href={fontHref} />}
      <div className="min-w-0 flex-1">
        <span className="ve-typo-card__name flex items-center gap-2">
          {pairing.name}
          {isActive && <Check size={12} className="text-[#6C5CE7]" />}
        </span>
        <span className="ve-typo-card__preview-heading" style={{ fontFamily: headingFamily, fontWeight: pairing.headingWeight }}>Heading</span>
        <span className="ve-typo-card__preview-body" style={{ fontFamily: bodyFamily, lineHeight: pairing.lineHeight }}>
          This is a paragraph. Describe the product listing and customer benefit.
        </span>
      </div>
    </button>
  );
}
