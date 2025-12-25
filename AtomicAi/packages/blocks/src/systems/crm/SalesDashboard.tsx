/**
 * ============================================
 * CRM Sales Dashboard Block
 * ============================================
 */

import React from "react";
import { StatGroup, ChartCard, KPICard } from "@atomic-ai/ui-antd";

export interface SalesDashboardProps {
  stats: {
    totalRevenue: number;
    dealsWon: number;
    dealsLost: number;
    avgDealSize: number;
    conversionRate: number;
  };
  chartData?: any;
}

export function SalesDashboard({ stats, chartData }: SalesDashboardProps) {
  const statItems = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      trend: { value: 12, direction: "up" as const },
    },
    {
      label: "Deals Won",
      value: stats.dealsWon.toString(),
    },
    {
      label: "Avg Deal Size",
      value: `$${stats.avgDealSize.toLocaleString()}`,
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      trend: { value: 5, direction: "up" as const },
    },
  ];
  
  return (
    <div className="block-sales-dashboard">
      <StatGroup stats={statItems} variant="grid" columns={4} />
      
      <div className="block-sales-dashboard-charts">
        <ChartCard title="Revenue Trend" chartType="line">
          {/* Chart component would go here */}
        </ChartCard>
        <ChartCard title="Deals by Stage" chartType="bar">
          {/* Chart component would go here */}
        </ChartCard>
      </div>
    </div>
  );
}

