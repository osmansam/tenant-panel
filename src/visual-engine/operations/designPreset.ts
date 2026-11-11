import type { ComponentDocument, ComponentNode, StyleSpec } from "../model";
import type { DesignPresetId } from "../model/designPresets";
import { DEFAULT_SITE_THEME } from "../theme/defaults";
import type { ResolvedThemePalette, ThemePaletteName } from "../theme/types";

export const DESIGN_STYLE_KITS: readonly { id: DesignPresetId; name: string; description: string }[] = [
  { id: "editorial", name: "Editorial", description: "Quiet neutrals, serif headlines and considered details." },
  { id: "swiss-minimal", name: "Swiss Minimal", description: "Bold Geist type, square corners and a precise red accent." },
  { id: "playful", name: "Playful", description: "Friendly Poppins type, generous curves and violet with peach." },
  { id: "luxury", name: "Luxury", description: "Playfair Display headlines, warm cream and understated gold." },
  { id: "neo-brutalist", name: "Neo Brutalist", description: "Bold Geist, vivid yellow and strong square borders." },
  { id: "soft-ui", name: "Soft UI", description: "Calm Inter type, soft blue and rounded, floating surfaces." },
  { id: "terminal", name: "Terminal", description: "Monospace type, green accents and precise fine borders." },
  { id: "retro", name: "Retro", description: "Merriweather and Lato, warm paper and burnt orange." },
  { id: "nordic", name: "Nordic", description: "Airy Inter type, cool stone and restrained forest accents." },
  { id: "coastal", name: "Coastal", description: "Open Sans, sea blue and gently rounded sandy surfaces." },
  { id: "botanical", name: "Botanical", description: "Merriweather and Lato, leafy greens and soft organic corners." },
  { id: "art-deco", name: "Art Deco", description: "Elegant Playfair Display, geometric edges and deep gold." },
  { id: "midnight", name: "Midnight", description: "Moonlit indigo surfaces, Montserrat headings and aurora accents." },
  { id: "sunset", name: "Sunset", description: "Warm dusk light, ember buttons and friendly rounded Poppins type." },
  { id: "blueprint", name: "Blueprint", description: "Drafting-paper blues, monospace labels and precise technical borders." },
  { id: "sakura", name: "Sakura", description: "Gentle washi tones, cherry-blossom rose and organic serif headings." },
];

type NewPresetId = Exclude<DesignPresetId, "editorial">;
type OriginalPresetId = Exclude<NewPresetId, "nordic" | "coastal" | "botanical" | "art-deco" | "midnight" | "sunset" | "blueprint" | "sakura">;
type EditableKit = {
  heading: NonNullable<StyleSpec["typography"]>;
  body: NonNullable<StyleSpec["typography"]>;
  ui: NonNullable<StyleSpec["typography"]>;
  button: NonNullable<StyleSpec["border"]>;
  card: NonNullable<StyleSpec["border"]>;
};

