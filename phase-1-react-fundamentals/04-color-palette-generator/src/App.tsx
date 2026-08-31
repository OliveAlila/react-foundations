import { useState } from "react";
import Palette from "./components/Palette";
import type { Color } from "./types/color";
import "./App.css";

function generateRandomColor(): string {
  const characters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function createInitialPalette(): Color[] {
  return Array.from({ length: 5 }, (_, index) => ({
    id: index,
    hex: generateRandomColor(),
    locked: false,
  }));
}

function App() {
  const [colors, setColors] = useState<Color[]>(
    createInitialPalette
  );

  const generatePalette = () => {
    setColors((currentColors) =>
      currentColors.map((color) => {
        if (color.locked) {
          return color;
        }

        return {
          ...color,
          hex: generateRandomColor(),
        };
      })
    );
  };

  const toggleLock = (id: number) => {
    setColors((currentColors) =>
      currentColors.map((color) =>
        color.id === id
          ? { ...color, locked: !color.locked }
          : color
      )
    );
  };

  return (
    <main className="app">
      <div className="header">
        <h1>Color Palette Generator</h1>

        <p>
          Generate beautiful color palettes and copy your favorite
          colors.
        </p>

        <button className="generate-button" onClick={generatePalette}>
          Generate Palette
        </button>
      </div>

      <Palette
        colors={colors}
        onToggleLock={toggleLock}
      />
    </main>
  );
}

export default App;