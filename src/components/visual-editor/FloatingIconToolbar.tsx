"use client";

import { useMemo, useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Copy, Link, RotateCcw, Search, Trash2 } from "lucide-react";
import { EDITOR_ICONS, iconSvg } from "@/lib/icon-library";

type IconStyle = {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  margin?: string;
};

export default function FloatingIconToolbar({
  visible,
  position,
  style,
  hrefPath,
  onStyle,
  onLink,
  onIcon,
  onDuplicate,
  onDelete,
  onReset,
}: {
  visible: boolean;
  position: { top: number; left: number };
  style?: IconStyle;
  hrefPath?: string;
  onStyle: (style: IconStyle) => void;
  onLink?: (href: string) => void;
  onIcon?: (name: string) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
}) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const filteredIcons = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return EDITOR_ICONS;
    return EDITOR_ICONS.filter((icon) => `${icon.name} ${icon.category}`.toLowerCase().includes(needle));
  }, [query]);

  if (!visible) return null;
  const size = style?.fontSize?.replace("px", "") || style?.width?.replace("px", "") || "";

  return (
    <div
      className="ve-floating-toolbar"
      data-editor-ui
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Icon options"
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {onIcon ? (
        <button type="button" onClick={() => setLibraryOpen((open) => !open)} className="ve-floating-toolbar__btn" aria-label="Replace icon" title="Replace icon">
          <Search size={14} />
        </button>
      ) : null}
      <label className="ve-floating-toolbar__field" title="Icon size">
        <span>PX</span>
        <input
          aria-label="Icon size"
          inputMode="numeric"
          value={size}
          placeholder="Auto"
          onChange={(event) => {
            const value = event.target.value.trim();
            if (/^\d{0,3}$/.test(value)) onStyle({ ...style, fontSize: value ? `${value}px` : "", width: value ? `${value}px` : "", height: value ? `${value}px` : "" });
          }}
        />
      </label>
      <label className="ve-floating-toolbar__color" title="Icon colour">
        <input
          aria-label="Icon colour"
          type="color"
          value={style?.color && /^#[0-9a-f]{6}$/i.test(style.color) ? style.color : "#111827"}
          onChange={(event) => onStyle({ ...style, color: event.target.value })}
        />
      </label>
      <div className="ve-floating-toolbar__divider" />
      <button type="button" onClick={() => onStyle({ ...style, textAlign: "left" })} className="ve-floating-toolbar__btn" aria-label="Align left"><AlignLeft size={14} /></button>
      <button type="button" onClick={() => onStyle({ ...style, textAlign: "center" })} className="ve-floating-toolbar__btn" aria-label="Align center"><AlignCenter size={14} /></button>
      <button type="button" onClick={() => onStyle({ ...style, textAlign: "right" })} className="ve-floating-toolbar__btn" aria-label="Align right"><AlignRight size={14} /></button>
      {hrefPath && onLink ? (
        <>
          <div className="ve-floating-toolbar__divider" />
          <button type="button" onClick={() => setLinkOpen((open) => !open)} className="ve-floating-toolbar__btn" aria-label="Edit link"><Link size={14} /></button>
        </>
      ) : null}
      <div className="ve-floating-toolbar__divider" />
      {onDuplicate ? <button type="button" onClick={onDuplicate} className="ve-floating-toolbar__btn" aria-label="Duplicate icon"><Copy size={14} /></button> : null}
      {onReset ? <button type="button" onClick={onReset} className="ve-floating-toolbar__btn" aria-label="Reset icon"><RotateCcw size={14} /></button> : null}
      {onDelete ? <button type="button" onClick={onDelete} className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" aria-label="Delete icon"><Trash2 size={14} /></button> : null}
      {libraryOpen && onIcon ? (
        <div className="ve-icon-popover" role="dialog" aria-label="Icon library">
          <label className="ve-field-label">
            Search icons
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Business, contact, food, arrows..." />
          </label>
          <div className="ve-icon-grid">
            {filteredIcons.slice(0, 48).map((icon) => (
              <button key={icon.name} type="button" onClick={() => { onIcon(icon.name); setLibraryOpen(false); }} title={`${icon.name} - ${icon.category}`}>
                <span dangerouslySetInnerHTML={{ __html: iconSvg(icon.name) }} />
                <small>{icon.name}</small>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {linkOpen && onLink ? (
        <div className="ve-link-popover" role="dialog" aria-label="Edit icon link">
          <label className="ve-field-label">
            Destination
            <input value={linkValue} placeholder="https://, /about, #contact, mailto:, tel:" onChange={(event) => setLinkValue(event.target.value.slice(0, 500))} />
          </label>
          <div className="ve-link-popover__actions">
            <button type="button" onClick={() => { onLink(linkValue.trim() || "#"); setLinkOpen(false); }}>Save</button>
            <button type="button" onClick={() => { onLink("#"); setLinkValue(""); }}>Remove link</button>
            <button type="button" onClick={() => setLinkOpen(false)}>Cancel</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
