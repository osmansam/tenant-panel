"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export interface EffectBoundaryProps {
  resetKey: string;
  fallback: ReactNode;
  children: ReactNode;
  onError?: () => void;
}

interface EffectBoundaryState { failed: boolean }

export class EffectBoundary extends Component<EffectBoundaryProps, EffectBoundaryState> {
  state: EffectBoundaryState = { failed: false };

  static getDerivedStateFromError(): EffectBoundaryState { return { failed: true }; }

  componentDidCatch(_error: Error, _info: ErrorInfo): void { this.props.onError?.(); }

  componentDidUpdate(previous: EffectBoundaryProps): void {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }

  render(): ReactNode { return this.state.failed ? this.props.fallback : this.props.children; }
}
