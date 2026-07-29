"use client";

import { AlignCenter, AlignLeft, AlignRight, Link, RotateCcw, Trash2 } from "lucide-react";

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
  onDelete,
  onReset,
}: {
  visible: boolean;
  position: { top: number; left: number };
  style?: IconStyle;
  hrefPath?: string;
  onStyle: (style: IconStyle) => void;
  onLink?: (href: string) => void;
  onDelete?: () => void;
  onReset?: () => void;
}) {
  if (!visible) return null;
  const size = style?.fontSize?.replace("px", "") || style?.width?.replace("px", "") || "";

  return (
    <div className="ve-floating-toolbar" style={{ top: position.top, left: position.left }} role="toolbar" aria-label="Icon options">
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
          <button type="button" onClick={() => {
            const href = window.prompt("Icon link");
            if (href) onLink(href);
          }} className="ve-floating-toolbar__btn" aria-label="Edit link"><Link size={14} /></button>
        </>
      ) : null}
      <div className="ve-floating-toolbar__divider" />
      {onReset ? <button type="button" onClick={onReset} className="ve-floating-toolbar__btn" aria-label="Reset icon"><RotateCcw size={14} /></button> : null}
      {onDelete ? <button type="button" onClick={onDelete} className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" aria-label="Delete icon"><Trash2 size={14} /></button> : null}
    </div>
  );
}
