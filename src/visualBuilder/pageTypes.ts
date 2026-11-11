import type { PageModel as AdminPageModel, Section } from "../utils/api/page";
export type { ComponentBlock, Section as PageSection } from "../utils/api/page";
export type PageModel = Omit<AdminPageModel, "sections" | "subPage"> & { sections: Section[]; subPage?: PageModel };