const originalEditableKits: Record<OriginalPresetId, EditableKit> = {
  "neo-brutalist": {
    heading: { family: "geist", size: "4xl", weight: "bold", leading: "tight", tracking: "tight" },
    body: { family: "geist", size: "base", weight: "medium", leading: "relaxed", tracking: "normal" },
    ui: { family: "geist", size: "sm", weight: "bold", leading: "normal", tracking: "wide" },
    button: { radius: "none", shadow: "none", width: "thin", color: "border" },
    card: { radius: "none", shadow: "none", width: "thin", color: "border" },
  },
  "soft-ui": {
    heading: { family: "inter", size: "4xl", weight: "semibold", leading: "snug", tracking: "tight" },
    body: { family: "inter", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "inter", size: "sm", weight: "semibold", leading: "normal", tracking: "normal" },
    button: { radius: "full", shadow: "lg", width: "none", color: "border" },
    card: { radius: "3xl", shadow: "lg", width: "none", color: "border" },
  },
  terminal: {
    heading: { family: "monospace", size: "30px", weight: "bold", leading: "tight", tracking: "tight" },
    body: { family: "monospace", size: "15px", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "monospace", size: "13px", weight: "bold", leading: "normal", tracking: "normal" },
    button: { radius: "none", shadow: "none", width: "hairline", color: "border" },
    card: { radius: "none", shadow: "none", width: "hairline", color: "border" },
  },
  retro: {
    heading: { family: "merriweather", size: "4xl", weight: "bold", leading: "snug", tracking: "normal" },
    body: { family: "lato", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "lato", size: "sm", weight: "bold", leading: "normal", tracking: "wide" },
    button: { radius: "lg", shadow: "sm", width: "thin", color: "border" },
    card: { radius: "xl", shadow: "sm", width: "thin", color: "border" },
  },
  "swiss-minimal": {
    heading: { family: "geist", size: "4xl", weight: "bold", leading: "tight", tracking: "tight" },
    body: { family: "geist", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "geist", size: "sm", weight: "semibold", leading: "normal", tracking: "normal" },
    button: { radius: "none", shadow: "none", width: "hairline", color: "border" },
    card: { radius: "none", shadow: "none", width: "hairline", color: "border" },
  },
  playful: {
    heading: { family: "poppins", size: "4xl", weight: "bold", leading: "snug", tracking: "normal" },
    body: { family: "poppins", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "poppins", size: "sm", weight: "semibold", leading: "normal", tracking: "normal" },
    button: { radius: "full", shadow: "md", width: "hairline", color: "border" },
    card: { radius: "3xl", shadow: "md", width: "hairline", color: "border" },
  },
  luxury: {
    heading: { family: "playfair-display", size: "4xl", weight: "normal", leading: "tight", tracking: "normal" },
    body: { family: "geist", size: "15px", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "geist", size: "13px", weight: "medium", leading: "normal", tracking: "wide" },
    button: { radius: "sm", shadow: "none", width: "hairline", color: "border" },
    card: { radius: "sm", shadow: "none", width: "hairline", color: "border" },
  },
};

