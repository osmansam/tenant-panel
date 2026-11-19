/// <reference types="vite/client" />

declare const __APP_RELEASE__: string;

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module "virtual:menu-icon-loaders" {
  type IconLoader = () => Promise<Record<string, unknown>>;
  const loaders: Record<string, (() => Promise<{ default: Record<string, IconLoader | undefined> }>) | undefined>;
  export default loaders;
}
