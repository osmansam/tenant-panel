import { Component, useId, type ReactNode } from "react";
import type { ComponentBlock } from "./pageTypes";
import { readVisualBlock } from "./pageAdapter";
import { VisualRenderer } from "../visual-engine/renderer";
import { ozmishowEffectRegistry } from "../visual-engine/effects/registry";
import { ThemeScope } from "../visual-engine/theme";
import { ThemeProvider } from "../visual-engine/host/ThemeProvider";
import { templateCollections } from "./visualData";
import type { VisualBlockValue } from "./types";
import { mainCellContainerId, readVisualCellSizing, withCellSizing } from "./cellSizing";
import "./cellSizing.css";
import "../visual-engine/host/utilities.css";
class PreviewBoundary extends Component<{ source: unknown; children: ReactNode }, { source: unknown; failed: boolean }> {
 state = { source: this.props.source, failed: false };
 static getDerivedStateFromProps(props: { source: unknown }, state: { source: unknown }) { return props.source === state.source ? null : { source: props.source, failed: false }; }
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? <p role="alert">This visual section could not be previewed. Open its editor to review it.</p> : this.props.children; }
}
function Preview({ value }: { value: VisualBlockValue }) {
 const id = useId();
 return <><p className="text-xs text-slate-500">Template preview — live records load on the published page.</p><ThemeScope theme={value.theme} palette="light" defaultMode="light" scopeId={`section-preview-${id}`}><VisualRenderer document={value.document} fillContainerId={mainCellContainerId(value.document)} mode="preview" themeMode="light" resolvedCollections={templateCollections(value.document.root)} effectRegistry={ozmishowEffectRegistry} /></ThemeScope></>;
}
export default function VisualSectionPreview({ component }: { component: ComponentBlock }) {
 let value: VisualBlockValue;
 try { value = readVisualBlock(component); } catch { return <p role="alert">This visual document is invalid. Open its editor to review it.</p>; }
 const sizing = readVisualCellSizing(component);
 value = { ...value, document: withCellSizing(value.document, sizing) };
 return <div className="ve-utilities" data-visual-cell-sizing={sizing}><PreviewBoundary source={component.props?.visualBuilder}><ThemeProvider projectKey={component.id} defaultMode="light" fixedMode="light" persist={false}><Preview value={value} /></ThemeProvider></PreviewBoundary></div>;
}
