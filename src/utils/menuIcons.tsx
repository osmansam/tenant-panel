import { useEffect, useState } from "react";
import type { IconBaseProps, IconType } from "react-icons";
import {
  MdGroup,
  MdTranslate,
  MdVpnKey,
  MdAccountBalanceWallet,
  MdAddShoppingCart,
  MdAdminPanelSettings,
  MdArchive,
  MdAssessment,
  MdAttachMoney,
  MdBarChart,
  MdBuild,
  MdCardGiftcard,
  MdChecklist,
  MdDeliveryDining,
  MdDescription,
  MdEventAvailable,
  MdExtension,
  MdFeedback,
  MdFilePresent,
  MdFolder,
  MdImage,
  MdInventory2,
  MdLink,
  MdListAlt,
  MdLocalOffer,
  MdLocalShipping,
  MdLocationOn,
  MdLock,
  MdMenuBook,
  MdNotifications,
  MdPerson,
  MdPlaylistAddCheck,
  MdPointOfSale,
  MdReceipt,
  MdSchedule,
  MdSchool,
  MdSettings,
  MdShoppingBag,
  MdShoppingCart,
  MdSort,
  MdSpaceDashboard,
  MdSportsEsports,
  MdStorefront,
  MdSummarize,
  MdSupervisorAccount,
  MdTableRestaurant,
  MdTimer,
  MdTrendingUp,
  MdVerifiedUser,
  MdWarning,
} from "react-icons/md";

export const getMenuIcon = (menuName: string): IconType => {
  const iconMap: { [key: string]: IconType } = {
    Tables: MdTableRestaurant,
    Masalar: MdTableRestaurant,
    "Online Sales": MdStorefront,
    Feedbacks: MdFeedback,
    "Daily Summary": MdSummarize,
    "Günlük Özet": MdSummarize,
    Orders: MdShoppingBag,
    Siparişler: MdShoppingBag,
    "Orders Details": MdDescription,
    "Orders Summary": MdReceipt,
    "Order Datas": MdAssessment,
    "Ikas Pick Up": MdDeliveryDining,
    "İkas Gel Al": MdDeliveryDining,
    "Order Categories Order": MdSort,
    Reservations: MdEventAvailable,
    Rezervasyonlar: MdEventAvailable,
    Activities: MdTrendingUp,
    Memberships: MdVerifiedUser,
    Rewards: MdCardGiftcard,
    Games: MdSportsEsports,
    test: MdSportsEsports,
    Oyunlar: MdSportsEsports,
    Gameplays: MdExtension,
    Analytics: MdBarChart,
    "Button Calls": MdNotifications,
    "Buton Çağrıları": MdNotifications,
    Notifications: MdNotifications,
    Shifts: MdSchedule,
    "Çalışma Saatleri": MdSchedule,
    Profile: MdPerson,
    Profil: MdPerson,
    Users: MdSupervisorAccount,
    Kullanıcılar: MdSupervisorAccount,
    User: MdPerson,
    "User Activities": MdTimer,
    "Sayım Listeleri": MdChecklist,
    "Count List": MdChecklist,
    Count: MdPlaylistAddCheck,
    Checklists: MdListAlt,
    Checklist: MdListAlt,
    Check: MdPlaylistAddCheck,
    Expirations: MdWarning,
    ExpirationList: MdWarning,
    "Expiration Count": MdWarning,
    "Single Count Archive": MdArchive,
    "Single Check Archive": MdArchive,
    "Single Expiration Count Archive": MdArchive,
    Stocks: MdInventory2,
    Stoklar: MdInventory2,
    Product: MdShoppingCart,
    Ürün: MdShoppingCart,
    Constants: MdAccountBalanceWallet,
    Accounting: MdAccountBalanceWallet,
    Muhasebe: MdAccountBalanceWallet,
    Expenses: MdAttachMoney,
    Giderler: MdAttachMoney,
    Checkout: MdPointOfSale,
    Kasa: MdPointOfSale,
    Vendor: MdLocalShipping,
    Tedarikçi: MdLocalShipping,
    Brand: MdLocalOffer,
    Marka: MdLocalOffer,
    Menu: MdMenuBook,
    Menü: MdMenuBook,
    "Menu Price": MdAttachMoney,
    "Bulk Product Adding": MdAddShoppingCart,
    Location: MdLocationOn,
    Konum: MdLocationOn,
    Service: MdBuild,
    Servis: MdBuild,
    Education: MdSchool,
    Eğitim: MdSchool,
    Images: MdImage,
    "Single Folder Page": MdFolder,
    Links: MdLink,
    ShiftLink: MdLink,
    "Oyun Bakımı": MdBuild,
    Reports: MdReceipt,
    Raporlar: MdReceipt,
    Panel: MdAdminPanelSettings,
    "Panel Control": MdSettings,
    "Page Details": MdFilePresent,
    "Disabled Condition Actions": MdLock,
  };

  return iconMap[menuName] || MdSpaceDashboard;
};

