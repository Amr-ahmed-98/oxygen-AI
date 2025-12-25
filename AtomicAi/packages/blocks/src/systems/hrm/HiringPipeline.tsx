/**
 * ============================================
 * HRM Hiring Pipeline Block
 * ============================================
 */

import React from "react";
import { Stepper, CardHeader, Avatar, Badge, Button } from "@atomic-ai/ui-antd";

export interface Candidate {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  currentStage: number;
  rating?: number;
}

export interface HiringPipelineProps {
  candidates: Candidate[];
  stages: Array<{ title: string; description?: string }>;
  onCandidateClick?: (candidate: Candidate) => void;
}

export function HiringPipeline({ candidates, stages, onCandidateClick }: HiringPipelineProps) {
  return (
    <div className="block-hiring-pipeline">
      <CardHeader
        title="Hiring Pipeline"
        actions={[{ key: "add", label: "Add Candidate", icon: "plus" }]}
      />
      
      <Stepper
        items={stages.map(s => ({ title: s.title, description: s.description }))}
        variant="horizontal"
      />
      
      <div className="block-hiring-pipeline-candidates">
        {candidates.map(candidate => (
          <div
            key={candidate.id}
            className="block-candidate-card"
            onClick={() => onCandidateClick?.(candidate)}
          >
            <Avatar src={candidate.avatar} alt={candidate.name} />
            <div>
              <h4>{candidate.name}</h4>
              <p>{candidate.position}</p>
              {candidate.rating && <Badge count={`⭐ ${candidate.rating}`} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

