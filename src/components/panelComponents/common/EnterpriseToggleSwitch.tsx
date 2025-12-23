import { Switch } from "@headlessui/react";
import React from "react";

interface EnterpriseToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const EnterpriseToggleSwitch: React.FC<EnterpriseToggleSwitchProps> = ({
  checked,
  onChange,
  className = "",
}) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-blue-600" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default EnterpriseToggleSwitch;
