import { useState } from "react";
import type { Color } from "../types/color";

interface ColorCardProps {
  color: Color;
  onToggleLock: (id: number) => void;
}

function ColorCard({ color, onToggleLock }: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="color-card">
      <div
        className="color-preview"
        style={{ backgroundColor: color.hex }}
      />

      <div className="color-info">
        <h2>{color.hex}</h2>

        <div className="color-actions">
          <button onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={() => onToggleLock(color.id)}
            className={color.locked ? "locked" : ""}
          >
            {color.locked ? "🔒 Unlock" : "🔓 Lock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorCard;