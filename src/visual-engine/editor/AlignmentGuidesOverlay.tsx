import type { AlignmentGuides } from "./alignmentGuides";

export interface AlignmentGuidesOverlayProps {
  guides: AlignmentGuides;
}

/** Draws matching-edge lines and equal-spacing measurements while a component is dragged. */
export function AlignmentGuidesOverlay({ guides }: AlignmentGuidesOverlayProps) {
  return (
    <div className="vb-guides" data-testid="alignment-guides" aria-hidden="true">
      {guides.lines.map((line) => (
        <span
          key={`${line.axis}-${line.kind}-${line.position}`}
          className={`vb-guides__line vb-guides__line--${line.axis}${line.kind === "center" ? " vb-guides__line--center" : ""}`}
          data-guide="alignment"
          data-axis={line.axis}
          style={line.axis === "x"
            ? { left: line.position, top: line.start, height: line.end - line.start }
            : { top: line.position, left: line.start, width: line.end - line.start }}
        />
      ))}
      {guides.spacing.map((gap) => (
        <span
          key={`${gap.axis}-${gap.start}-${gap.end}`}
          className={`vb-guides__gap vb-guides__gap--${gap.axis}`}
          data-guide="spacing"
          data-axis={gap.axis}
          style={gap.axis === "x"
            ? { left: gap.start, width: gap.size, top: gap.cross }
            : { top: gap.start, height: gap.size, left: gap.cross }}
        >
          <span className="vb-guides__label">{Math.round(gap.size)}</span>
        </span>
      ))}
    </div>
  );
}

