import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * DeleteConfirmModal – shown before permanently removing a task.
 * Requires explicit confirmation; closeable via Escape or Cancel.
 */
export default function DeleteConfirmModal({ taskTitle, onConfirm, onCancel }) {
  // Keyboard: Escape → cancel, Enter → confirm
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  const overlayClick = e => { if (e.target === e.currentTarget) onCancel(); };

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onClick={overlayClick}
    >
      <div className="modal confirm-modal">
        {/* Close X */}
        <div
          className="modal-header"
          style={{ justifyContent: 'flex-end', borderBottom: 'none', paddingBottom: 0 }}
        >
          <button
            className="modal-close"
            onClick={onCancel}
            aria-label="Cancel and close"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="confirm-icon-wrap" aria-hidden="true">
            <AlertTriangle size={28} />
          </div>
          <h2 className="confirm-title" id="confirm-title">Delete Task?</h2>
          <p className="confirm-desc" id="confirm-desc">
            This action cannot be undone. The task will be permanently removed:
          </p>
          <span className="confirm-task-name">"{taskTitle}"</span>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            aria-label={`Confirm deletion of task: ${taskTitle}`}
            autoFocus
          >
            <AlertTriangle size={14} aria-hidden="true" />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
