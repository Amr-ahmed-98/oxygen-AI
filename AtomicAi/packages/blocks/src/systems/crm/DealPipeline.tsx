/**
 * ============================================
 * CRM Deal Pipeline Block
 * ============================================
 */

import React from "react";
import { Tabs, CardHeader, Badge, Button } from "@atomic-ai/ui-antd";

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  expectedClose: string;
}

export interface DealPipelineProps {
  deals: Record<string, Deal[]>;
  stages: Array<{ key: string; label: string; count?: number }>;
  onDealClick?: (deal: Deal) => void;
  onStageChange?: (stage: string) => void;
}

export function DealPipeline({ deals, stages, onDealClick, onStageChange }: DealPipelineProps) {
  return (
    <div className="block-deal-pipeline">
      <CardHeader
        title="Deal Pipeline"
        actions={[{ key: "add", label: "Add Deal", icon: "plus" }]}
      />
      
      <Tabs
        items={stages.map(stage => ({
          key: stage.key,
          label: stage.label,
          count: stage.count || deals[stage.key]?.length || 0,
          children: (
            <div key={stage.key} className="block-deal-pipeline-stage">
              {deals[stage.key]?.map(deal => (
                <div
                  key={deal.id}
                  className="block-deal-card"
                  onClick={() => onDealClick?.(deal)}
                >
                  <div className="block-deal-card-header">
                    <h4>{deal.name}</h4>
                    <Badge count={`$${deal.value.toLocaleString()}`} />
                  </div>
                  <p>{deal.company}</p>
                  <div className="block-deal-card-meta">
                    <span>{deal.probability}% probability</span>
                    <span>{deal.expectedClose}</span>
                  </div>
                </div>
              ))}
            </div>
          ),
        }))}
        onTabChange={onStageChange}
      />
    </div>
  );
}

