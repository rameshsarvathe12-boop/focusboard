import React, { useState } from 'react';
import { Settings, Trash2, RotateCcw, User, Bell, Palette, ShieldCheck, Check } from 'lucide-react';
import { sampleTasks } from '../data/sampleTasks';

export default function SettingsView({ tasks, setTasks }) {
  const [profileName, setProfileName] = useState('Jane Doe');
  const [profileRole, setProfileRole] = useState('Product Designer');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all tasks to original sample data? This will clear custom changes.')) {
      setTasks(sampleTasks);
      alert('Sample tasks restored successfully!');
    }
  };

  const handleClearAllTasks = () => {
    if (window.confirm('Delete ALL tasks? This action cannot be undone.')) {
      setTasks([]);
    }
  };

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Application Settings</h2>
          <p>Customize your profile, preferences, and manage local task storage</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* User Profile Card */}
        <div className="settings-card">
          <div className="settings-card-title">
            <User size={18} color="var(--primary)" />
            Profile Information
          </div>
          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role / Title</label>
              <input
                type="text"
                className="form-input"
                value={profileRole}
                onChange={(e) => setProfileRole(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              {savedSuccess ? (
                <>
                  <Check size={14} /> Saved!
                </>
              ) : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Notifications & Preferences */}
        <div className="settings-card">
          <div className="settings-card-title">
            <Bell size={18} color="var(--primary)" />
            Preferences
          </div>
          <div className="settings-toggle-list">
            <label className="settings-toggle-item">
              <div>
                <div className="toggle-label">Daily Reminder Notifications</div>
                <div className="toggle-sub">Receive morning agenda alerts</div>
              </div>
              <input
                type="checkbox"
                className="settings-checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
            </label>

            <label className="settings-toggle-item">
              <div>
                <div className="toggle-label">Completion Sounds</div>
                <div className="toggle-sub">Play chimes when completing a task</div>
              </div>
              <input
                type="checkbox"
                className="settings-checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
              />
            </label>
          </div>
        </div>

        {/* Data & Storage Management */}
        <div className="settings-card danger-zone">
          <div className="settings-card-title" style={{ color: 'var(--high)' }}>
            <ShieldCheck size={18} color="var(--high)" />
            Data Management (localStorage)
          </div>
          <p className="settings-subtext">
            All FocusBoard data is stored locally in your browser (key: <code>focusboard_tasks</code>).
          </p>

          <div className="settings-data-actions">
            <div className="data-action-row">
              <div>
                <strong>Reset to Sample Tasks</strong>
                <p>Restore the initial 8 sample tasks required by the assignment.</p>
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetData}
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            <div className="data-action-row" style={{ marginTop: '16px' }}>
              <div>
                <strong>Clear All Data</strong>
                <p>Wipe all tasks from browser localStorage.</p>
              </div>
              <button
                type="button"
                className="btn-danger"
                onClick={handleClearAllTasks}
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
