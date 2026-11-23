import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, PlusCircle } from 'lucide-react';

export default function TaskList({
  tasks, onEdit, onDelete, onStatusChange,
  searchQuery, hasFilters, onAddTask,
}) {
  if (tasks.length === 0) {
    const isSearch = Boolean(searchQuery?.trim());
    return (
      <div
        id="task-list-panel"
        className="empty-state"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="empty-state-icon" aria-hidden="true">
          <ClipboardList size={28} />
        </div>
        <h3>
          {isSearch
            ? 'No tasks match your search'
            : hasFilters
            ? 'No tasks match the filters'
            : 'No tasks yet'}
        </h3>
        <p>
          {isSearch
            ? `No results for "${searchQuery}". Try a different keyword.`
            : hasFilters
            ? 'Try adjusting your filters or reset them to see all tasks.'
            : 'Create your first task to get started with FocusBoard.'}
        </p>
        {!hasFilters && !isSearch && (
          <button
            className="btn-primary"
            onClick={onAddTask}
            style={{ marginTop: 10 }}
            type="button"
          >
            <PlusCircle size={16} aria-hidden="true" />
            Create First Task
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id="task-list-panel"
      className="task-list"
      role="list"
      aria-label={`${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
    >
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
