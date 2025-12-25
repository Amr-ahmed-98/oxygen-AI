/**
 * ============================================
 * HRM Payroll Summary Block
 * ============================================
 */

import React from "react";
import { StatGroup, Table, Button } from "@atomic-ai/ui-antd";

export interface PayrollSummaryProps {
  summary: {
    totalPayroll: number;
    employees: number;
    averageSalary: number;
    taxDeductions: number;
  };
  payrollData?: any[];
}

export function PayrollSummary({ summary, payrollData }: PayrollSummaryProps) {
  const stats = [
    { label: "Total Payroll", value: `$${summary.totalPayroll.toLocaleString()}` },
    { label: "Employees", value: summary.employees.toString() },
    { label: "Avg Salary", value: `$${summary.averageSalary.toLocaleString()}` },
    { label: "Tax Deductions", value: `$${summary.taxDeductions.toLocaleString()}` },
  ];
  
  return (
    <div className="block-payroll-summary">
      <StatGroup stats={stats} variant="horizontal" />
      
      {payrollData && (
        <Table
          dataSource={payrollData}
          columns={[
            { title: "Employee", dataIndex: "employee" },
            { title: "Gross", dataIndex: "gross" },
            { title: "Deductions", dataIndex: "deductions" },
            { title: "Net", dataIndex: "net" },
          ]}
        />
      )}
      
      <Button variant="solid" tone="primary">
        Generate Payroll
      </Button>
    </div>
  );
}

