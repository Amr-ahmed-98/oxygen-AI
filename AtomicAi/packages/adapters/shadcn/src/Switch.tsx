/**
 * ============================================
 * shadcn/ui Switch Adapter
 * ============================================
 */

import React from "react";
import { cn } from "./utils";
import type { AtomSwitchProps } from "@atomic-ai/ui";

const switchSizes = {
  xs: "h-4 w-7",
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-14",
};

export function Switch(props: AtomSwitchProps) {
  const {
    checked,
    defaultChecked,
    disabled,
    label,
    size = "md",
    onChange,
    className = "",
    ...rest
  } = props;

  const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}>
      {label && <span className="text-sm">{label}</span>}
      <div className="relative inline-block">
        <input
          type="checkbox"
          role="switch"
          checked={isChecked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...rest}
        />
        <div
          className={cn(
            "rounded-full transition-colors",
            switchSizes[size],
            isChecked ? "bg-primary-600" : "bg-neutral-300",
            disabled && "opacity-50"
          )}
        >
          <div
            className={cn(
              "rounded-full bg-white transition-transform",
              size === "xs" && "h-3 w-3 mt-0.5",
              size === "sm" && "h-4 w-4 mt-0.5",
              size === "md" && "h-5 w-5 mt-0.5",
              size === "lg" && "h-6 w-6 mt-0.5",
              isChecked
                ? size === "xs"
                  ? "translate-x-3"
                  : size === "sm"
                  ? "translate-x-4"
                  : size === "md"
                  ? "translate-x-5"
                  : "translate-x-7"
                : "translate-x-0.5"
            )}
          />
        </div>
      </div>
    </label>
  );
}