const originalKitPalettes: Record<OriginalPresetId, Record<ThemePaletteName, Partial<ResolvedThemePalette>>> = {
  "neo-brutalist": {
    light: {
      background: "#fff8d6", surface: "#ffffff", "surface-muted": "#f4eaa8", "surface-sunken": "#efe4b4",
      text: "#20201c", "text-muted": "#565347", "text-subtle": "#706b5b",
      primary: "#ffe247", "primary-foreground": "#20201c", "primary-deep": "#d6b91e", "primary-soft": "#fff1a0",
      secondary: "#f4c0db", "secondary-foreground": "#432339", accent: "#a32864", "accent-foreground": "#ffffff", "accent-soft": "#f8d7e9",
      border: "#20201c", input: "#20201c", ring: "#a32864",
    },
    dark: {
      background: "#191916", surface: "#242420", "surface-muted": "#333229", "surface-sunken": "#121210",
      text: "#fff9df", "text-muted": "#c9c3a9", "text-subtle": "#b1aa90",
      primary: "#ffe247", "primary-foreground": "#20201c", "primary-deep": "#d6b91e", "primary-soft": "#453e1d",
      secondary: "#503346", "secondary-foreground": "#ffd1ec", accent: "#ff9ccd", "accent-foreground": "#35202c", "accent-soft": "#48273b",
      border: "#d4d2bd", input: "#d4d2bd", ring: "#ff9ccd",
    },
  },
  "soft-ui": {
    light: {
      background: "#edf1f8", surface: "#f9fbff", "surface-muted": "#e1e8f4", "surface-sunken": "#e4eaf4",
      text: "#26344d", "text-muted": "#5d6d86", "text-subtle": "#73819a",
      primary: "#4664d8", "primary-foreground": "#ffffff", "primary-deep": "#344db0", "primary-soft": "#e2e9ff",
      secondary: "#e1e7f4", "secondary-foreground": "#36476a", accent: "#386c85", "accent-foreground": "#ffffff", "accent-soft": "#deedf3",
      border: "#d7dfed", input: "#c1cde1", ring: "#4664d8",
    },
    dark: {
      background: "#161e2e", surface: "#232e43", "surface-muted": "#303d55", "surface-sunken": "#101725",
      text: "#ecf1ff", "text-muted": "#b3c0d8", "text-subtle": "#96a7c2",
      primary: "#a8b8ff", "primary-foreground": "#1c294d", "primary-deep": "#8c9fea", "primary-soft": "#303e69",
      secondary: "#35415a", "secondary-foreground": "#e0e9fc", accent: "#98cbdc", "accent-foreground": "#183341", "accent-soft": "#274653",
      border: "#40516c", input: "#52617b", ring: "#a8b8ff",
    },
  },
  terminal: {
    light: {
      background: "#f3f8f2", surface: "#ffffff", "surface-muted": "#e5eee3", "surface-sunken": "#eaf1e8",
      text: "#203629", "text-muted": "#526a58", "text-subtle": "#6a806f",
      primary: "#17633d", "primary-foreground": "#ffffff", "primary-deep": "#10482c", "primary-soft": "#dcefe1",
      secondary: "#deeadb", "secondary-foreground": "#2b4b34", accent: "#306b49", "accent-foreground": "#ffffff", "accent-soft": "#dcefe1",
      border: "#8ea692", input: "#8ea692", ring: "#17633d",
    },
    dark: {
      background: "#101913", surface: "#16231b", "surface-muted": "#22372a", "surface-sunken": "#0b120d",
      text: "#d9f3dd", "text-muted": "#a4c5ac", "text-subtle": "#85a58d",
      primary: "#8fe6ac", "primary-foreground": "#10271a", "primary-deep": "#6ac98c", "primary-soft": "#264632",
      secondary: "#294333", "secondary-foreground": "#c1e4c7", accent: "#b4daa2", "accent-foreground": "#1f321c", "accent-soft": "#304329",
      border: "#456b50", input: "#557c60", ring: "#8fe6ac",
    },
  },
  retro: {
    light: {
      background: "#f6edd9", surface: "#fff8e9", "surface-muted": "#ece0bc", "surface-sunken": "#eee1c6",
      text: "#493326", "text-muted": "#78604a", "text-subtle": "#8e765c",
      primary: "#a54126", "primary-foreground": "#fff8e9", "primary-deep": "#7d2e19", "primary-soft": "#f3d8bf",
      secondary: "#ead3a0", "secondary-foreground": "#5c4128", accent: "#4c6a45", "accent-foreground": "#ffffff", "accent-soft": "#dce4c6",
      border: "#bd9e6d", input: "#bd9e6d", ring: "#a54126",
    },
    dark: {
      background: "#281f18", surface: "#34281e", "surface-muted": "#473829", "surface-sunken": "#1e1711",
      text: "#f5e7c9", "text-muted": "#cfb995", "text-subtle": "#b49c78",
      primary: "#f0ab77", "primary-foreground": "#3b2417", "primary-deep": "#ce8b57", "primary-soft": "#573b28",
      secondary: "#5c472e", "secondary-foreground": "#f2dba8", accent: "#bed29b", "accent-foreground": "#2c3820", "accent-soft": "#3e4a30",
      border: "#856b48", input: "#927952", ring: "#f0ab77",
    },
  },
  "swiss-minimal": {
    light: {
      background: "#ffffff", surface: "#ffffff", "surface-muted": "#f1f1ef", "surface-sunken": "#f7f7f5",
      text: "#171717", "text-muted": "#62625f", "text-subtle": "#797975",
      primary: "#e1261c", "primary-foreground": "#ffffff", "primary-deep": "#af1e16", "primary-soft": "#fbe8e6",
      secondary: "#eeeeeb", "secondary-foreground": "#171717", accent: "#e1261c", "accent-foreground": "#ffffff", "accent-soft": "#fbe8e6",
      border: "#d7d7d2", input: "#d7d7d2", ring: "#e1261c",
    },
    dark: {
      background: "#111111", surface: "#1a1a19", "surface-muted": "#262625", "surface-sunken": "#0c0c0c",
      text: "#f4f4f0", "text-muted": "#b5b5ae", "text-subtle": "#999992",
      primary: "#ff766c", "primary-foreground": "#111111", "primary-deep": "#ed5146", "primary-soft": "#3f211f",
      secondary: "#2c2c29", "secondary-foreground": "#f4f4f0", accent: "#ff766c", "accent-foreground": "#111111", "accent-soft": "#3f211f",
      border: "#41413c", input: "#41413c", ring: "#ff766c",
    },
  },
  playful: {
    light: {
      background: "#fff8f3", surface: "#ffffff", "surface-muted": "#f2eaff", "surface-sunken": "#f9eee7",
      text: "#302342", "text-muted": "#6d5d7c", "text-subtle": "#84738e",
      primary: "#6d28d9", "primary-foreground": "#ffffff", "primary-deep": "#5520a9", "primary-soft": "#ede2ff",
      secondary: "#ffdbc6", "secondary-foreground": "#673d2b", accent: "#b84c2a", "accent-foreground": "#ffffff", "accent-soft": "#ffe4d4",
      border: "#e5d6ef", input: "#e5d6ef", ring: "#6d28d9",
    },
    dark: {
      background: "#1d142b", surface: "#2a1e3c", "surface-muted": "#38284e", "surface-sunken": "#160e22",
      text: "#f8efff", "text-muted": "#c5b4d6", "text-subtle": "#ae99c2",
      primary: "#c4a5ff", "primary-foreground": "#241238", "primary-deep": "#ad85f0", "primary-soft": "#43305f",
      secondary: "#5b3540", "secondary-foreground": "#ffe0cd", accent: "#ffbc93", "accent-foreground": "#392117", "accent-soft": "#513127",
      border: "#544065", input: "#544065", ring: "#c4a5ff",
    },
  },
  luxury: {
    light: {
      background: "#faf6ed", surface: "#fffcf6", "surface-muted": "#f0e8d9", "surface-sunken": "#f4eee3",
      text: "#332d24", "text-muted": "#716554", "text-subtle": "#877967",
      primary: "#8a6429", "primary-foreground": "#ffffff", "primary-deep": "#694b1e", "primary-soft": "#eee1c8",
      secondary: "#ece3d1", "secondary-foreground": "#4a3b24", accent: "#8a6429", "accent-foreground": "#ffffff", "accent-soft": "#f0e4cc",
      border: "#ded2bc", input: "#ded2bc", ring: "#8a6429",
    },
    dark: {
      background: "#1b1813", surface: "#252019", "surface-muted": "#332b21", "surface-sunken": "#15120e",
      text: "#f4ebdc", "text-muted": "#c4b59c", "text-subtle": "#a8977d",
      primary: "#d7b777", "primary-foreground": "#241b0e", "primary-deep": "#b79654", "primary-soft": "#443620",
      secondary: "#3a3022", "secondary-foreground": "#ead9b9", accent: "#d7b777", "accent-foreground": "#241b0e", "accent-soft": "#49391e",
      border: "#4b3e2b", input: "#4b3e2b", ring: "#d7b777",
    },
  },
};

