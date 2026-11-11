"use client";

import { Component, Suspense, type ReactNode } from "react";

interface Props {
  name: string;
  onClose(): void;
  children: ReactNode;
}

/** Keep the editor usable while an optional tool's code is downloaded. */
export class DeferredEditorTool extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    const { name, onClose, children } = this.props;
    if (this.state.failed) return (
      <div className="vb-tool-loading" role="alert">
        <span>{name} could not load. Save your work before reloading the page to try again.</span>
        <button type="button" className="vb-button" onClick={onClose}>Close {name}</button>
      </div>
    );
    return <Suspense fallback={
      <div className="vb-tool-loading" role="status">
        <span>Loading {name}…</span>
        <button type="button" className="vb-button" onClick={onClose}>Cancel loading {name}</button>
      </div>
    }>{children}</Suspense>;
  }
}
