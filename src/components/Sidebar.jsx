import React from 'react';
import {
  LayoutDashboard, CheckSquare, Calendar, BarChart2,
  BookOpen, Settings, HelpCircle, Zap, X,
} from 'lucide-react';

const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { id: 'tasks',     label: 'My Tasks',    icon: CheckSquare, badge: true },
  { id: 'calendar',  label: 'Calendar',    icon: Calendar },
  { id: 'analytics', label: 'Analytics',   icon: BarChart2 },
  { id: 'notes',     label: 'Notes',       icon: BookOpen },
];

const NAV_WORKSPACE = [
  { id: 'settings', label: 'Settings',      icon: Settings },
  { id: 'help',     label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar({
  isOpen, activeNav, onNavChange, onClose, taskCount,
}) {
  const handleNavClick = (id) => {
    onNavChange(id);
    // Only close the drawer when it's actually open (mobile)
    if (isOpen) onClose();
  };

  return (
    <aside
      id="sidebar"
      className={`sidebar${isOpen ? ' mobile-open' : ''}`}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" aria-hidden="true">
          <Zap size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <span className="sidebar-logo-text">
          Focus<span>Board</span>
        </span>
        {/* Close button – only visible on mobile via CSS */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close navigation"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" role="navigation" aria-label="Primary navigation">
        <span className="sidebar-section-label" aria-hidden="true">Main Menu</span>

        {NAV_MAIN.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            className={`sidebar-nav-item${activeNav === id ? ' active' : ''}`}
            onClick={() => handleNavClick(id)}
            aria-current={activeNav === id ? 'page' : undefined}
            type="button"
          >
            <Icon size={17} className="nav-icon" aria-hidden="true" />
            <span>{label}</span>
            {badge && taskCount > 0 && (
              <span className="nav-badge" aria-label={`${taskCount} tasks`}>
                {taskCount}
              </span>
            )}
          </button>
        ))}

        <span className="sidebar-section-label" style={{ marginTop: 8 }} aria-hidden="true">
          Workspace
        </span>

        {NAV_WORKSPACE.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-nav-item${activeNav === id ? ' active' : ''}`}
            onClick={() => handleNavClick(id)}
            type="button"
          >
            <Icon size={17} className="nav-icon" aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* User profile */}
      <div className="sidebar-footer">
        <div
          className="sidebar-user"
          role="button"
          tabIndex={0}
          aria-label="User profile: Jane Doe"
          onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.click(); }}
        >
          <div className="user-avatar" aria-hidden="true">JD</div>
          <div className="user-info">
            <div className="user-name">Jane Doe</div>
            <div className="user-role">Product Designer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