const editableKits: Record<NewPresetId, EditableKit> = {
  ...originalEditableKits,
  nordic: {
    ...originalEditableKits["swiss-minimal"],
    heading: { family: "inter", size: "4xl", weight: "medium", leading: "tight", tracking: "tight" },
    body: { ...originalEditableKits["soft-ui"].body },
    ui: { ...originalEditableKits["soft-ui"].ui },
    button: { radius: "sm", shadow: "none", width: "hairline", color: "border" },
    card: { radius: "md", shadow: "none", width: "hairline", color: "border" },
  },
  coastal: {
    ...originalEditableKits["soft-ui"],
    heading: { family: "open-sans", size: "4xl", weight: "semibold", leading: "snug", tracking: "normal" },
    body: { ...originalEditableKits["soft-ui"].body, family: "open-sans" },
    ui: { ...originalEditableKits["soft-ui"].ui, family: "open-sans" },
    button: { radius: "full", shadow: "sm", width: "none", color: "border" },
    card: { radius: "xl", shadow: "sm", width: "none", color: "border" },
  },
  botanical: {
    ...originalEditableKits.retro,
    heading: { ...originalEditableKits.retro.heading, weight: "normal" },
    button: { radius: "full", shadow: "none", width: "hairline", color: "border" },
    card: { radius: "3xl", shadow: "sm", width: "hairline", color: "border" },
  },
  "art-deco": {
    ...originalEditableKits.luxury,
    heading: { ...originalEditableKits.luxury.heading, size: "6xl", tracking: "wide" },
    body: { ...originalEditableKits.luxury.body, family: "montserrat" },
    ui: { ...originalEditableKits.luxury.ui, family: "montserrat", tracking: "wide" },
    button: { radius: "none", shadow: "none", width: "thin", color: "border" },
    card: { radius: "none", shadow: "none", width: "thin", color: "border" },
  },
  midnight: {
    heading: { family: "montserrat", size: "4xl", weight: "semibold", leading: "tight", tracking: "tight" },
    body: { family: "inter", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "inter", size: "sm", weight: "semibold", leading: "normal", tracking: "normal" },
    button: { radius: "lg", shadow: "md", width: "hairline", color: "border" },
    card: { radius: "xl", shadow: "md", width: "hairline", color: "border" },
  },
  sunset: {
    heading: { family: "poppins", size: "4xl", weight: "bold", leading: "snug", tracking: "normal" },
    body: { family: "lato", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "lato", size: "sm", weight: "bold", leading: "normal", tracking: "normal" },
    button: { radius: "full", shadow: "md", width: "none", color: "border" },
    card: { radius: "xl", shadow: "md", width: "none", color: "border" },
  },
  blueprint: {
    heading: { family: "montserrat", size: "4xl", weight: "bold", leading: "tight", tracking: "tight" },
    body: { family: "inter", size: "base", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "monospace", size: "sm", weight: "bold", leading: "normal", tracking: "wide" },
    button: { radius: "none", shadow: "none", width: "thin", color: "border" },
    card: { radius: "none", shadow: "none", width: "thin", color: "border" },
  },
  sakura: {
    heading: { family: "noto-serif", size: "4xl", weight: "normal", leading: "tight", tracking: "normal" },
    body: { family: "geist", size: "15px", weight: "normal", leading: "relaxed", tracking: "normal" },
    ui: { family: "geist", size: "13px", weight: "medium", leading: "normal", tracking: "wide" },
    button: { radius: "full", shadow: "sm", width: "hairline", color: "border" },
    card: { radius: "3xl", shadow: "sm", width: "hairline", color: "border" },
  },
};

