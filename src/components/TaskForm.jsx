import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, ClipboardEdit, PlusCircle } from 'lucide-react';

const BLANK = {
  title: '',
  description: '',
  category: 'Development',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

/**
 * TaskForm – used for both Create and Edit.
 * When `task` prop is provided → Edit mode; otherwise → Create mode.
 */
export default function TaskForm({ task, onSubmit, onClose }) {
  const isEditing = Boolean(task);

  const [form, setForm] = useState(() =>
    isEditing
      ? {
          title:       task.title       ?? '',
          description: task.description ?? '',
          category:    task.category    ?? 'Development',
          status:      task.status      ?? 'todo',
          priority:    task.priority    ?? 'medium',
          dueDate:     task.dueDate     ?? '',
        }
      : { ...BLANK }
  );

  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  // Auto-focus title on open
  useEffect(() => { titleRef.current?.focus(); }, []);

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const change = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    const trimTitle = form.title.trim();
    if (!trimTitle)         e.title    = 'Task title is required.';
    else if (trimTitle.length < 3) e.title = 'Title must be at least 3 characters.';
    if (!form.status)       e.status   = 'Status is required.';
    if (!form.priority)     e.priority = 'Priority is required.';
    if (!form.dueDate)      e.dueDate  = 'Due date is required.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, title: form.title.trim() });
  };

  const overlayClick = e => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-dialog-title"
      onClick={overlayClick}
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon" aria-hidden="true">
            {isEditing ? <ClipboardEdit size={20} /> : <PlusCircle size={20} />}
          </div>
          <div className="modal-title">
            <h2 id="form-dialog-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p>
              {isEditing
                ? 'Update the details below and save.'
                : 'Fill in the details to add a new task.'}
            </p>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close form"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-title">
                Title <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="task-title"
                ref={titleRef}
                type="text"
                className={`form-input${errors.title ? ' error' : ''}`}
                placeholder="Enter a clear task title…"
                value={form.title}
                onChange={e => change('title', e.target.value)}
                aria-required="true"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-err' : undefined}
                maxLength={120}
              />
              {errors.title && (
                <div className="form-error" id="title-err" role="alert">
                  <AlertCircle size={12} aria-hidden="true" /> {errors.title}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-desc">Description</label>
              <textarea
                id="task-desc"
                className="form-textarea"
                placeholder="Optional — add context or acceptance criteria…"
                value={form.description}
                onChange={e => change('description', e.target.value)}
                maxLength={500}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-cat">Category</label>
              <select
                id="task-cat"
                className="form-select"
                value={form.category}
                onChange={e => change('category', e.target.value)}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
                <option value="Management">Management</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status + Priority */}
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="task-status">
                  Status <span className="req" aria-hidden="true">*</span>
                </label>
                <select
                  id="task-status"
                  className={`form-select${errors.status ? ' error' : ''}`}
                  value={form.status}
                  onChange={e => change('status', e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.status)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <div className="form-error" role="alert">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.status}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="task-priority">
                  Priority <span className="req" aria-hidden="true">*</span>
                </label>
                <select
                  id="task-priority"
                  className={`form-select${errors.priority ? ' error' : ''}`}
                  value={form.priority}
                  onChange={e => change('priority', e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.priority)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <div className="form-error" role="alert">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.priority}
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label" htmlFor="task-due">
                Due Date <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="task-due"
                type="date"
                className={`form-input${errors.dueDate ? ' error' : ''}`}
                value={form.dueDate}
                onChange={e => change('dueDate', e.target.value)}
                aria-required="true"
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'due-err' : undefined}
              />
              {errors.dueDate && (
                <div className="form-error" id="due-err" role="alert">
                  <AlertCircle size={12} aria-hidden="true" /> {errors.dueDate}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
