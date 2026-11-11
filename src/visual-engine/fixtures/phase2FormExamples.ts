import type { ComponentDocument } from "../model";

export const TEACHER_ENROLLMENT_FORM_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-teacher-enrollment-form",
  name: "Teacher · Enrollment Inquiry Form",
  kind: "section",
  root: { id: "teacher-form-section", type: "section", style: { spacing: { paddingX: "lg", paddingY: "2xl" }, color: { background: "background", text: "text" } }, children: [
    { id: "teacher-form-grid", type: "grid", columns: 12, style: { spacing: { gap: "xl" }, sizing: { width: "full", maxWidth: "7xl", align: "center" } }, children: [
      { id: "teacher-form-intro", type: "card", element: "article", layout: { span: { mobile: 12, tablet: 12, desktop: 5 } }, style: { spacing: { padding: "xl" }, color: { background: "primary-soft", text: "text" }, border: { radius: "3xl" } }, children: [
        { id: "teacher-form-intro-stack", type: "stack", direction: "column", alignment: "start", distribution: "center", wrap: false, gap: "lg", children: [
          { id: "teacher-form-badge", type: "badge", text: "Enrollment inquiry", style: { spacing: { paddingX: "md", paddingY: "xs" }, border: { radius: "full" }, color: { background: "surface", text: "primary-deep" }, typography: { weight: "semibold" } } },
          { id: "teacher-form-heading", type: "heading", level: 2, text: "Find the right learning path for your child.", style: { typography: { family: "playfair-display", size: "4xl", weight: "bold", leading: "tight" } } },
          { id: "teacher-form-copy", type: "text", text: "Tell us where your learner is today and what progress would feel meaningful. We will reply with a focused first-step recommendation.", style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" } } },
          { id: "teacher-form-list", type: "list", marker: "check", items: ["A thoughtful learning-stage match", "Clear session and progress expectations", "A reply within one school day"], style: { spacing: { gap: "sm" } } },
          { id: "teacher-form-stat", type: "stat", value: "1", label: "school day response time", suffix: " day", style: { color: { text: "primary" }, typography: { weight: "bold" } } },
        ] },
      ] },
      { id: "teacher-enrollment-form", type: "form", action: "/api/contact", method: "post", successMessage: "Thanks — your enrollment inquiry has been received.", layout: { span: { mobile: 12, tablet: 12, desktop: 7 } }, responsive: { visibility: { mobile: true, tablet: true, desktop: true } }, style: { spacing: { padding: "xl" }, color: { background: "surface", text: "text" }, border: { radius: "3xl", width: "hairline", color: "border", shadow: "lg" } }, children: [
        { id: "teacher-enrollment-fields", type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md", children: [
          { id: "teacher-student-name", type: "input", fieldName: "student_name", label: "Student name", inputType: "text", placeholder: "Student name", required: true },
          { id: "teacher-parent-email", type: "input", fieldName: "parent_email", label: "Parent or guardian email", inputType: "email", placeholder: "you@example.com", required: true },
          { id: "teacher-learning-stage", type: "select", fieldName: "learning_stage", label: "Learning stage", placeholder: "Choose a stage", required: true, options: [{ value: "primary", label: "Primary school" }, { value: "middle", label: "Middle school" }, { value: "secondary", label: "Secondary school" }, { value: "adult", label: "Adult learner" }] },
          { id: "teacher-goals", type: "textarea", fieldName: "goals", label: "Learning goals", placeholder: "What would you like to improve?", required: true, rows: 6 },
          { id: "teacher-consent", type: "checkbox", fieldName: "contact_consent", label: "I agree to be contacted about this learning inquiry.", value: "yes", required: true, checkedByDefault: false },
          { id: "teacher-submit", type: "button", label: "Request a learning plan", submit: true, iconId: "academic-cap", iconPosition: "start", style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "primary", text: "primary-foreground" }, border: { radius: "full" }, typography: { weight: "semibold" } } },
        ] },
      ] },
    ] },
  ] },
};

