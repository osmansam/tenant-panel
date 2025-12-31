import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { Field, useGetContainers } from "../../../utils/api/container";
import { GenericButton } from "../FormElements/GenericButton";
import SelectInput from "../FormElements/SelectInput";
import TextInput from "../FormElements/TextInput";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (field: Field) => void;
  containerFields?: Field[];
}

interface ValidationRule {
  type: string;
  value?: string | number | boolean;
  message?: string;
}

// Field types based on your Go validation code
const FIELD_TYPES = [
  { value: "string", label: "String" },
  { value: "int", label: "Integer" },
  { value: "float", label: "Float" },
  { value: "decimal", label: "Decimal" },
  { value: "bool", label: "Boolean" },
  { value: "date", label: "Date" },
  { value: "object", label: "Object" },
  { value: "array", label: "Array" },
  { value: "stringArray", label: "String Array" },
  { value: "numberArray", label: "Number Array" },
  { value: "intArray", label: "Integer Array" },
  { value: "objectId", label: "Object ID" },
  { value: "objectIdArray", label: "Object ID Array" },
  { value: "autoIncrementId", label: "Auto Increment ID" },
  { value: "uuid", label: "UUID" },
  { value: "url", label: "URL" },
  { value: "ip", label: "IP Address" },
  { value: "enum", label: "Enum" },
];

// Common validation rules
const VALIDATION_RULES = {
  string: [
    "required",
    "minlength",
    "maxlength",
    "email",
    "phone",
    "url",
    "creditcard",
    "alphanumeric",
    "alpha",
    "numeric",
    "lowercase",
    "uppercase",
    "pattern",
  ],
  int: ["required", "min", "max", "positive", "negative"],
  float: ["required", "min", "max", "positive", "negative"],
  decimal: ["required", "min", "max", "positive", "negative"],
  bool: ["required"],
  date: ["required", "minDate", "maxDate"],
  stringArray: ["required", "minlength", "maxlength"],
  numberArray: ["required", "minlength", "maxlength"],
  intArray: ["required", "minlength", "maxlength"],
  objectIdArray: ["required", "minlength", "maxlength"],
  objectId: ["required"],
  autoIncrementId: ["auto"],
  uuid: ["required"],
  url: ["required"],
  ip: ["required"],
  enum: ["required", "enum"],
  object: ["required"],
  array: ["required"],
};

