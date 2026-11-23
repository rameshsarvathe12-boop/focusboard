import React from 'react';
import { Menu, Bell, Sun, Plus } from 'lucide-react';

export default function Header({ onMenuToggle, onAddTask, isMobileMenuOpen }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <header className="header" role="banner">
      {/* Mobile hamburger – hidden on desktop via CSS */}
      <button
        className="mobile-menu-btn"
        onClick={onMenuToggle}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="sidebar"
        type="button"
      >
        <Menu size={20} />
      </button>

      {/* Title */}
      <div className="header-title">
        <h1>FocusBoard</h1>
        <p>{today}</p>
      </div>

      {/* Actions */}
      <div className="header-actions" role="toolbar" aria-label="Header actions">
        {/* Quick-add button – visible on mobile only */}
        <button
          className="header-add-mobile btn-primary"
          onClick={onAddTask}
          aria-label="Add new task"
          type="button"
        >
          <Plus size={15} aria-hidden="true" />
          <span>Add</span>
        </button>

        <button
          className="header-icon-btn"
          aria-label="Notifications"
          type="button"
        >
          <Bell size={18} />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        <button
          className="header-icon-btn"
          aria-label="Toggle colour theme"
          type="button"
        >
          <Sun size={18} />
        </button>

        <div
          className="header-avatar"
          role="button"
          tabIndex={0}
          aria-label="User profile: Jane Doe"
          onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.click(); }}
        >
          JD
        </div>
      </div>
    </header>
  );
}
