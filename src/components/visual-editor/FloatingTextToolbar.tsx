"use client";

import { useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Bold, Copy, Italic, Link, RotateCcw, Trash2, Type, Underline } from "lucide-react";
import { getTypographyLibrary } from "@/lib/typography";

type StyleMetadata = {
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  fontFamily?: string;
};

type Props = {
  position: { top: number; left: number };
  visible: boolean;
  style?: StyleMetadata;
  hrefPath?: string;
  targetPath?: string;
  onFontSize?: (value: string) => void;
  onFontFamily?: (value: string) => void;
  onTextStyle?: (value: "paragraph" | "heading1" | "heading2" | "heading3") => void;
  onBold?: () => void;
  onItalic?: () => void;
  onUnderline?: () => void;
  onColor?: (value: string) => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onLineHeight?: (value: string) => void;
  onLetterSpacing?: (value: string) => void;
  onLink?: (href: string) => void;
  onTarget?: (target: string) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
};

export default function FloatingTextToolbar({
  position,
  style,
  hrefPath,
  targetPath,
  onFontSize,
  onFontFamily,
  onTextStyle,
  onBold,
  onItalic,
  onUnderline,
  onColor,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onLineHeight,
  onLetterSpacing,
  onLink,
  onTarget,
  onDuplicate,
  onDelete,
  onReset,
  visible,
}: Props) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  if (!visible) return null;

  const fontSize = style?.fontSize?.replace("px", "") ?? "";
  const letterSpacing = style?.letterSpacing?.replace("px", "") ?? "";
  const lineHeight = style?.lineHeight ?? "";

  return (
    <div
      className="ve-floating-toolbar"
      data-editor-ui
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Text formatting"
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {onTextStyle && (
        <select
          className="ve-floating-toolbar__select"
          aria-label="Text style"
          value=""
          onChange={(event) => {
            const value = event.target.value as "paragraph" | "heading1" | "heading2" | "heading3";
            if (value) onTextStyle(value);
          }}
        >
          <option value="">Style</option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="paragraph">Paragraph</option>
        </select>
      )}

      {onFontFamily && (
        <select
          className="ve-floating-toolbar__select"
          aria-label="Font family"
          value={style?.fontFamily ?? ""}
          onChange={(event) => onFontFamily(event.target.value)}
        >
          <option value="">Font</option>
          {getTypographyLibrary().map((pairing) => (
            <option key={pairing.id} value={`"${pairing.headingFont}", sans-serif`}>
              {pairing.headingFont}
            </option>
          ))}
        </select>
      )}

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
      {onUnderline && (
        <button type="button" onClick={onUnderline} className={`ve-floating-toolbar__btn ${style?.textDecoration === "underline" ? "ve-floating-toolbar__btn--active" : ""}`} aria-label="Underline" title="Underline">
          <Underline size={14} />
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

      {onColor && (
        <label className="ve-floating-toolbar__color" title="Text colour">
          <input
            aria-label="Text colour"
            type="color"
            value={style?.color && /^#[0-9a-f]{6}$/i.test(style.color) ? style.color : "#111827"}
            onChange={(event) => onColor(event.target.value)}
          />
        </label>
      )}

      {onLineHeight && (
        <label className="ve-floating-toolbar__field ve-floating-toolbar__field--compact" title="Line height">
          <span>LH</span>
          <input
            aria-label="Line height"
            inputMode="decimal"
            value={lineHeight}
            placeholder="1.2"
            onChange={(event) => {
              const value = event.target.value.trim();
              if (/^\d?(\.\d{0,2})?$/.test(value)) onLineHeight(value);
            }}
          />
        </label>
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
            onClick={() => setLinkOpen((open) => !open)}
            className="ve-floating-toolbar__btn"
            aria-label="Edit link"
            title="Edit link"
          >
            <Link size={14} />
          </button>
          {linkOpen && (
            <div className="ve-link-popover" role="dialog" aria-label="Edit link">
              <label className="ve-field-label">
                Destination
                <input
                  value={linkValue}
                  placeholder="https://example.com, /about, #contact, mailto:hello@example.com, tel:+1234567890"
                  onChange={(event) => setLinkValue(event.target.value.slice(0, 500))}
                />
              </label>
              <div className="ve-link-popover__presets">
                <button type="button" onClick={() => setLinkValue("/")}>Home</button>
                <button type="button" onClick={() => setLinkValue("#contact")}>Section</button>
                <button type="button" onClick={() => setLinkValue("mailto:")}>Email</button>
                <button type="button" onClick={() => setLinkValue("tel:")}>Phone</button>
              </div>
              {targetPath && onTarget && (
                <label className="ve-check-row">
                  <input type="checkbox" onChange={(event) => onTarget(event.target.checked ? "_blank" : "")} />
                  Open in new tab
                </label>
              )}
              <div className="ve-link-popover__actions">
                <button type="button" onClick={() => { onLink(linkValue.trim() || "#"); setLinkOpen(false); }}>Save</button>
                <button type="button" onClick={() => { onLink("#"); setLinkValue(""); }}>Remove link</button>
                <button type="button" onClick={() => setLinkOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}

      {(onDuplicate || onReset || onDelete) && <div className="ve-floating-toolbar__divider" />}

      {onDuplicate && (
        <button type="button" onClick={onDuplicate} className="ve-floating-toolbar__btn" aria-label="Duplicate" title="Duplicate repeated item">
          <Copy size={14} />
        </button>
      )}

      {onReset && (
        <button type="button" onClick={onReset} className="ve-floating-toolbar__btn" aria-label="Reset" title="Reset">
          <RotateCcw size={14} />
        </button>
      )}

      {onDelete && (
        <button type="button" onClick={onDelete} className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" aria-label="Delete" title="Delete">
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
