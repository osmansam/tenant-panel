import type { GridDirection } from "../layout";

const labels: Record<GridDirection, string> = {
  left: "←",
  right: "→",
  up: "↑",
  down: "↓",
};

export function GridMoveControls({
  onMove,
  disabled,
}: {
  onMove(direction: GridDirection): void;
  disabled: Record<GridDirection, boolean>;
}) {
  return (
    <div className="vb-grid-move" aria-label="Grid movement controls">
      {(["up", "left", "down", "right"] as GridDirection[]).map((direction) => (
        <button
          key={direction}
          type="button"
          className={`vb-grid-move__button vb-grid-move__button--${direction}`}
          aria-label={`Move selected item ${direction}`}
          disabled={disabled[direction]}
          onClick={() => onMove(direction)}
        >
          {labels[direction]}
        </button>
      ))}
    </div>
  );
}
