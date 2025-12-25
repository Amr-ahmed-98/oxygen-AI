/**
 * ============================================
 * Molecule PermissionMatrixMini - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Checkbox } from "../atoms/Checkbox";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculePermissionMatrixMiniProps {
  permissions: Array<{
    key: string;
    label: string;
    checked: boolean;
  }>;
  roles: Array<{
    key: string;
    label: string;
  }>;
  onPermissionChange?: (role: string, permission: string, checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function PermissionMatrixMini({
  permissions,
  roles,
  onPermissionChange,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculePermissionMatrixMiniProps) {
  const [matrix, setMatrix] = React.useState<Record<string, Record<string, boolean>>>({});
  
  const moleculeClassName = cn("molecule-permission-matrix-mini", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <table className="molecule-permission-matrix-mini-table">
        <thead>
          <tr>
            <th><Text size={size}>Permission</Text></th>
            {roles.map(role => (
              <th key={role.key}><Text size={size}>{role.label}</Text></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map(permission => (
            <tr key={permission.key}>
              <td><Text size={size}>{permission.label}</Text></td>
              {roles.map(role => (
                <td key={role.key}>
                  <Checkbox
                    checked={matrix[role.key]?.[permission.key] || false}
                    onChange={(e) => {
                      const newMatrix = {
                        ...matrix,
                        [role.key]: {
                          ...(matrix[role.key] || {}),
                          [permission.key]: e.target.checked,
                        },
                      };
                      setMatrix(newMatrix);
                      onPermissionChange?.(role.key, permission.key, e.target.checked);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

