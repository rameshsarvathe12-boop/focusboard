import React from 'react';
import { Pencil, Trash2, Calendar, Tag, Check } from 'lucide-react';

/** Format ISO date string to readable label */
function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === 'completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + 'T00:00:00') < today;
}

/** Inline status badge (non-interactive, used for display) */
function StatusBadge({ status }) {
  const map = {
    'todo':        'To Do',
    'in-progress': 'In Progress',
    'completed':   'Completed',
  };
  return (
    <span className={`status-badge ${status}`}>
      {map[status] ?? status}
    </span>
  );
}

/** Priority badge */
function PriorityBadge({ priority }) {
  return (
    <span
      className={`priority-badge ${priority}`}
      aria-label={`Priority: ${priority}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, description, category, status, priority, dueDate } = task;
  const overdue = isOverdue(dueDate, status);

  const handleCheck = () => {
    onStatusChange(id, status === 'completed' ? 'todo' : 'completed');
  };

  const handleStatusSelect = (e) => {
    onStatusChange(id, e.target.value);
  };

  return (
    <article
      className="task-row"
      aria-label={`Task: ${title}`}
    >
      {/* Complete toggle checkbox */}
      <button
        className={`task-checkbox${status === 'completed' ? ' checked' : ''}`}
        onClick={handleCheck}
        aria-label={
          status === 'completed' ? 'Mark task as incomplete' : 'Mark task as complete'
        }
        aria-pressed={status === 'completed'}
        type="button"
      >
        {status === 'completed' && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Info */}
      <div className="task-info">
        <div className={`task-title${status === 'completed' ? ' done-text' : ''}`}>
          {title}
        </div>
        {description && (
          <div className="task-description" title={description}>
            {description}
          </div>
        )}
        <div className="task-meta">
          {category && (
            <span className="task-category">
              <Tag size={10} aria-hidden="true" />
              {category}
            </span>
          )}
          {dueDate && (
            <span className={`task-due${overdue ? ' overdue' : ''}`}>
              <Calendar size={10} aria-hidden="true" />
              {overdue ? 'Overdue · ' : ''}{fmtDate(dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Priority */}
      <PriorityBadge priority={priority} />

      {/* Status change dropdown */}
      <label htmlFor={`status-${id}`} className="sr-only">
        Change status for task: {title}
      </label>
      <select
        id={`status-${id}`}
        className={`task-status-select ${status}`}
        value={status}
        onChange={handleStatusSelect}
        aria-label={`Task status: ${status}. Click to change.`}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Action buttons */}
      <div
        className="task-actions"
        role="group"
        aria-label={`Actions for: ${title}`}
      >
        <button
          className="task-action-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${title}`}
          title="Edit task"
          type="button"
        >
          <Pencil size={14} />
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(id, title)}
          aria-label={`Delete task: ${title}`}
          title="Delete task"
          type="button"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  );
}