const kitPalettes: Record<NewPresetId, Record<ThemePaletteName, Partial<ResolvedThemePalette>>> = {
  ...originalKitPalettes,
  nordic: {
    light: { ...originalKitPalettes["swiss-minimal"].light, background: "#f5f6f3", primary: "#3f6255", "primary-deep": "#2d493d", "primary-soft": "#e3ebe4", accent: "#476775", "accent-soft": "#e4edf0", ring: "#3f6255" },
    dark: { ...originalKitPalettes["swiss-minimal"].dark, background: "#171d1b", primary: "#b5cebf", "primary-deep": "#8daf9b", "primary-soft": "#2c4036", accent: "#aec9d4", "accent-soft": "#2a3d46", ring: "#b5cebf" },
  },
  coastal: {
    light: { ...originalKitPalettes["soft-ui"].light, background: "#faf7ef", surface: "#fffdfa", primary: "#166780", "primary-deep": "#104d61", "primary-soft": "#dceef2", secondary: "#eae1cc", "secondary-foreground": "#51452e", accent: "#8e4b32", "accent-soft": "#f6e2d6", ring: "#166780" },
    dark: { ...originalKitPalettes["soft-ui"].dark, background: "#11232b", surface: "#19333c", primary: "#9fd6e3", "primary-deep": "#72b5c6", "primary-soft": "#234b58", secondary: "#4c4435", "secondary-foreground": "#f1e2bf", accent: "#e9b595", "accent-soft": "#513b2f", ring: "#9fd6e3" },
  },
  botanical: {
    light: { ...originalKitPalettes.terminal.light, background: "#f6f5e9", surface: "#fffef5", primary: "#3f623b", "primary-deep": "#2c4829", "primary-soft": "#e1ead5", secondary: "#ebe1c8", "secondary-foreground": "#53452e", accent: "#8c4e43", "accent-soft": "#f1e0d8", ring: "#3f623b" },
    dark: { ...originalKitPalettes.terminal.dark, background: "#191f15", surface: "#242c1d", primary: "#bdd5a2", "primary-deep": "#95b678", "primary-soft": "#39492c", secondary: "#47412d", "secondary-foreground": "#ede3ba", accent: "#e0b3a6", "accent-soft": "#50372f", ring: "#bdd5a2" },
  },
  "art-deco": {
    light: { ...originalKitPalettes.luxury.light, background: "#fbf5e8", primary: "#715323", "primary-deep": "#513b18", "primary-soft": "#eee0bd", secondary: "#e0e8e1", "secondary-foreground": "#24483d", accent: "#24483d", "accent-soft": "#e0e8e1", border: "#b59960", input: "#b59960", ring: "#715323" },
    dark: { ...originalKitPalettes.luxury.dark, background: "#111e1c", surface: "#1b2b27", primary: "#e5c784", "primary-deep": "#c3a55f", "primary-soft": "#493e24", secondary: "#30493e", "secondary-foreground": "#d8e9de", accent: "#b0d0bc", "accent-soft": "#30493e", border: "#a88e56", input: "#a88e56", ring: "#e5c784" },
  },
  midnight: {
    light: {
      background: "#f1f2f9", surface: "#fafbff", "surface-muted": "#e3e5f4", "surface-sunken": "#e9ebf7",
      text: "#22243f", "text-muted": "#565a80", "text-subtle": "#6e7295",
      primary: "#41419b", "primary-foreground": "#ffffff", "primary-deep": "#2e2e73", "primary-soft": "#e4e4f7",
      secondary: "#e5e6f3", "secondary-foreground": "#2b2d4d", accent: "#237a63", "accent-foreground": "#ffffff", "accent-soft": "#dcefe8",
      border: "#c9cce3", input: "#c9cce3", ring: "#41419b",
    },
    dark: {
      background: "#0c0d1f", surface: "#161733", "surface-muted": "#222350", "surface-sunken": "#080917",
      text: "#eceefc", "text-muted": "#a9adcf", "text-subtle": "#8d92b8",
      primary: "#b6b8f5", "primary-foreground": "#101128", "primary-deep": "#9496e8", "primary-soft": "#2b2c55",
      secondary: "#2c2d58", "secondary-foreground": "#d9dbfa", accent: "#8fd8c0", "accent-foreground": "#0e241c", "accent-soft": "#24443a",
      border: "#3c3e6e", input: "#3c3e6e", ring: "#b6b8f5",
    },
  },
  sunset: {
    light: {
      background: "#fdf2e9", surface: "#fffaf4", "surface-muted": "#f8e2cf", "surface-sunken": "#fae7d7",
      text: "#3f2016", "text-muted": "#7a5343", "text-subtle": "#93685a",
      primary: "#c2410c", "primary-foreground": "#fff6ee", "primary-deep": "#983109", "primary-soft": "#fbe0cd",
      secondary: "#f7dfc4", "secondary-foreground": "#5c3a22", accent: "#83365c", "accent-foreground": "#ffffff", "accent-soft": "#f5dbe6",
      border: "#dcc0a5", input: "#dcc0a5", ring: "#c2410c",
    },
    dark: {
      background: "#26120d", surface: "#341c15", "surface-muted": "#46291f", "surface-sunken": "#1c0d09",
      text: "#fbe9dc", "text-muted": "#d5ab96", "text-subtle": "#b98e7b",
      primary: "#ffab76", "primary-foreground": "#401b0d", "primary-deep": "#ea8d52", "primary-soft": "#4e2a1b",
      secondary: "#4a2c22", "secondary-foreground": "#f4d9c2", accent: "#ffb3c1", "accent-foreground": "#3d1a24", "accent-soft": "#54303a",
      border: "#7a4f3c", input: "#7a4f3c", ring: "#ffab76",
    },
  },
  blueprint: {
    light: {
      background: "#eef1f7", surface: "#fbfcfe", "surface-muted": "#dde4f0", "surface-sunken": "#e5ebf5",
      text: "#1c2b4a", "text-muted": "#4c5d7d", "text-subtle": "#657695",
      primary: "#1e4ec4", "primary-foreground": "#ffffff", "primary-deep": "#163a99", "primary-soft": "#dbe5fa",
      secondary: "#e3e9f4", "secondary-foreground": "#243a63", accent: "#0e7a67", "accent-foreground": "#ffffff", "accent-soft": "#d8efe9",
      border: "#b7c3d9", input: "#b7c3d9", ring: "#1e4ec4",
    },
    dark: {
      background: "#14325f", surface: "#1c3f72", "surface-muted": "#26508a", "surface-sunken": "#0e2547",
      text: "#eaf2ff", "text-muted": "#b4cbea", "text-subtle": "#94b2da",
      primary: "#ffffff", "primary-foreground": "#14325f", "primary-deep": "#cfdcf2", "primary-soft": "#2e5386",
      secondary: "#2a4d80", "secondary-foreground": "#dbe7fb", accent: "#ffd166", "accent-foreground": "#3a2c07", "accent-soft": "#55451f",
      border: "#5d7fb2", input: "#5d7fb2", ring: "#dbe7ff",
    },
  },
  sakura: {
    light: {
      background: "#fbf3f4", surface: "#fffdfd", "surface-muted": "#f3e2e5", "surface-sunken": "#f7e9eb",
      text: "#3b2a31", "text-muted": "#71535d", "text-subtle": "#896874",
      primary: "#ad3c60", "primary-foreground": "#fff7f5", "primary-deep": "#8c2c4b", "primary-soft": "#f7dce3",
      secondary: "#f2e3e0", "secondary-foreground": "#4e3a3d", accent: "#476b46", "accent-foreground": "#ffffff", "accent-soft": "#e0ecdb",
      border: "#dcc3c9", input: "#dcc3c9", ring: "#ad3c60",
    },
    dark: {
      background: "#261419", surface: "#331d24", "surface-muted": "#422830", "surface-sunken": "#1c0e12",
      text: "#fae8ec", "text-muted": "#d1a3b0", "text-subtle": "#b48895",
      primary: "#f0a8bb", "primary-foreground": "#3d1420", "primary-deep": "#e18ba2", "primary-soft": "#522538",
      secondary: "#462730", "secondary-foreground": "#f6dde4", accent: "#b6d1a7", "accent-foreground": "#22301b", "accent-soft": "#3d4a33",
      border: "#5d3a45", input: "#5d3a45", ring: "#f0a8bb",
    },
  },
};

