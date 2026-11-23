import React, { useMemo } from 'react';
import { Plus, GripVertical, Pencil, Trash2, Calendar, Tag } from 'lucide-react';

const COLUMNS = [
  { id: 'todo',        label: 'To Do',       color: 'var(--todo)',     bg: 'var(--todo-bg)',     textColor: 'var(--todo-text)' },
  { id: 'in-progress', label: 'In Progress',  color: 'var(--progress)', bg: 'var(--progress-bg)', textColor: 'var(--progress-text)' },
  { id: 'completed',   label: 'Completed',    color: 'var(--done)',     bg: 'var(--done-bg)',     textColor: 'var(--done-text)' },
];

function fmtDate(str) {
  if (!str) return '';
  return new Date(str + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === 'completed') return false;
  const today = new Date(); today.setHours(0,0,0,0);
  return new Date(dateStr + 'T00:00:00') < today;
}

function KanbanCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, description, category, status, priority, dueDate } = task;
  const overdue = isOverdue(dueDate, status);

  return (
    <article className="kb-card" aria-label={`Task: ${title}`}>
      <div className="kb-card-header">
        <span className={`priority-badge ${priority}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        <div className="kb-card-actions">
          <button className="task-action-btn" onClick={() => onEdit(task)} aria-label={`Edit ${title}`} type="button">
            <Pencil size={13} />
          </button>
          <button className="task-action-btn delete" onClick={() => onDelete(id, title)} aria-label={`Delete ${title}`} type="button">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <h4 className="kb-card-title">{title}</h4>
      {description && <p className="kb-card-desc">{description}</p>}

      <div className="kb-card-meta">
        {category && (
          <span className="task-category"><Tag size={10} /> {category}</span>
        )}
        {dueDate && (
          <span className={`task-due${overdue ? ' overdue' : ''}`}>
            <Calendar size={10} /> {overdue ? 'Overdue · ' : ''}{fmtDate(dueDate)}
          </span>
        )}
      </div>

      {/* Quick move buttons */}
      <div className="kb-card-move">
        {COLUMNS.filter(c => c.id !== status).map(col => (
          <button
            key={col.id}
            className="kb-move-btn"
            style={{ background: col.bg, color: col.textColor }}
            onClick={() => onStatusChange(id, col.id)}
            type="button"
          >
            → {col.label}
          </button>
        ))}
      </div>
    </article>
  );
}

export default function TasksView({
  tasks, onAddTask, onEditTask, onDeleteTask, onStatusChangeTask,
}) {
  const columns = useMemo(() =>
    COLUMNS.map(col => ({
      ...col,
      items: tasks.filter(t => t.status === col.id),
    }))
  , [tasks]);

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>My Tasks</h2>
          <p>Kanban board — drag tasks between columns to update status</p>
        </div>
        <button className="btn-primary" onClick={onAddTask} type="button">
          <Plus size={16} aria-hidden="true" /> Add Task
        </button>
      </div>

      <div className="kanban-board" role="region" aria-label="Kanban task board">
        {columns.map(col => (
          <div key={col.id} className="kb-column">
            {/* Column header */}
            <div className="kb-col-header">
              <div className="kb-col-title">
                <span className="kb-col-dot" style={{ background: col.color }} />
                {col.label}
              </div>
              <span className="kb-col-count">{col.items.length}</span>
            </div>

            {/* Cards */}
            <div className="kb-col-body" role="list" aria-label={`${col.label} tasks`}>
              {col.items.length === 0 ? (
                <div className="kb-empty">
                  <p>No tasks here</p>
                  {col.id === 'todo' && (
                    <button className="kb-add-btn" onClick={onAddTask} type="button">
                      + Add task
                    </button>
                  )}
                </div>
              ) : (
                col.items.map(task => (
                  <KanbanCard
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onStatusChange={onStatusChangeTask}
                  />
                ))
              )}
            </div>

            {/* Footer add */}
            <button className="kb-col-add" onClick={onAddTask} type="button">
              <Plus size={14} /> Add task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
