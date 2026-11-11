"use client";

import type { FormNode } from "../model";
import { InspectorSection } from "./InspectorSection";

export function FormInspector({ node }: { node: FormNode }) {
  return <InspectorSection title="Submission behavior">
    <p>Canvas mode never sends requests. Preview and published pages submit to the configured endpoint.</p>
    <p>Your endpoint owns storage, CORS, spam protection, and any confirmation email.</p>
    <p>Successful responses show “{node.successMessage}”. Failed requests show a fixed retry message.</p>
  </InspectorSection>;
}
