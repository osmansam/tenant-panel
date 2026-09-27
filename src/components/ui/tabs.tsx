import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const safeValue = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside Tabs");
  return context;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export function Tabs({ value, onValueChange, className, children, ...props }: TabsProps) {
  const baseId = `tabs-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <TabsContext.Provider value={{ value, onValueChange, baseId }}>
      <div className={cn("min-w-0", className)} {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={cn("flex max-w-full gap-1 overflow-x-auto border-b border-ui-border", className)} {...props}>{children}</div>;
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className, children, disabled, ...props }: TabsTriggerProps) {
  const context = useTabs();
  const selected = context.value === value;
  const suffix = safeValue(value);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') || []);
    const currentIndex = tabs.indexOf(event.currentTarget);
    if (currentIndex < 0 || tabs.length === 0) return;
    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  };

  return (
    <button
      type="button"
      role="tab"
      id={`${context.baseId}-tab-${suffix}`}
      aria-controls={`${context.baseId}-panel-${suffix}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => context.onValueChange(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-focus disabled:opacity-50",
        selected ? "border-ui-primary text-ui-foreground" : "border-transparent text-ui-muted hover:text-ui-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const context = useTabs();
  if (context.value !== value) return null;
  const suffix = safeValue(value);
  return (
    <div
      role="tabpanel"
      id={`${context.baseId}-panel-${suffix}`}
      aria-labelledby={`${context.baseId}-tab-${suffix}`}
      tabIndex={0}
      className={cn("py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus", className)}
      {...props}
    >
      {children}
    </div>
  );
}
