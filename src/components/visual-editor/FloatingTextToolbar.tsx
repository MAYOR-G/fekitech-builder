"use client";

import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Link, Type } from "lucide-react";

type StyleMetadata = {
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  letterSpacing?: string;
};

type Props = {
  position: { top: number; left: number };
  visible: boolean;
  style?: StyleMetadata;
  hrefPath?: string;
  onFontSize?: (value: string) => void;
  onBold?: () => void;
  onItalic?: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onLetterSpacing?: (value: string) => void;
  onLink?: (href: string) => void;
};

export default function FloatingTextToolbar({
  position,
  style,
  hrefPath,
  onFontSize,
  onBold,
  onItalic,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onLetterSpacing,
  onLink,
  visible,
}: Props) {
  if (!visible) return null;

  const fontSize = style?.fontSize?.replace("px", "") ?? "";
  const letterSpacing = style?.letterSpacing?.replace("px", "") ?? "";

  return (
    <div
      className="ve-floating-toolbar"
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Text formatting"
    >
      {onFontSize && (
        <label className="ve-floating-toolbar__field" title="Font size">
          <Type size={13} />
          <input
            aria-label="Font size"
            inputMode="numeric"
            value={fontSize}
            placeholder="Auto"
            onChange={(event) => {
              const value = event.target.value.trim();
              if (/^\d{0,3}$/.test(value)) onFontSize(value ? `${value}px` : "");
            }}
          />
        </label>
      )}

      {onBold && (
        <button type="button" onClick={onBold} className={`ve-floating-toolbar__btn ${style?.fontWeight === "700" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Bold" title="Bold">
          <Bold size={14} />
        </button>
      )}
      {onItalic && (
        <button type="button" onClick={onItalic} className={`ve-floating-toolbar__btn ${style?.fontStyle === "italic" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Italic" title="Italic">
          <Italic size={14} />
        </button>
      )}

      <div className="ve-floating-toolbar__divider" />

      {onAlignLeft && (
        <button type="button" onClick={onAlignLeft} className={`ve-floating-toolbar__btn ${style?.textAlign === "left" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Align left">
          <AlignLeft size={14} />
        </button>
      )}
      {onAlignCenter && (
        <button type="button" onClick={onAlignCenter} className={`ve-floating-toolbar__btn ${style?.textAlign === "center" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Align center">
          <AlignCenter size={14} />
        </button>
      )}
      {onAlignRight && (
        <button type="button" onClick={onAlignRight} className={`ve-floating-toolbar__btn ${style?.textAlign === "right" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Align right">
          <AlignRight size={14} />
        </button>
      )}

      {onLetterSpacing && (
        <label className="ve-floating-toolbar__field ve-floating-toolbar__field--compact" title="Letter spacing">
          <span>AV</span>
          <input
            aria-label="Letter spacing"
            inputMode="numeric"
            value={letterSpacing}
            placeholder="0"
            onChange={(event) => {
              const value = event.target.value.trim();
              if (/^-?\d{0,2}$/.test(value)) onLetterSpacing(value ? `${value}px` : "");
            }}
          />
        </label>
      )}

      {hrefPath && onLink && (
        <>
          <div className="ve-floating-toolbar__divider" />
          <button
            type="button"
            onClick={() => {
              const href = window.prompt("Link destination");
              if (href) onLink(href);
            }}
            className="ve-floating-toolbar__btn"
            aria-label="Edit link"
            title="Edit link"
          >
            <Link size={14} />
          </button>
        </>
      )}
    </div>
  );
}
