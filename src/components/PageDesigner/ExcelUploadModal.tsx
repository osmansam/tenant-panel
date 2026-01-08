import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUploadExcel } from "../../utils/api/container";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export function ExcelUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: ExcelUploadModalProps) {
  const { t } = useTranslation();
  const { uploadExcel, isUploading, uploadResult } = useUploadExcel();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [schemaName, setSchemaName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls"))
    ) {
      setSelectedFile(file);

      // Auto-generate schema name from file name if not set
      if (!schemaName) {
        const nameWithoutExt = file.name.replace(/\.(xlsx|xls)$/i, "");
        const sanitized = nameWithoutExt
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "_")
          .toLowerCase();
        setSchemaName(sanitized);
      }
    } else {
      alert(t("Please select a valid Excel file (.xlsx or .xls)"));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !schemaName.trim()) {
      alert(t("Please select a file and provide a schema name"));
      return;
    }

    uploadExcel({
      file: selectedFile,
      schemaName: schemaName.trim(),
    });

    // Reset form and close on success
    setTimeout(() => {
      if (uploadResult) {
        setSelectedFile(null);
        setSchemaName("");
        onUploadSuccess?.();
        onClose();
      }
    }, 500);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setSchemaName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t("Upload Excel File")}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isUploading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isUploading}
            />

            {selectedFile ? (
              <div className="space-y-2">
                <svg
                  className="w-12 h-12 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-700">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                  disabled={isUploading}
                >
                  {t("Remove")}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  {t("Drag and drop your Excel file here")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("or click to browse")}
                </p>
                <p className="text-xs text-gray-400">
                  {t("Supported formats: .xlsx, .xls")}
                </p>
              </div>
            )}
          </div>

          {/* Schema Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Schema Name")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              placeholder={t("Enter schema name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t(
                "This will be the name of the container/schema created from your data"
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <GenericButton
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isUploading}
            >
              {t("Cancel")}
            </GenericButton>
            <GenericButton
              onClick={handleUpload}
              variant="primary"
              className="flex-1"
              disabled={!selectedFile || !schemaName.trim() || isUploading}
            >
              {isUploading ? t("Uploading...") : t("Upload")}
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  );
}
