import { Switch } from "@headlessui/react";

interface Props {
  checked: boolean;
  onChange: () => void;
  checkedBg?: string;
  uncheckedBg?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export function CheckSwitch({
  checked,
  onChange,
  checkedBg,
  uncheckedBg,
  ariaLabel,
  disabled = false,
}: Props) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${
        checked ? checkedBg || "bg-ui-primary" : uncheckedBg || "bg-ui-border-strong"
      }
       ui-focus-ring min-w-[36px] relative inline-flex h-[20px] w-[36px] border-[1px] rounded-full border-transparent transition-colors duration-200 ease-in-out before:absolute before:-inset-x-1 before:-inset-y-2 ${
         disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
       }`}
    >
      <span
        className={`${checked ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
