/**
 * ============================================
 * Molecule OTPCodeInputRow - Composed from Atoms
 * ============================================
 */

import React, { useState, useRef } from "react";
import { OTPInput } from "../atoms/OTPInput";
import { Link } from "../atoms/Link";
import { Text } from "../atoms/Text";
import { HelperText } from "../atoms/HelperText";
import { cn } from "../utils/cn";

export interface MoleculeOTPCodeInputRowProps {
  length?: number;
  value?: string;
  size?: "sm" | "md" | "lg";
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  resendLabel?: string;
  resendCooldown?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onResend?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function OTPCodeInputRow({
  length = 6,
  value,
  size = "md",
  error,
  disabled = false,
  autoFocus = true,
  resendLabel = "Resend code",
  resendCooldown = 60,
  onChange,
  onComplete,
  onResend,
  className,
  dataTestId,
  importRef,
}: MoleculeOTPCodeInputRowProps) {
  const [code, setCode] = useState(value || "");
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  
  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  
  const handleChange = (newValue: string) => {
    setCode(newValue);
    onChange?.(newValue);
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };
  
  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setCode("");
    setCooldown(resendCooldown);
    await onResend?.();
    setIsResending(false);
  };
  
  const moleculeClassName = cn(
    "molecule-otp-code-input-row",
    `molecule-otp-code-input-row--${size}`,
    error && "molecule-otp-code-input-row--error",
    disabled && "molecule-otp-code-input-row--disabled",
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <OTPInput
        length={length}
        value={code}
        onChange={handleChange}
        size={size}
        disabled={disabled}
        autoFocus={autoFocus}
        importRef={importRef}
      />
      
      {error && (
        <HelperText variant="error" size="sm" importRef={importRef}>
          {error}
        </HelperText>
      )}
      
      <div className="molecule-otp-code-input-row-footer">
        <Text size="sm" tone="secondary">
          Didn't receive code?
        </Text>
        {cooldown > 0 ? (
          <Text size="sm" tone="secondary">
            Resend in {cooldown}s
          </Text>
        ) : (
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleResend();
            }}
            size="sm"
            disabled={isResending}
            importRef={importRef}
          >
            {resendLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

