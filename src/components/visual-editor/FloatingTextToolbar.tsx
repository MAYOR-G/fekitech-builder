"use client";

import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";

type Props = {
  position: { top: number; left: number };
  onBold?: () => void;
  onItalic?: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onDelete?: () => void;
  visible: boolean;
};

export default function FloatingTextToolbar({
  position,
  onBold,
  onItalic,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onDelete,
  visible,
}: Props) {
  if (!visible) return null;

  return (
    <div
      className="ve-floating-toolbar"
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Text formatting"
    >
      {onBold && (
        <button type="button" onClick={onBold} className="ve-floating-toolbar__btn" aria-label="Bold" title="Bold">
          <Bold size={14} />
        </button>
      )}
      {onItalic && (
        <button type="button" onClick={onItalic} className="ve-floating-toolbar__btn" aria-label="Italic" title="Italic">
          <Italic size={14} />
        </button>
      )}

      <div className="ve-floating-toolbar__divider" />

      {onAlignLeft && (
        <button type="button" onClick={onAlignLeft} className="ve-floating-toolbar__btn" aria-label="Align left">
          <AlignLeft size={14} />
        </button>
      )}
      {onAlignCenter && (
        <button type="button" onClick={onAlignCenter} className="ve-floating-toolbar__btn" aria-label="Align center">
          <AlignCenter size={14} />
        </button>
      )}
      {onAlignRight && (
        <button type="button" onClick={onAlignRight} className="ve-floating-toolbar__btn" aria-label="Align right">
          <AlignRight size={14} />
        </button>
      )}

      {onDelete && (
        <>
          <div className="ve-floating-toolbar__divider" />
          <button type="button" onClick={onDelete} className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" aria-label="Delete">
            <Trash2 size={14} />
          </button>
        </>
      )}
    </div>
  );
}