export const LAWYER_CONSULTATION_FORM_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "cta-lawyer-consultation-form",
  name: "Lawyer · Confidential Consultation Form",
  kind: "section",
  root: { id: "lawyer-form-section", type: "section", style: { spacing: { paddingX: "lg", paddingY: "2xl" }, color: { background: "background", text: "text" } }, children: [
    { id: "lawyer-form-overlay", type: "overlay", alignment: "center", inset: "xl", mobileFallback: "stack", tint: { color: { kind: "token", value: "text" }, opacity: 0.55 }, style: { sizing: { width: "full", maxWidth: "7xl", align: "center" }, border: { radius: "3xl", shadow: "xl" } }, children: [
      { id: "lawyer-form-background", type: "slot", name: "background", children: [{ id: "lawyer-form-image", type: "image", src: "/visual-builder/placeholder.svg", alt: "Quiet professional consultation room", aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full", height: "50rem", fit: "cover" } } }] },
      { id: "lawyer-form-content", type: "slot", name: "content", children: [
        { id: "lawyer-form-grid", type: "grid", columns: 12, style: { spacing: { gap: "xl" }, sizing: { width: "full" } }, children: [
          { id: "lawyer-trust-card", type: "card", element: "article", layout: { span: { mobile: 12, tablet: 12, desktop: 5 } }, style: { spacing: { padding: "xl" }, color: { background: "surface", text: "text" }, border: { radius: "xl", shadow: "lg" } }, children: [
            { id: "lawyer-trust-stack", type: "stack", direction: "column", alignment: "start", distribution: "center", wrap: false, gap: "lg", children: [
              { id: "lawyer-form-badge", type: "badge", text: "Private · No-obligation review", style: { spacing: { paddingX: "md", paddingY: "xs" }, color: { background: "accent-soft", text: "text" }, border: { radius: "full" }, typography: { weight: "semibold" } } },
              { id: "lawyer-form-heading", type: "heading", level: 2, text: "Share the situation. Leave with clearer next steps.", style: { typography: { family: "playfair-display", size: "4xl", weight: "bold", leading: "tight" } } },
              { id: "lawyer-form-list", type: "list", marker: "icon", iconId: "shield-check", items: ["Confidential intake", "Plain-language assessment", "Prompt availability response"] },
              { id: "lawyer-form-stat", type: "stat", value: "24", suffix: " hrs", label: "typical response window", style: { color: { text: "primary" }, typography: { weight: "bold" } } },
            ] },
          ] },
          { id: "lawyer-consultation-form", type: "form", action: "/api/contact", method: "post", successMessage: "Thank you — your confidential consultation request has been received.", layout: { span: { mobile: 12, tablet: 12, desktop: 7 } }, responsive: { visibility: { mobile: true, tablet: true, desktop: true } }, style: { spacing: { padding: "xl" }, color: { background: "surface", text: "text" }, border: { radius: "xl", width: "hairline", color: "border", shadow: "lg" } }, children: [
            { id: "lawyer-consultation-fields", type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md", children: [
              { id: "lawyer-name", type: "input", fieldName: "full_name", label: "Full name", inputType: "text", placeholder: "Full name", required: true },
              { id: "lawyer-email", type: "input", fieldName: "email", label: "Email", inputType: "email", placeholder: "you@example.com", required: true },
              { id: "lawyer-phone", type: "input", fieldName: "phone", label: "Phone", inputType: "tel", placeholder: "Preferred phone number", required: false },
              { id: "lawyer-practice-area", type: "select", fieldName: "practice_area", label: "Practice area", placeholder: "Choose a practice area", required: true, options: [{ value: "business", label: "Business law" }, { value: "employment", label: "Employment law" }, { value: "estate", label: "Estate planning" }, { value: "dispute", label: "Dispute resolution" }] },
              { id: "lawyer-summary", type: "textarea", fieldName: "matter_summary", label: "Brief matter summary", placeholder: "Share the key facts and any deadlines.", required: true, rows: 6 },
              { id: "lawyer-confidentiality", type: "checkbox", fieldName: "confidentiality_acknowledged", label: "I understand this request does not create an attorney-client relationship.", value: "yes", required: true, checkedByDefault: false },
              { id: "lawyer-submit", type: "button", label: "Request a confidential review", submit: true, iconId: "scale", iconPosition: "start", style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "primary", text: "primary-foreground" }, border: { radius: "full" }, typography: { weight: "semibold" } } },
            ] },
          ] },
        ] },
      ] },
    ] },
  ] },
};

export const PHASE_2_FORM_EXAMPLES: ComponentDocument[] = [
  TEACHER_ENROLLMENT_FORM_DOCUMENT,
  LAWYER_CONSULTATION_FORM_DOCUMENT,
];
