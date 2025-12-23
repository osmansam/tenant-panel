import { Switch } from "@headlessui/react";

interface Props {
  checked: boolean;
  onChange: () => void;
  checkedBg?: string;
  uncheckedBg?: string;
}

export function CheckSwitch({
  checked,
  onChange,
  checkedBg,
  uncheckedBg,
}: Props) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? checkedBg || "bg-blue-500" : uncheckedBg || "bg-gray-500"
      }
       min-w-[36px]   relative inline-flex h-[20px] w-[36px] border-[1px] cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        className={`${checked ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
