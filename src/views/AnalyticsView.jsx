import React, { useMemo } from 'react';
import {
  BarChart2, CheckCircle2, Clock, AlertTriangle, TrendingUp, PieChart, Award
} from 'lucide-react';

export default function AnalyticsView({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Category breakdown
  const categoryStats = useMemo(() => {
    const counts = {};
    tasks.forEach(t => {
      const cat = t.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  }, [tasks, total]);

  // Priority breakdown
  const priorityStats = useMemo(() => {
    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;
    return { high, medium, low };
  }, [tasks]);

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Productivity Analytics</h2>
          <p>Deep dive into your task execution, velocity, and completion trends</p>
        </div>
      </div>

      {/* Top metric highlights */}
      <div className="analytics-metrics-grid">
        <div className="analytics-card metric-card">
          <div className="metric-header">
            <span>Overall Completion</span>
            <Award size={18} color="var(--primary)" />
          </div>
          <div className="metric-value">{completionRate}%</div>
          <div className="metric-sub">{completed} of {total} tasks achieved</div>
          <div className="stat-mini-bar" style={{ marginTop: '12px' }}>
            <div className="stat-mini-fill" style={{ width: `${completionRate}%`, background: 'var(--done)' }} />
          </div>
        </div>

        <div className="analytics-card metric-card">
          <div className="metric-header">
            <span>Active Sprint</span>
            <Clock size={18} color="var(--progress)" />
          </div>
          <div className="metric-value">{inProgress}</div>
          <div className="metric-sub">Tasks currently being worked on</div>
        </div>

        <div className="analytics-card metric-card">
          <div className="metric-header">
            <span>High Priority Attention</span>
            <AlertTriangle size={18} color="var(--high)" />
          </div>
          <div className="metric-value">{priorityStats.high}</div>
          <div className="metric-sub">Critical tasks requiring focus</div>
        </div>

        <div className="analytics-card metric-card">
          <div className="metric-header">
            <span>Backlog Queue</span>
            <TrendingUp size={18} color="var(--todo)" />
          </div>
          <div className="metric-value">{todo}</div>
          <div className="metric-sub">Pending items in To Do</div>
        </div>
      </div>

      {/* Detailed charts & breakdowns */}
      <div className="analytics-charts-grid">
        {/* Category distribution */}
        <div className="analytics-card">
          <div className="analytics-card-title">
            <PieChart size={18} color="var(--primary)" />
            Task Distribution by Category
          </div>
          <div className="category-bars">
            {categoryStats.map(cat => (
              <div key={cat.name} className="cat-bar-item">
                <div className="cat-bar-header">
                  <span className="cat-bar-name">{cat.name}</span>
                  <span className="cat-bar-count">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${cat.pct}%`,
                      background: 'linear-gradient(90deg, var(--primary), var(--primary-light))'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority distribution */}
        <div className="analytics-card">
          <div className="analytics-card-title">
            <BarChart2 size={18} color="var(--primary)" />
            Priority Breakdown
          </div>
          <div className="priority-bars-container">
            <div className="priority-bar-row">
              <span className="p-label">High Priority</span>
              <div className="p-bar-track">
                <div
                  className="p-bar-fill"
                  style={{
                    width: `${total > 0 ? (priorityStats.high / total) * 100 : 0}%`,
                    background: 'var(--high)'
                  }}
                />
              </div>
              <span className="p-count">{priorityStats.high}</span>
            </div>

            <div className="priority-bar-row">
              <span className="p-label">Medium Priority</span>
              <div className="p-bar-track">
                <div
                  className="p-bar-fill"
                  style={{
                    width: `${total > 0 ? (priorityStats.medium / total) * 100 : 0}%`,
                    background: 'var(--medium)'
                  }}
                />
              </div>
              <span className="p-count">{priorityStats.medium}</span>
            </div>

            <div className="priority-bar-row">
              <span className="p-label">Low Priority</span>
              <div className="p-bar-track">
                <div
                  className="p-bar-fill"
                  style={{
                    width: `${total > 0 ? (priorityStats.low / total) * 100 : 0}%`,
                    background: 'var(--low)'
                  }}
                />
              </div>
              <span className="p-count">{priorityStats.low}</span>
            </div>
          </div>

          <div className="analytics-insight-box">
            <h4>💡 Focus Recommendation</h4>
            <p>
              {priorityStats.high > 2
                ? 'You have multiple high priority tasks. Consider completing these first before starting new backlog items.'
                : 'Good balance of priorities! Maintain velocity by tackling in-progress items.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
