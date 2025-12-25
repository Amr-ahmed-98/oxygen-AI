/**
 * ============================================
 * CRM Activity Timeline Block
 * ============================================
 */

import React from "react";
import { ActivityFeed } from "@atomic-ai/ui-antd";

export interface ActivityTimelineProps {
  activities: Array<{
    id: string;
    type: "call" | "email" | "meeting" | "note" | "task";
    title: string;
    description?: string;
    timestamp: string;
    actor?: { name: string; avatar?: string };
  }>;
  onActivityClick?: (id: string) => void;
}

export function ActivityTimeline({ activities, onActivityClick }: ActivityTimelineProps) {
  const feedItems = activities.map(activity => ({
    id: activity.id,
    actor: activity.actor,
    action: activity.title,
    timestamp: activity.timestamp,
    meta: {
      icon: activity.type === "call" ? "phone" : activity.type === "email" ? "mail" : "calendar",
      secondaryText: activity.description,
    },
  }));
  
  return (
    <div className="block-activity-timeline">
      <ActivityFeed
        items={feedItems}
        variant="grouped"
        onItemOpen={(item) => onActivityClick?.(item.id)}
      />
    </div>
  );
}

