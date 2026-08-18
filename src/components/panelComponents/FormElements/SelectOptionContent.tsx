import { OptionType } from "../../../types";

export const SelectOptionContent = ({ option }: { option: OptionType }) => {
  if (!option.leftLabel && !option.rightLabel) return <span>{option.label}</span>;
  return (
    <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
      <span data-option-left className="min-w-0 flex-1 truncate">{option.leftLabel || option.label}</span>
      {option.rightLabel && (
        <span data-option-right className="shrink-0 text-right font-medium text-neutral-700">{option.rightLabel}</span>
      )}
    </span>
  );
};
