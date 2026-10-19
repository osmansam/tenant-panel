import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { type Field } from "../../../utils/api/container";
import type { ContainerModel } from "../../../utils/api/container";
import { getFieldLabel } from "../../../utils/genericPageHelpers";
import { generateMockData } from "../../../utils/mockDataGenerator";
import {
  DEFAULT_TABLE_DATE_FORMAT,
  formatTableDate,
} from "../../../utils/tableDateFormat";
import { WorkspaceDialog } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";
import DataTable from "../Tables/DataTable";

interface ContainerDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
}

type PreviewRow = Record<string, unknown> & { _id: string };

const isTruthyValue = (value: unknown): boolean =>
  value === true || value === "true" || value === 1 || value === "1" || value === "Yes";

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const renderFieldValue = (field: Field, value: unknown): ReactNode => {
  if (field.enumList && field.enumList.length > 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-ui-primary-soft px-2.5 py-0.5 text-xs font-medium text-ui-primary">
        {value === null || value === undefined || value === ""
          ? "—"
          : String(value)}
      </span>
    );
  }

  const type = (field.type || "string").toLowerCase();

  switch (type) {
    case "image":
    case "img": {
      const src = typeof value === "string" ? value : "";
      if (!src) return <span className="text-ui-placeholder">—</span>;
      return (
        <img
          src={src}
          alt=""
          className="h-9 w-9 rounded-full object-cover ring-1 ring-ui-border"
        />
      );
    }
    case "boolean":
    case "bool": {
      const truthy = isTruthyValue(value);
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            truthy
              ? "bg-ui-success-subtle text-ui-success"
              : "bg-ui-neutral-subtle text-ui-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              truthy ? "bg-ui-success" : "bg-ui-muted/50"
            }`}
          />
          {truthy ? "True" : "False"}
        </span>
      );
    }
    case "date": {
      const formatted = formatTableDate(value, DEFAULT_TABLE_DATE_FORMAT);
      return (
        <span className="tabular-nums">
          {formatted || <span className="text-ui-placeholder">—</span>}
        </span>
      );
    }
    case "number":
    case "int":
    case "integer": {
      const numeric = toNumber(value);
      return (
        <span className="tabular-nums font-medium text-ui-foreground">
          {numeric === null ? (
            <span className="text-ui-placeholder">—</span>
          ) : (
            numeric.toLocaleString("en-US")
          )}
        </span>
      );
    }
    case "objectid": {
      if (value === null || value === undefined || value === "")
        return <span className="text-ui-placeholder">—</span>;
      return (
        <span className="inline-flex max-w-[180px] items-center truncate rounded-ui-sm bg-ui-surface-muted px-2 py-0.5 font-mono text-xs text-ui-muted">
          {String(value)}
        </span>
      );
    }
    case "objectidarray":
    case "stringarray":
    case "numberarray":
    case "intarray": {
      const items = Array.isArray(value) ? value : [];
      if (items.length === 0)
        return <span className="text-ui-placeholder">—</span>;
      return (
        <span className="flex flex-wrap items-center gap-1">
          {items.slice(0, 2).map((item, index) => (
            <span
              key={index}
              className="inline-flex max-w-[140px] items-center truncate rounded-full bg-ui-surface-muted px-2 py-0.5 text-xs text-ui-muted"
            >
              {String(item)}
            </span>
          ))}
          {items.length > 2 && (
            <span className="text-xs text-ui-placeholder">
              +{items.length - 2}
            </span>
          )}
        </span>
      );
    }
    default: {
      if (value === null || value === undefined || value === "")
        return <span className="text-ui-placeholder">—</span>;
      return (
        <span className="block max-w-[240px] truncate">{String(value)}</span>
      );
    }
  }
};

export function ContainerDataModal({
  isOpen,
  onClose,
  container,
}: ContainerDataModalProps) {
  const { t } = useTranslation();

  const fields = useMemo(
    () =>
      (container?.fields || []).filter(
        (field) => field.name !== "_id" && field.name !== "id",
      ),
    [container],
  );

  const columns = useMemo(
    () =>
      fields.map((field) => ({
        key: getFieldLabel(field),
        correspondingKey: field.name,
        isSortable: true,
      })),
    [fields],
  );

  const rowKeys = useMemo(
    () =>
      fields.map((field) => ({
        key: field.name,
        node: (row: PreviewRow) => renderFieldValue(field, row[field.name]),
      })),
    [fields],
  );

  const rows = useMemo<PreviewRow[]>(
    () => (fields.length > 0 ? generateMockData<PreviewRow>(fields, 10) : []),
    [fields],
  );

  if (!container) return null;

  const title = t("{{schemaName}} data", {
    schemaName: container.schemaName,
  });

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={onClose}
      size="workspace"
      title={
        <span className="block break-all sm:break-normal">
          {title}
        </span>
      }
      description={
        <span className="block break-all sm:break-normal">
          {t("Read-only records from {{schemaName}}", {
            schemaName: container.schemaName,
          })}
        </span>
      }
      closeLabel={t("Close data viewer")}
      bodyClassName="min-w-0"
      footer={
        <div className="flex justify-end">
          <GenericButton variant="outline" size="sm" onClick={onClose}>
            {t("Close")}
          </GenericButton>
        </div>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        rowKeys={rowKeys}
        isSearch={true}
        emptyTitle={t("No fields to display")}
        emptyDescription={t("Add fields to the schema to see records here.")}
      />
    </WorkspaceDialog>
  );
}
