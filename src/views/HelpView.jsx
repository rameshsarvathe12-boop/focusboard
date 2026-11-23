import React from 'react';
import { HelpCircle, CheckCircle, Smartphone, Layout, Key, BookOpen } from 'lucide-react';

export default function HelpView() {
  const faqs = [
    {
      q: 'How does FocusBoard preserve my task data?',
      a: 'FocusBoard uses browser localStorage under the key "focusboard_tasks". Even when you refresh or close the tab, your tasks, statuses, priorities, and edits remain intact without requiring a remote database or login.'
    },
    {
      q: 'How do I edit or delete an existing task?',
      a: 'Hover over or click on any task card or row to reveal the Edit (pencil) and Delete (trash) icons. Clicking Edit pre-fills the form with existing task data, and Delete prompts a confirmation modal to avoid accidental loss.'
    },
    {
      q: 'How does the Focus Notes carousel work?',
      a: 'The Focus Notes carousel features 3 curated productivity slides. You can browse them with the Previous/Next buttons, or directly click on any of the dot indicators. It is fully accessible via keyboard as well.'
    },
    {
      q: 'How do the Search and Filters operate?',
      a: 'Search is real-time and case-insensitive. Status tabs (All, To Do, In Progress, Completed) and the Priority filter work simultaneously so you can drill down to exact subsets (e.g., In Progress + High Priority).'
    }
  ];

  const shortcuts = [
    { key: 'Escape', desc: 'Closes any open modal (Task Form or Delete Confirmation)' },
    { key: 'Enter / Space', desc: 'Activates selected buttons, tabs, and carousel indicators' },
    { key: 'Tab', desc: 'Navigates focus smoothly through all interactive elements' }
  ];

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Help & User Guide</h2>
          <p>Everything you need to know about using and reviewing FocusBoard</p>
        </div>
      </div>

      <div className="help-grid">
        {/* Core Features Overview */}
        <div className="help-card">
          <div className="help-card-title">
            <Layout size={18} color="var(--primary)" />
            FocusBoard Architecture & Checklist
          </div>
          <ul className="help-feature-list">
            <li><CheckCircle size={15} color="var(--done)" /> <strong>React 18 & Vite:</strong> Fast modular component architecture.</li>
            <li><CheckCircle size={15} color="var(--done)" /> <strong>CRUD Capabilities:</strong> Full Create, Read, Update, and Delete operations.</li>
            <li><CheckCircle size={15} color="var(--done)" /> <strong>Dynamic Statistics:</strong> Computed on the fly (never hardcoded).</li>
            <li><CheckCircle size={15} color="var(--done)" /> <strong>Interactive Views:</strong> Dashboard, Kanban Tasks, Calendar, Analytics, Notes & Settings.</li>
            <li><CheckCircle size={15} color="var(--done)" /> <strong>Responsive Design:</strong> Tested across 390px, 768px, and 1440px viewports.</li>
          </ul>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="help-card">
          <div className="help-card-title">
            <Key size={18} color="var(--primary)" />
            Accessibility & Keyboard Shortcuts
          </div>
          <div className="shortcuts-table">
            {shortcuts.map(s => (
              <div key={s.key} className="shortcut-row">
                <span className="kbd-badge">{s.key}</span>
                <span className="shortcut-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="help-card" style={{ gridColumn: '1 / -1' }}>
          <div className="help-card-title">
            <HelpCircle size={18} color="var(--primary)" />
            Frequently Asked Questions
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <h4 className="faq-question">{faq.q}</h4>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