function applySurfaceStyle(style: StyleSpec, button: boolean, surfaceBorder: NonNullable<StyleSpec["border"]>): void {
  const { topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius, ...border } = style.border ?? {};
  style.border = { ...border, ...surfaceBorder };
  if (style.custom?.borderRadius !== undefined || style.custom?.borderWidth !== undefined) {
    const { borderRadius, borderWidth, ...custom } = style.custom;
    style.custom = custom;
  }
  style.color = { ...style.color, background: style.color?.background ?? (button ? "primary" : "surface"), text: style.color?.text ?? (button ? "primary-foreground" : "text") };
}

export function designPresetPaletteStyle(preset: DesignPresetId, palette: ThemePaletteName): Record<`--theme-${string}`, string> {
  if (preset === "editorial") return editorialPaletteStyle(palette);
  const colors = { ...DEFAULT_SITE_THEME.palettes[palette], ...kitPalettes[preset][palette] };
  return Object.fromEntries(Object.entries(colors).map(([token, value]) => [`--theme-${token}`, value]));
}

/** Kits write ordinary inspector values and scope their colors to this document. */
export function applyDesignPreset(document: ComponentDocument, preset: DesignPresetId): ComponentDocument {
  if (preset === "editorial") return applyEditorialPreset(document);
  const kit = editableKits[preset];
  const visit = (node: ComponentNode): ComponentNode => {
    let result = { ...node };
    if (!["code", "kbd", "image", "image-comparison", "video", "audio", "embed"].includes(node.type)) {
      const style: StyleSpec = { ...node.style };
      const typography = node.type === "heading" ? kit.heading
        : ["button", "link", "badge", "copyright"].includes(node.type) ? kit.ui
        : node.type === "text" || node.type === "section" ? kit.body
        : { family: kit.body.family };
      style.typography = { ...style.typography, ...typography };
      if (node.type === "button" || node.type === "card" || node.type === "expandable-card") {
        applySurfaceStyle(style, node.type === "button", node.type === "button" ? kit.button : kit.card);
      }
      result = { ...node, style };
    }
    if ("children" in result) result.children = result.children.map(visit);
    return result;
  };
  const root = visit(document.root) as ComponentDocument["root"];
  root.designPreset = preset;
  delete root.designStyle;
  root.style = { ...root.style, color: { ...root.style?.color, text: root.style?.color?.text ?? "text", background: root.style?.color?.background ?? "background" } };
  return { ...document, root };
}

