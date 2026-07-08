export type PageIconCategory =
  | "General"
  | "Business"
  | "Commerce"
  | "People"
  | "Files"
  | "Analytics"
  | "Communication"
  | "Security"
  | "Tools";

export interface PageIconOption {
  value: string;
  label: string;
  category: PageIconCategory;
}

const options = (
  category: PageIconCategory,
  icons: Array<[value: string, label: string]>,
): PageIconOption[] =>
  icons.map(([value, label]) => ({ value, label, category }));

export const PAGE_ICON_OPTIONS: PageIconOption[] = [
  ...options("General", [
    ["MdSpaceDashboard", "Dashboard"],
    ["MdHome", "Home"],
    ["MdStar", "Star"],
    ["MdFavorite", "Favorite"],
    ["MdBookmark", "Bookmark"],
    ["MdExplore", "Explore"],
    ["MdPublic", "Public"],
    ["MdLanguage", "Language"],
    ["MdMap", "Map"],
    ["MdLocationOn", "Location"],
    ["MdCalendarMonth", "Calendar"],
    ["MdEventAvailable", "Event"],
    ["MdSchedule", "Schedule"],
  ]),
  ...options("Business", [
    ["MdBusiness", "Business"],
    ["MdBusinessCenter", "Business Center"],
    ["MdWork", "Work"],
    ["MdStorefront", "Store"],
    ["MdInventory2", "Inventory"],
    ["MdWarehouse", "Warehouse"],
    ["MdFactory", "Factory"],
    ["MdApartment", "Office"],
    ["MdAccountBalance", "Bank"],
    ["MdPointOfSale", "Point of Sale"],
    ["MdReceipt", "Receipt"],
    ["MdRequestQuote", "Quote"],
  ]),
  ...options("Commerce", [
    ["MdShoppingCart", "Shopping Cart"],
    ["MdShoppingBag", "Shopping Bag"],
    ["MdPayments", "Payments"],
    ["MdAttachMoney", "Money"],
    ["MdCreditCard", "Credit Card"],
    ["MdCardGiftcard", "Gift Card"],
    ["MdLocalShipping", "Shipping"],
    ["MdSell", "Sale"],
    ["MdLocalOffer", "Offer"],
    ["MdQrCode", "QR Code"],
    ["MdRedeem", "Redeem"],
    ["MdPriceCheck", "Price Check"],
  ]),
  ...options("People", [
    ["MdPerson", "Person"],
    ["MdPeople", "People"],
    ["MdGroups", "Groups"],
    ["MdPersonAdd", "Add Person"],
    ["MdManageAccounts", "Manage Accounts"],
    ["MdBadge", "Badge"],
    ["MdAdminPanelSettings", "Administrator"],
    ["MdSupportAgent", "Support Agent"],
    ["MdEngineering", "Engineering"],
    ["MdSchool", "Education"],
    ["MdMedicalServices", "Medical"],
    ["MdAccessibilityNew", "Accessibility"],
  ]),
  ...options("Files", [
    ["MdDescription", "Description"],
    ["MdFolder", "Folder"],
    ["MdFolderOpen", "Open Folder"],
    ["MdArticle", "Article"],
    ["MdInsertDriveFile", "File"],
    ["MdPictureAsPdf", "PDF"],
    ["MdImage", "Image"],
    ["MdCloud", "Cloud"],
    ["MdCloudUpload", "Cloud Upload"],
    ["MdDownload", "Download"],
    ["MdUploadFile", "Upload File"],
    ["MdArchive", "Archive"],
  ]),
  ...options("Analytics", [
    ["MdAssessment", "Assessment"],
    ["MdBarChart", "Bar Chart"],
    ["MdPieChart", "Pie Chart"],
    ["MdShowChart", "Line Chart"],
    ["MdAnalytics", "Analytics"],
    ["MdTrendingUp", "Trending Up"],
    ["MdTimeline", "Timeline"],
    ["MdQueryStats", "Query Statistics"],
    ["MdLeaderboard", "Leaderboard"],
    ["MdInsights", "Insights"],
    ["MdDataUsage", "Data Usage"],
    ["MdTableChart", "Table"],
    ["MdTableRestaurant", "Restaurant Table"],
  ]),
  ...options("Communication", [
    ["MdEmail", "Email"],
    ["MdChat", "Chat"],
    ["MdForum", "Forum"],
    ["MdNotifications", "Notifications"],
    ["MdCampaign", "Campaign"],
    ["MdPhone", "Phone"],
    ["MdContactSupport", "Support"],
    ["MdFeedback", "Feedback"],
    ["MdShare", "Share"],
    ["MdLink", "Link"],
    ["MdSend", "Send"],
    ["MdAlternateEmail", "Email Address"],
  ]),
  ...options("Security", [
    ["MdLock", "Lock"],
    ["MdLockOpen", "Unlocked"],
    ["MdSecurity", "Security"],
    ["MdVerifiedUser", "Verified User"],
    ["MdShield", "Shield"],
    ["MdKey", "Key"],
    ["MdVpnKey", "Access Key"],
    ["MdPolicy", "Policy"],
    ["MdPrivacyTip", "Privacy"],
    ["MdFactCheck", "Fact Check"],
    ["MdGppGood", "Protected"],
    ["MdFingerprint", "Fingerprint"],
  ]),
  ...options("Tools", [
    ["MdSettings", "Settings"],
    ["MdBuild", "Build"],
    ["MdConstruction", "Construction"],
    ["MdHandyman", "Tools"],
    ["MdCode", "Code"],
    ["MdApi", "API"],
    ["MdStorage", "Storage"],
    ["MdDns", "Server"],
    ["MdComputer", "Computer"],
    ["MdSmartphone", "Smartphone"],
    ["MdPrint", "Print"],
    ["MdSearch", "Search"],
  ]),
];

export const PAGE_ICON_CATEGORIES: PageIconCategory[] = [
  "General",
  "Business",
  "Commerce",
  "People",
  "Files",
  "Analytics",
  "Communication",
  "Security",
  "Tools",
];

export const filterPageIcons = (
  search: string,
  category: PageIconCategory | "All",
) => {
  const normalizedSearch = search.trim().toLowerCase();

  return PAGE_ICON_OPTIONS.filter(
    (option) =>
      (category === "All" || option.category === category) &&
      (!normalizedSearch ||
        option.label.toLowerCase().includes(normalizedSearch) ||
        option.value.toLowerCase().includes(normalizedSearch)),
  );
};
