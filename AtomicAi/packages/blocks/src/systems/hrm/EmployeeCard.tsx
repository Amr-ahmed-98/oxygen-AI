/**
 * ============================================
 * HRM Employee Card Block
 * ============================================
 */

import React from "react";
import { CardHeader, Avatar, KeyValueRow, Badge } from "@atomic-ai/ui-antd";

export interface EmployeeCardProps {
  employee: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
    avatar?: string;
    status: "active" | "on-leave" | "terminated";
    joinDate: string;
  };
  onView?: (id: string) => void;
}

export function EmployeeCard({ employee, onView }: EmployeeCardProps) {
  const statusColors = {
    active: "success",
    "on-leave": "warning",
    terminated: "danger",
  };
  
  return (
    <div className="block-employee-card" onClick={() => onView?.(employee.id)}>
      <CardHeader
        title={employee.name}
        subtitle={employee.position}
        icon={<Avatar src={employee.avatar} alt={employee.name} />}
        badge={<Badge tone={statusColors[employee.status]}>{employee.status}</Badge>}
      />
      
      <div className="block-employee-card-content">
        <KeyValueRow label="Department" value={employee.department} />
        <KeyValueRow label="Email" value={employee.email} />
        <KeyValueRow label="Join Date" value={employee.joinDate} />
      </div>
    </div>
  );
}

