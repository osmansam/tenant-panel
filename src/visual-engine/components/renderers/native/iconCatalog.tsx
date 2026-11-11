import {
  AcademicCapIcon,
  ArrowRightIcon,
  BanknotesIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  LanguageIcon,
  LightBulbIcon,
  LinkIcon,
  MapPinIcon,
  MegaphoneIcon,
  PhoneIcon,
  PlayIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import type { OzmishowIconId } from "../../../model/icons";

export type OzmishowIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const OZMISHOW_ICON_COMPONENTS = Object.freeze({
  "academic-cap": AcademicCapIcon,
  "arrow-right": ArrowRightIcon,
  banknotes: BanknotesIcon,
  "book-open": BookOpenIcon,
  briefcase: BriefcaseIcon,
  "building-library": BuildingLibraryIcon,
  "calendar-days": CalendarDaysIcon,
  check: CheckIcon,
  "check-badge": CheckBadgeIcon,
  clock: ClockIcon,
  envelope: EnvelopeIcon,
  "globe-alt": GlobeAltIcon,
  heart: HeartIcon,
  home: HomeIcon,
  language: LanguageIcon,
  "light-bulb": LightBulbIcon,
  link: LinkIcon,
  "map-pin": MapPinIcon,
  megaphone: MegaphoneIcon,
  phone: PhoneIcon,
  play: PlayIcon,
  scale: ScaleIcon,
  "shield-check": ShieldCheckIcon,
  sparkles: SparklesIcon,
  star: StarIcon,
  user: UserIcon,
  "user-group": UserGroupIcon,
} satisfies Record<OzmishowIconId, OzmishowIconComponent>);

export function getOzmishowIconComponent(id: OzmishowIconId): OzmishowIconComponent {
  return OZMISHOW_ICON_COMPONENTS[id];
}
