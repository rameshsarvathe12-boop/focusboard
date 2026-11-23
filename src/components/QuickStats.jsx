import React from 'react';
import { BarChart2 } from 'lucide-react';

/**
 * QuickStats – progress bars + priority breakdown shown beside the carousel.
 */
export default function QuickStats({ stats, breakdown }) {
  const { total, inProgress, completed, percent } = stats;
  const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const todoPct       = total > 0 ? Math.round(((total - inProgress - completed) / total) * 100) : 0;

  return (
    <div className="quick-panel" role="region" aria-label="Progress overview">
      <div className="quick-panel-title">
        <BarChart2 size={16} color="var(--primary)" aria-hidden="true" />
        Progress Overview
      </div>

      {/* Progress bars */}
      <div>
        <ProgressBar
          label="Completion Rate"
          value={percent}
          fill="var(--done)"
          aria-label={`Completion rate: ${percent}%`}
        />
        <ProgressBar
          label="In Progress"
          value={inProgressPct}
          fill="var(--progress)"
          aria-label={`In progress: ${inProgressPct}%`}
        />
        <ProgressBar
          label="To Do"
          value={todoPct}
          fill="var(--todo)"
          aria-label={`To do: ${todoPct}%`}
        />
      </div>

      {/* Priority breakdown */}
      <div className="priority-breakdown">
        <div className="priority-breakdown-title">Priority Breakdown</div>

        {[
          { key: 'high',   label: 'High Priority',   color: 'var(--high)' },
          { key: 'medium', label: 'Medium Priority',  color: 'var(--medium)' },
          { key: 'low',    label: 'Low Priority',     color: 'var(--low)' },
        ].map(({ key, label, color }) => (
          <div key={key} className="priority-item">
            <div
              className="priority-dot"
              style={{ background: color }}
              aria-hidden="true"
            />
            <span className="priority-item-label">{label}</span>
            <span
              className="priority-item-count"
              aria-label={`${breakdown[key]} ${label} tasks`}
            >
              {breakdown[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ label, value, fill }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>{label}</span>
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{value}%</span>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${value}%`}
      >
        <div
          className="progress-fill"
          style={{ width: `${value}%`, background: fill }}
        />
      </div>
    </div>
  );
}
