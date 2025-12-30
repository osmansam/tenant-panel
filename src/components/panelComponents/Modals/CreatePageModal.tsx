import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useCreatePage } from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import { GenericButton } from "../FormElements/GenericButton";
import TextInput from "../FormElements/TextInput";
import { H2 } from "../Typography";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <H2 className="text-xl font-semibold text-gray-900">
            {t("Create New Page")}
          </H2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("Icon")}
            </label>
            <select
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Icon Preview */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl text-gray-700">
              <SelectedIconComponent />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("Preview")}
              </p>
              <p className="text-xs text-gray-500">
                {pageName || t("Page Name")}
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              {t(
                "The page will be created with an empty structure. You can add sections and components later."
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <GenericButton
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isCreating}
            >
              {t("Cancel")}
            </GenericButton>
            <GenericButton
              type="submit"
              disabled={!pageName.trim() || isCreating}
              isLoading={isCreating}
            >
              {t("Create Page")}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
};