/** Scoped colors change only the opted-in design, including components added later. */
export function editorialPaletteStyle(palette: ThemePaletteName): Record<`--theme-${string}`, string> {
  const light = palette === "light";
  const colors = {
    ...DEFAULT_SITE_THEME.palettes[palette],
    background: light ? "#ffffff" : "#151514",
    surface: light ? "#ffffff" : "#1d1d1b",
    "surface-muted": light ? "#f5f5f2" : "#252523",
    text: light ? "#575757" : "#dedbd6",
    "text-muted": light ? "#747470" : "#a5a49d",
    primary: light ? "#272727" : "#e8e6df",
    "primary-foreground": light ? "#ffffff" : "#1d1d1b",
    secondary: light ? "#f4f4f1" : "#2b2b27",
    "secondary-foreground": light ? "#575757" : "#dedbd6",
    accent: light ? "#4c7760" : "#a5c7af",
    "accent-foreground": light ? "#ffffff" : "#151514",
    border: light ? "#eaeae6" : "#393934",
    input: light ? "#eaeae6" : "#393934",
    ring: light ? "#787874" : "#a5a49d",
    "surface-sunken": light ? "#fafaf8" : "#121211",
    "primary-deep": light ? "#333330" : "#cfcdc4",
    "primary-soft": light ? "#eeeee9" : "#30302b",
    "accent-soft": light ? "#edf2ed" : "#26352c",
    "text-subtle": light ? "#90908a" : "#92928a",
  };
  return Object.fromEntries(Object.entries(colors).map(([token, value]) => [`--theme-${token}`, value]));
}

