/**
 * ============================================
 * HRM Attendance Calendar Block
 * ============================================
 */

import React from "react";
import { Calendar, Badge } from "@atomic-ai/ui-antd";

export interface AttendanceCalendarProps {
  attendance: Record<string, "present" | "absent" | "late" | "half-day">;
  onDateSelect?: (date: string) => void;
}

export function AttendanceCalendar({ attendance, onDateSelect }: AttendanceCalendarProps) {
  const getDateCellRender = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const status = attendance[dateStr];
    
    if (!status) return null;
    
    const colors = {
      present: "success",
      absent: "danger",
      late: "warning",
      "half-day": "info",
    };
    
    return <Badge tone={colors[status]} />;
  };
  
  return (
    <div className="block-attendance-calendar">
      <Calendar
        cellRender={getDateCellRender}
        onSelect={(date) => onDateSelect?.(date.toISOString().split("T")[0])}
      />
    </div>
  );
}

