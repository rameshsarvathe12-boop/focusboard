import React from 'react';

const TABS = [
  { id: 'all',         label: 'All' },
  { id: 'todo',        label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed',   label: 'Completed' },
];

export default function FilterTabs({
  statusFilter, onStatusChange,
  priorityFilter, onPriorityChange,
  statusCounts,
}) {
  return (
    <div
      className="filter-row"
      role="toolbar"
      aria-label="Task filters"
    >
      {/* Status tabs */}
      <div
        className="status-tabs"
        role="tablist"
        aria-label="Filter by status"
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`status-tab${statusFilter === tab.id ? ' active' : ''}`}
            onClick={() => onStatusChange(tab.id)}
            role="tab"
            aria-selected={statusFilter === tab.id}
            aria-controls="task-list-panel"
          >
            {tab.label}
            <span className="tab-count">
              {statusCounts[tab.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <label htmlFor="priority-filter" className="sr-only">
        Filter by priority
      </label>
      <select
        id="priority-filter"
        className="priority-select"
        value={priorityFilter}
        onChange={e => onPriorityChange(e.target.value)}
        aria-label="Filter by priority"
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}