/** A normal document edit: all values remain editable with the existing controls. */
export function applyEditorialPreset(document: ComponentDocument): ComponentDocument {
  const visit = (node: ComponentNode): ComponentNode => {
    const style: StyleSpec = { ...node.style };
    let changed = false;
    if (node.type === "heading") {
      style.typography = { ...style.typography, family: node.level <= 2 ? "noto-serif" : "geist", size: node.level <= 2 ? "30px" : "lg", weight: "normal", leading: "tight", tracking: "normal" };
      changed = true;
    } else if (node.type === "text" || node.type === "section") {
      style.typography = { ...style.typography, family: "geist", size: "15px", weight: "normal", leading: "relaxed", tracking: "normal" };
      changed = true;
    } else if (node.type === "button" || node.type === "link" || node.type === "badge" || node.type === "copyright") {
      style.typography = { ...style.typography, family: "geist", size: "13px", weight: "normal", tracking: "normal", leading: "normal" };
      changed = true;
    } else if (!["code", "kbd", "image", "image-comparison", "video", "audio", "embed"].includes(node.type)) {
      style.typography = { ...style.typography, family: "geist" };
      changed = true;
    }
    if (node.type === "button" || node.type === "card" || node.type === "expandable-card") {
      applySurfaceStyle(style, node.type === "button", { radius: node.type === "button" ? "full" : "xl", width: "hairline", color: "border", shadow: "sm" });
      changed = true;
    }
    const result = changed ? { ...node, style } : { ...node };
    if ("children" in result) result.children = result.children.map(visit);
    return result;
  };
  const root = visit(document.root) as ComponentDocument["root"];
  root.designPreset = "editorial";
  delete root.designStyle;
  root.style = {
    ...root.style,
    color: { ...root.style?.color, text: root.style?.color?.text ?? "text", background: root.style?.color?.background ?? "background" },
    typography: { ...root.style?.typography, family: "geist", size: "15px", weight: "normal", leading: "relaxed", tracking: "normal" },
  };
  return { ...document, root };
}
