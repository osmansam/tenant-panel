"use client";

import { useRef, useState, type FormEvent } from "react";
import type { FormNode } from "../../../model";
import { normalizeFormActionUrl } from "../../../model/urls";
import type { SemanticRendererContext } from "../types";

export type FormSubmissionState = "idle" | "submitting" | "succeeded" | "failed";

export function buildGetSubmissionUrl(action: string, formData: FormData, baseUrl: string): string {
  const url = new URL(action, baseUrl);
  for (const [name, value] of formData.entries()) url.searchParams.append(name, typeof value === "string" ? value : value.name);
  return /^[a-z][a-z0-9+.-]*:/i.test(action) ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}

export function FormRenderer({ node, context }: { node: FormNode; context: SemanticRendererContext }) {
  const [state, setState] = useState<FormSubmissionState>("idle");
  const pending = useRef(false);
  const normalized = normalizeFormActionUrl(node.action);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (context.mode === "canvas" || pending.current || !normalized.success) return;
    pending.current = true;
    setState("submitting");
    const formData = new FormData(event.currentTarget);
    try {
      const response = node.method === "get"
        ? await fetch(buildGetSubmissionUrl(normalized.value, formData, window.location.href), { method: "GET" })
        : await fetch(normalized.value, { method: "POST", body: formData });
      setState(response.ok ? "succeeded" : "failed");
    } catch {
      setState("failed");
    } finally {
      pending.current = false;
    }
  };

  return <form className={context.className} style={context.combineNodeStyles(node)} action={normalized.success ? normalized.value : undefined} method={node.method} onSubmit={submit} aria-busy={state === "submitting" || undefined}>
    {context.backgrounds}{context.renderStructuralChildren(node)}
    {state === "succeeded" ? <p role="status" aria-label="Form submission success" aria-live="polite">{node.successMessage}</p> : null}
    {state === "failed" ? <p role="alert">Something went wrong. Please try again.</p> : null}
  </form>;
}