// Keep navigation icons immediately available. Custom families load only when used.
const coreIcons: Record<string, IconType> = {
  MdGroup,
  MdTranslate,
  MdVpnKey,
  MdAccountBalanceWallet,
  MdAddShoppingCart,
  MdAdminPanelSettings,
  MdArchive,
  MdAssessment,
  MdAttachMoney,
  MdBarChart,
  MdBuild,
  MdCardGiftcard,
  MdChecklist,
  MdDeliveryDining,
  MdDescription,
  MdEventAvailable,
  MdExtension,
  MdFeedback,
  MdFilePresent,
  MdFolder,
  MdImage,
  MdInventory2,
  MdLink,
  MdListAlt,
  MdLocalOffer,
  MdLocalShipping,
  MdLocationOn,
  MdLock,
  MdMenuBook,
  MdNotifications,
  MdPerson,
  MdPlaylistAddCheck,
  MdPointOfSale,
  MdReceipt,
  MdSchedule,
  MdSchool,
  MdSettings,
  MdShoppingBag,
  MdShoppingCart,
  MdSort,
  MdSpaceDashboard,
  MdSportsEsports,
  MdStorefront,
  MdSummarize,
  MdSupervisorAccount,
  MdTableRestaurant,
  MdTimer,
  MdTrendingUp,
  MdVerifiedUser,
  MdWarning
};

const iconLoaders: Record<string, () => Promise<Record<string, unknown>>> = {
  Ai: () => import("react-icons/ai"),
  Bi: () => import("react-icons/bi"),
  Bs: () => import("react-icons/bs"),
  Cg: () => import("react-icons/cg"),
  Di: () => import("react-icons/di"),
  Fa: () => import("react-icons/fa"),
  Fc: () => import("react-icons/fc"),
  Fi: () => import("react-icons/fi"),
  Gi: () => import("react-icons/gi"),
  Go: () => import("react-icons/go"),
  Gr: () => import("react-icons/gr"),
  Hi: () => import("react-icons/hi"),
  Im: () => import("react-icons/im"),
  Io: () => import("react-icons/io"),
  Md: () => import("react-icons/md"),
  Ri: () => import("react-icons/ri"),
  Si: () => import("react-icons/si"),
  Sl: () => import("react-icons/sl"),
  Tb: () => import("react-icons/tb"),
  Ti: () => import("react-icons/ti"),
};
const familyRequests = new Map<string, Promise<Record<string, unknown>>>();
const customIcons = new Map<string, IconType>();

export const getIconByName = (iconName: string): IconType => {
  if (coreIcons[iconName]) return coreIcons[iconName];
  const prefix = /^[A-Z][a-z]+/.exec(iconName)?.[0] || "";
  const loader = iconLoaders[prefix];
  if (!loader) return MdSpaceDashboard;
  const cached = customIcons.get(iconName);
  if (cached) return cached;

  const DeferredIcon = (props: IconBaseProps) => {
    const [Icon, setIcon] = useState<IconType>(() => MdSpaceDashboard);
    useEffect(() => {
      let active = true;
      let request = familyRequests.get(prefix);
      if (!request) {
        request = loader();
        familyRequests.set(prefix, request);
      }
      request.then((family) => {
        const resolved = family[iconName];
        if (active && typeof resolved === "function") setIcon(() => resolved as IconType);
      }).catch(() => {
        // Keep a useful icon if the optional chunk is unavailable; allow a retry.
        familyRequests.delete(prefix);
      });
      return () => { active = false; };
    }, []);
    return <Icon {...props} />;
  };
  customIcons.set(iconName, DeferredIcon);
  return DeferredIcon;
};
