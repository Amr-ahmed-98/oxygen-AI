/**
 * ============================================
 * Molecule AuthForm - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { TextField } from "../atoms/TextField";
import { PasswordField } from "./passwordField";
import { Button } from "../atoms/Button";
import { Checkbox } from "../atoms/Checkbox";
import { Link } from "../atoms/Link";
import { HelperText } from "../atoms/HelperText";
import { SSOButtonsRow } from "./ssoButtonsRow";
import { OTPCodeInputRow } from "./otpCodeInputRow";
import { cn } from "../utils/cn";

export interface MoleculeAuthFormProps {
  variant?: "login" | "register" | "forgot" | "reset" | "invite";
  email?: string;
  password?: string;
  withSSO?: boolean;
  ssoProviders?: Array<{ provider: string; label: string; icon?: string }>;
  withRememberMe?: boolean;
  rememberMe?: boolean;
  withForgotPassword?: boolean;
  error?: string;
  loading?: boolean;
  onSubmit?: (data: { email: string; password?: string }) => void;
  onSSO?: (provider: string) => void;
  onForgotPassword?: () => void;
  onToggleRememberMe?: (checked: boolean) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function AuthForm({
  variant = "login",
  email: initialEmail = "",
  password: initialPassword = "",
  withSSO = true,
  ssoProviders = [],
  withRememberMe = true,
  rememberMe = false,
  withForgotPassword = true,
  error,
  loading = false,
  onSubmit,
  onSSO,
  onForgotPassword,
  onToggleRememberMe,
  className,
  dataTestId,
  importRef,
}: MoleculeAuthFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [remember, setRemember] = useState(rememberMe);
  
  const moleculeClassName = cn(
    "molecule-auth-form",
    `molecule-auth-form--${variant}`,
    className
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };
  
  return (
    <form className={moleculeClassName} onSubmit={handleSubmit} data-testid={dataTestId}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        size="md"
        importRef={importRef}
      />
      
      {variant !== "forgot" && (
        <PasswordField
          value={password}
          onChange={setPassword}
          size="md"
          importRef={importRef}
        />
      )}
      
      {withRememberMe && variant === "login" && (
        <div className="molecule-auth-form-remember">
          <Checkbox
            checked={remember}
            onChange={(e) => {
              setRemember(e.target.checked);
              onToggleRememberMe?.(e.target.checked);
            }}
          >
            Remember me
          </Checkbox>
        </div>
      )}
      
      {error && (
        <HelperText variant="error" size="sm" importRef={importRef}>
          {error}
        </HelperText>
      )}
      
      <Button
        type="submit"
        variant="solid"
        tone="primary"
        size="lg"
        loading={loading}
        fullWidth
        importRef={importRef}
      >
        {variant === "login" ? "Sign in" : variant === "register" ? "Sign up" : variant === "forgot" ? "Send reset link" : "Submit"}
      </Button>
      
      {withForgotPassword && variant === "login" && (
        <Link href="#" onClick={(e) => { e.preventDefault(); onForgotPassword?.(); }} size="sm" importRef={importRef}>
          Forgot password?
        </Link>
      )}
      
      {withSSO && ssoProviders.length > 0 && (
        <SSOButtonsRow
          providers={ssoProviders}
          onProviderClick={onSSO}
          importRef={importRef}
        />
      )}
    </form>
  );
}

