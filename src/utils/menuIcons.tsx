import { IconType } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as DiIcons from "react-icons/di";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import {
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
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as SlIcons from "react-icons/sl";
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";

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

// Get icon by icon component name dynamically from react-icons
export const getIconByName = (iconName: string): IconType => {
  // Default icon if not found
  const defaultIcon = MdIcons.MdSpaceDashboard;

  if (!iconName) return defaultIcon;

  // Combine all icon libraries
  const allIcons = {
    ...MdIcons,
    ...FaIcons,
    ...AiIcons,
    ...BsIcons,
    ...BiIcons,
    ...DiIcons,
    ...FiIcons,
    ...FcIcons,
    ...GiIcons,
    ...GoIcons,
    ...GrIcons,
    ...HiIcons,
    ...ImIcons,
    ...IoIcons,
    ...RiIcons,
    ...SiIcons,
    ...SlIcons,
    ...TbIcons,
    ...TiIcons,
    ...CgIcons,
  };

  // Return the icon if it exists, otherwise return default
  return (allIcons as any)[iconName] || defaultIcon;
};
