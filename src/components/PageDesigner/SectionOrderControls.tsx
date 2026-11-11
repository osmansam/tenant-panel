import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export function SectionOrderControls({ position, count, onMove }: { position: number; count: number; onMove: (direction: -1 | 1) => void }) {
 const className = "flex h-7 w-7 items-center justify-center rounded-md text-ui-muted hover:bg-ui-subtle hover:text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:opacity-30";
 return <div role="group" aria-label={`Section ${position + 1} order`} className="flex shrink-0 items-center">
  <button type="button" className={className} aria-label={`Move section ${position + 1} up`} title="Move section up" data-order-direction="-1" disabled={position === 0} onClick={() => onMove(-1)}><FiChevronUp size={15} /></button>
  <button type="button" className={className} aria-label={`Move section ${position + 1} down`} title="Move section down" data-order-direction="1" disabled={position === count - 1} onClick={() => onMove(1)}><FiChevronDown size={15} /></button>
 </div>;
}