export const AddFieldModal: React.FC<AddFieldModalProps> = ({
  isOpen,
  onClose,
  onAddField,
  containerFields = [],
}) => {
  const { t } = useTranslation();
  const containers = useGetContainers();

  const [fieldData, setFieldData] = useState<Partial<Field>>({
    name: "",
    type: "string",
    tag: "",
    unique: false,
    isSearchable: true,
    isLoginCredential: false,
    isHashed: false,
    isForceDelete: false,
    enumList: [],
  });

  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [enumValues, setEnumValues] = useState<string>("");
  const [childFields, setChildFields] = useState<Field[]>([]);
  
  // Population settings state
  const [populationFieldName, setPopulationFieldName] = useState<string>("");
  const [populatedFields, setPopulatedFields] = useState<string[]>([]);
  const [displayFields, setDisplayFields] = useState<string[]>([]);
  const [inputSelectionField, setInputSelectionField] = useState<string>("");
  const [displayLabel, setDisplayLabel] = useState<string>("");

  // Get container options for objectSchemaName selection
  const containerOptions = useMemo(() => {
    return containers?.map((c: any) => ({
      value: c.schemaName,
      label: c.schemaName,
    })) || [];
  }, [containers]);

  // Get fields from selected container for population settings
  const selectedContainerFields = useMemo(() => {
    if (!fieldData.objectSchemaName || !containers) return [];
    const selectedContainer = containers.find(
      (c: any) => c.schemaName === fieldData.objectSchemaName
    );
    if (!selectedContainer) return [];
    return selectedContainer.fields?.map((f: Field) => ({
      value: f.name,
      label: f.name,
    })) || [];
  }, [fieldData.objectSchemaName, containers]);

  const handleFieldChange = (field: string, value: any) => {
    setFieldData((prev) => ({ ...prev, [field]: value }));
  };

  const addValidationRule = () => {
    setValidationRules((prev) => [
      ...prev,
      { type: "", value: "", message: "" },
    ]);
  };

  const updateValidationRule = (index: number, field: string, value: any) => {
    setValidationRules((prev) =>
      prev.map((rule, i) => (i === index ? { ...rule, [field]: value } : rule))
    );
  };

  const removeValidationRule = (index: number) => {
    setValidationRules((prev) => prev.filter((_, i) => i !== index));
  };

  const buildTagString = (): string => {
    const rules: string[] = [];

    validationRules.forEach((rule) => {
      if (!rule.type) return;

      let ruleStr = rule.type;

      // Add value if needed
      if (
        rule.value !== undefined &&
        rule.value !== "" &&
        rule.value !== false
      ) {
        if (typeof rule.value === "boolean" && rule.value) {
          // For boolean rules like 'required', 'email', etc.
          ruleStr = rule.type;
        } else {
          // For rules with values like 'min=5', 'maxlength=100'
          ruleStr = `${rule.type}="${rule.value}"`;
        }
      }

      // Add custom message if provided
      if (rule.message) {
        ruleStr += `,${rule.type}Message="${rule.message}"`;
      }

      rules.push(ruleStr);
    });

    return rules.join(",");
  };

  const handleSubmit = () => {
    // Validation
    if (!fieldData.name?.trim()) {
      toast.error(t("Field name is required"));
      return;
    }

    if (!fieldData.type) {
      toast.error(t("Field type is required"));
      return;
    }

    // Check for duplicate field names
    if (containerFields.some((field) => field.name === fieldData.name)) {
      toast.error(t("Field name already exists"));
      return;
    }

    // Process enum values
    let processedEnumList: (string | number)[] = [];
    if (fieldData.type === "enum" && enumValues) {
      processedEnumList = enumValues
        .split("|")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    }

    // Build population settings if applicable
    let populationSettings = undefined;
    if ((fieldData.type === "objectId" || fieldData.type === "objectIdArray") && populationFieldName) {
      if (populatedFields.length > 0 && displayFields.length > 0 && inputSelectionField && displayLabel) {
        populationSettings = {
          fieldName: populationFieldName,
          populatedFields: populatedFields,
          displayFields: displayFields,
          inputSelectionField: inputSelectionField,
          displayLabel: displayLabel,
        };
      }
    }

    // Build the field object
    const newField: Field = {
      name: fieldData.name!,
      type: fieldData.type!,
      tag: buildTagString(),
      unique: fieldData.unique || false,
      isSearchable: fieldData.isSearchable || false,
      isLoginCredential: fieldData.isLoginCredential || false,
      isHashed: fieldData.isHashed || false,
      isForceDelete: fieldData.isForceDelete || false,
      enumList: processedEnumList.length > 0 ? processedEnumList : undefined,
      children: childFields.length > 0 ? childFields : undefined,
      objectSchemaName: fieldData.objectSchemaName,
      populationSettings: populationSettings,
    };

    onAddField(newField);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setFieldData({
      name: "",
      type: "string",
      tag: "",
      unique: false,
      isSearchable: true,
      isLoginCredential: false,
      isHashed: false,
      isForceDelete: false,
      enumList: [],
    });
    setValidationRules([]);
    setEnumValues("");
    setChildFields([]);
    setPopulationFieldName("");
    setPopulatedFields([]);
    setDisplayFields([]);
    setInputSelectionField("");
    setDisplayLabel("");
    onClose();
  };

  const getAvailableRules = () => {
    const rules =
      VALIDATION_RULES[fieldData.type as keyof typeof VALIDATION_RULES] || [];
    return rules.map((rule) => ({
      value: rule,
      label: rule.charAt(0).toUpperCase() + rule.slice(1),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Add New Field")}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {/* Basic Field Information */}
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label={t("Field Name")}
                type="text"
                value={fieldData.name || ""}
                onChange={(value: string) => handleFieldChange("name", value)}
                placeholder="e.g., firstName"
                requiredField={true}
              />
              <SelectInput
                label={t("Field Type")}
                value={
                  FIELD_TYPES.find((t) => t.value === fieldData.type) || null
                }
                onChange={(value) => {
                  const selectedValue = value as {
                    value: string;
                    label: string;
                  } | null;
                  handleFieldChange("type", selectedValue?.value || "");
                }}
                options={FIELD_TYPES}
                requiredField={true}
                // Add custom styles to ensure proper z-index
                customControlBackgroundColor="white"
              />
            </div>

            {/* Object Schema Name (for object/objectId/objectIdArray types) */}
            {(fieldData.type === "object" || fieldData.type === "objectId" || fieldData.type === "objectIdArray") && (
              <SelectInput
                label={t("Object Schema Name")}
                value={
                  containerOptions.find(
                    (opt) => opt.value === fieldData.objectSchemaName
                  ) || null
                }
                onChange={(value) => {
                  const selectedValue = value as {
                    value: string;
                    label: string;
                  } | null;
                  handleFieldChange("objectSchemaName", selectedValue?.value || "");
                  // Set field name to match object schema name
                  if (selectedValue?.value) {
                    setPopulationFieldName(selectedValue.value);
                  }
                  // Reset population fields when schema changes
                  setPopulatedFields([]);
                  setDisplayFields([]);
                  setInputSelectionField("");
                }}
                options={containerOptions}
                placeholder={t("Select container schema")}
                customControlBackgroundColor="white"
              />
            )}

            {/* Enum Values (for enum type) */}
            {fieldData.type === "enum" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Enum Values")}
                </label>
                <TextInput
                  type="text"
                  value={enumValues}
                  onChange={setEnumValues}
                  placeholder="red|green|blue|yellow"
                />
              </div>
            )}

            {/* Field Properties */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                {t("Field Properties")}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Unique")}
                  </label>
                  <CheckSwitch
                    checked={fieldData.unique || false}
                    onChange={() =>
                      handleFieldChange("unique", !fieldData.unique)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Searchable")}
                  </label>
                  <CheckSwitch
                    checked={fieldData.isSearchable || false}
                    onChange={() =>
                      handleFieldChange("isSearchable", !fieldData.isSearchable)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Login Credential")}
                  </label>
                  <CheckSwitch
                    checked={fieldData.isLoginCredential || false}
                    onChange={() =>
                      handleFieldChange(
                        "isLoginCredential",
                        !fieldData.isLoginCredential
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Hashed")}
                  </label>
                  <CheckSwitch
                    checked={fieldData.isHashed || false}
                    onChange={() =>
                      handleFieldChange("isHashed", !fieldData.isHashed)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Population Settings (for objectId/objectIdArray types) */}
            {(fieldData.type === "objectId" || fieldData.type === "objectIdArray") && fieldData.objectSchemaName && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {t("Population Settings")}
                </h4>
                <div className="space-y-4">
                  <TextInput
                    label={t("Field Name (Auto-populated from Object Schema Name)")}
                    type="text"
                    value={populationFieldName}
                    onChange={setPopulationFieldName}
                    placeholder="e.g., category"
                    isReadOnly={true}
                  />
                  <SelectInput
                    label={t("Populated Fields")}
                    value={selectedContainerFields.filter((field: { value: string; label: string }) =>
                      populatedFields.includes(field.value)
                    )}
                    onChange={(value) => {
                      if (Array.isArray(value)) {
                        setPopulatedFields(value.map((v: any) => v.value));
                      } else {
                        setPopulatedFields([]);
                      }
                    }}
                    options={selectedContainerFields}
                    placeholder={t("Select fields to populate")}
                    isMultiple={true}
                    customControlBackgroundColor="white"
                  />
                  <SelectInput
                    label={t("Display Fields")}
                    value={selectedContainerFields.filter((field: { value: string; label: string }) =>
                      displayFields.includes(field.value)
                    )}
                    onChange={(value) => {
                      if (Array.isArray(value)) {
                        setDisplayFields(value.map((v: any) => v.value));
                      } else {
                        setDisplayFields([]);
                      }
                    }}
                    options={selectedContainerFields}
                    placeholder={t("Select fields to display")}
                    isMultiple={true}
                    customControlBackgroundColor="white"
                  />
                  <SelectInput
                    label={t("Input Selection Field")}
                    value={
                      selectedContainerFields.find(
                        (field: { value: string; label: string }) => field.value === inputSelectionField
                      ) || null
                    }
                    onChange={(value) => {
                      const selectedValue = value as {
                        value: string;
                        label: string;
                      } | null;
                      setInputSelectionField(selectedValue?.value || "");
                    }}
                    options={selectedContainerFields}
                    placeholder={t("Select input selection field")}
                    customControlBackgroundColor="white"
                  />
                  <TextInput
                    label={t("Display Label")}
                    type="text"
                    value={displayLabel}
                    onChange={setDisplayLabel}
                    placeholder="e.g., Category Quantity"
                  />
                </div>
              </div>
            )}

            {/* Validation Rules */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {t("Validation Rules")}
                </h4>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={addValidationRule}
                  iconLeft={<FiPlus size={12} />}
                >
                  {t("Add Rule")}
                </GenericButton>
              </div>

              <div className="space-y-3">
                {validationRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-end space-x-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <SelectInput
                        label={t("Rule Type")}
                        value={
                          getAvailableRules().find(
                            (o) => o.value === rule.type
                          ) || null
                        }
                        onChange={(value) => {
                          const selectedValue = value as {
                            value: string;
                            label: string;
                          } | null;
                          updateValidationRule(
                            index,
                            "type",
                            selectedValue?.value || ""
                          );
                        }}
                        options={getAvailableRules()}
                        placeholder={t("Select rule type")}
                      />
                    </div>

                    {/* Value field for rules that need values */}
                    {![
                      "required",
                      "email",
                      "phone",
                      "url",
                      "creditcard",
                      "alphanumeric",
                      "alpha",
                      "numeric",
                      "lowercase",
                      "uppercase",
                      "positive",
                      "negative",
                      "auto",
                    ].includes(rule.type) &&
                      rule.type && (
                        <div className="flex-1">
                          <TextInput
                            label={t("Value")}
                            type="text"
                            value={rule.value?.toString() || ""}
                            onChange={(value: string) =>
                              updateValidationRule(index, "value", value)
                            }
                            placeholder={
                              rule.type === "enum"
                                ? "red|green|blue"
                                : rule.type === "pattern"
                                ? "^[a-zA-Z]+$"
                                : rule.type.includes("Date")
                                ? "2023-01-01"
                                : "Value"
                            }
                          />
                        </div>
                      )}

                    <div className="flex-1">
                      <TextInput
                        label={t("Custom Message")}
                        type="text"
                        value={rule.message || ""}
                        onChange={(value: string) =>
                          updateValidationRule(index, "message", value)
                        }
                        placeholder={t("Custom error message")}
                      />
                    </div>

                    <GenericButton
                      variant="outline"
                      size="sm"
                      onClick={() => removeValidationRule(index)}
                      iconLeft={<FiTrash2 size={12} />}
                    ></GenericButton>
                  </div>
                ))}

                {validationRules.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    {t("No validation rules added")}
                  </p>
                )}
              </div>
            </div>

            {/* Generated Tag Preview */}
            {validationRules.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {t("Generated Tag")}
                </h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <code className="text-xs text-gray-800 break-all">
                    {buildTagString() || t("No validation rules")}
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end space-x-3">
            <GenericButton variant="outline" onClick={handleClose}>
              {t("Cancel")}
            </GenericButton>
            <GenericButton onClick={handleSubmit}>
              {t("Add Field")}
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  );
};
