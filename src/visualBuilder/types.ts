import type { ParameterBinding } from "../utils/api/page";
import type { ComponentBlock } from "./pageTypes";
import type { ComponentDocument } from "../visual-engine/model";
import type { SiteTheme } from "../visual-engine/theme";
export interface ProjectScope { tenant: string; project: string }
export interface VisualBlockValue { document: ComponentDocument; theme?: SiteTheme }
export interface VisualTarget { requestBindings?: ComponentBlock["requestBindings"]; componentId: string; baseline?: ComponentBlock; isNew: boolean; itemBinding?: ParameterBinding | null; cellSizing?: import("./cellSizing").VisualCellSizing }
