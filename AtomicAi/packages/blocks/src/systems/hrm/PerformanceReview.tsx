/**
 * ============================================
 * HRM Performance Review Block
 * ============================================
 */

import React from "react";
import { CardHeader, ProgressIndicator, KeyValueRow, Button } from "@atomic-ai/ui-antd";

export interface PerformanceReviewProps {
  review: {
    employeeId: string;
    employeeName: string;
    period: string;
    overallScore: number;
    goals: Array<{ title: string; score: number; maxScore: number }>;
    feedback?: string;
  };
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function PerformanceReview({ review, onApprove, onReject }: PerformanceReviewProps) {
  return (
    <div className="block-performance-review">
      <CardHeader
        title={`Performance Review - ${review.period}`}
        subtitle={review.employeeName}
      />
      
      <div className="block-performance-review-content">
        <div className="block-performance-review-overall">
          <ProgressIndicator
            percent={review.overallScore}
            label="Overall Score"
            withPercentage
          />
        </div>
        
        <div className="block-performance-review-goals">
          {review.goals.map((goal, index) => (
            <div key={index} className="block-performance-review-goal">
              <KeyValueRow label={goal.title} value={`${goal.score}/${goal.maxScore}`} />
              <ProgressIndicator percent={(goal.score / goal.maxScore) * 100} />
            </div>
          ))}
        </div>
        
        {review.feedback && (
          <div className="block-performance-review-feedback">
            <p>{review.feedback}</p>
          </div>
        )}
      </div>
      
      <div className="block-performance-review-actions">
        <Button variant="solid" tone="success" onClick={() => onApprove?.(review.employeeId)}>
          Approve
        </Button>
        <Button variant="outline" tone="danger" onClick={() => onReject?.(review.employeeId)}>
          Reject
        </Button>
      </div>
    </div>
  );
}

