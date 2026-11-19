import familyLoaders from "virtual:menu-icon-loaders";
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

type IconLoader = () => Promise<Record<string, unknown>>;
const familyRequests = new Map<string, Promise<Record<string, IconLoader | undefined>>>();
const groupRequests = new Map<IconLoader, Promise<Record<string, unknown>>>();
const customIcons = new Map<string, IconType>();

export const getIconByName = (iconName: string): IconType => {
  if (coreIcons[iconName]) return coreIcons[iconName];
  const prefix = iconName.slice(0, 2);
  const loadFamily = familyLoaders[prefix];
  if (!loadFamily) return MdSpaceDashboard;
  const cached = customIcons.get(iconName);
  if (cached) return cached;

  const DeferredIcon = (props: IconBaseProps) => {
    const [Icon, setIcon] = useState<IconType>(() => MdSpaceDashboard);
    useEffect(() => {
      let active = true;
      let familyRequest = familyRequests.get(prefix);
      if (!familyRequest) {
        familyRequest = loadFamily().then(module => module.default);
        familyRequests.set(prefix, familyRequest);
      }
      void familyRequest.then(async loaders => {
        const loader = loaders[iconName];
        if (!loader) return;
        let request = groupRequests.get(loader);
        if (!request) {
          request = loader().catch(error => { groupRequests.delete(loader); throw error; });
          groupRequests.set(loader, request);
        }
        const resolved = (await request)[iconName];
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
