import type { Color } from "../types/color";
import ColorCard from "./ColorCard";

interface PaletteProps {
  colors: Color[];
  onToggleLock: (id: number) => void;
}

function Palette({ colors, onToggleLock }: PaletteProps) {
  return (
    <div className="palette">
      {colors.map((color) => (
        <ColorCard
          key={color.id}
          color={color}
          onToggleLock={onToggleLock}
        />
      ))}
    </div>
  );
}

export default Palette;