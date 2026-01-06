import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useCreatePage } from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import TextInput from "../FormElements/TextInput";

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Popular icon options for pages
const ICON_OPTIONS = [
  { value: "MdSpaceDashboard", label: "Dashboard" },
  { value: "MdTableRestaurant", label: "Table" },
  { value: "MdShoppingCart", label: "Shopping Cart" },
  { value: "MdPerson", label: "Person" },
  { value: "MdSettings", label: "Settings" },
  { value: "MdAssessment", label: "Assessment" },
  { value: "MdBarChart", label: "Bar Chart" },
  { value: "MdDescription", label: "Description" },
  { value: "MdFolder", label: "Folder" },
  { value: "MdImage", label: "Image" },
  { value: "MdNotifications", label: "Notifications" },
  { value: "MdCardGiftcard", label: "Gift Card" },
  { value: "MdReceipt", label: "Receipt" },
  { value: "MdStorefront", label: "Store" },
  { value: "MdInventory2", label: "Inventory" },
  { value: "MdAttachMoney", label: "Money" },
  { value: "MdLocalShipping", label: "Shipping" },
  { value: "MdEventAvailable", label: "Event" },
  { value: "MdFeedback", label: "Feedback" },
  { value: "MdVerifiedUser", label: "Verified User" },
];

export const CreatePageModal: React.FC<CreatePageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [pageName, setPageName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("MdSpaceDashboard");
  const { createPage, isCreating } = useCreatePage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName.trim()) return;

    // Create page with just name, icon, and empty sections
    createPage({
      name: pageName.trim(),
      icon: selectedIcon,
      sections: [], // Empty sections as requested
      isAuthenticated: true, // Default to authenticated
    });

    // Reset form and close modal
    setPageName("");
    setSelectedIcon("MdSpaceDashboard");
    onClose();
  };

  const handleCancel = () => {
    setPageName("");
    setSelectedIcon("MdSpaceDashboard");
    onClose();
  };

  if (!isOpen) return null;

  const SelectedIconComponent = getIconByName(selectedIcon);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              {t("Create New Page")}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t("Set up a new page for your project")}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Preview Section - Moved to Top */}
          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-neutral-200 text-neutral-700">
              <SelectedIconComponent size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-500 mb-0.5">
                {t("Preview")}
              </p>
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {pageName || t("test")}
              </p>
            </div>
          </div>

          {/* Page Name and Icon - Side by Side */}
          <div className="grid grid-cols-[1fr,auto] gap-4">
            {/* Page Name Input */}
            <div>
              <TextInput
                label={t("Page Name")}
                value={pageName}
                onChange={(value) => setPageName(value)}
                placeholder={t("Enter page name")}
                type="text"
                requiredField
              />
            </div>

            {/* Icon Selection */}
            <div className="w-48">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t("Icon")}
              </label>
              <select
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              >
                {ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <svg
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-blue-900 leading-relaxed">
              {t(
                "The page will be created with an empty structure. You can add sections and components later."
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isCreating}
              className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              disabled={!pageName.trim() || isCreating}
              className="px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
            >
              {isCreating ? t("Creating...") : t("Create Page")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
