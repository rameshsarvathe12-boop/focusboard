import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Pin, Lightbulb } from 'lucide-react';
import FocusNotes from '../components/FocusNotes';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_NOTES = [
  {
    id: 1,
    title: 'Sprint Planning Notes',
    content: 'Prioritize mobile touch navigation targets and ensure full accessibility on WCAG AA level.',
    date: '2026-11-20',
    color: '#fef3c7'
  },
  {
    id: 2,
    title: 'Design Review Action Items',
    content: 'Review status pills contrast and ensure 390px viewport does not cause horizontal scroll.',
    date: '2026-11-22',
    color: '#dbeafe'
  },
  {
    id: 3,
    title: 'Release Checklist',
    content: '1. Verify localStorage persistence\n2. Verify 3-slide carousel\n3. Verify create/edit/delete tasks\n4. Deploy to Vercel/Netlify',
    date: '2026-11-23',
    color: '#d1fae5'
  }
];

export default function NotesView() {
  const [notes, setNotes] = useLocalStorage('focusboard_custom_notes', DEFAULT_NOTES);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#fef3c7');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const note = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      date: new Date().toISOString().split('T')[0],
      color: selectedColor
    };
    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Focus & Quick Notes</h2>
          <p>Capture thoughts, reminders, and daily productivity reflections</p>
        </div>
      </div>

      {/* Featured Focus Carousel */}
      <div style={{ marginBottom: '28px' }}>
        <FocusNotes />
      </div>

      {/* Quick note creator */}
      <div className="notes-editor-card">
        <h3 className="notes-section-title">
          <Pin size={16} color="var(--primary)" />
          Quick Scratchpad Note
        </h3>
        <form onSubmit={handleAddNote} className="notes-form">
          <input
            type="text"
            className="form-input"
            placeholder="Note title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <textarea
            className="form-textarea"
            placeholder="Write your note, idea or checklist..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ minHeight: '80px', marginBottom: '12px' }}
          />
          <div className="notes-form-footer">
            <div className="color-picker-row">
              {['#fef3c7', '#dbeafe', '#d1fae5', '#fee2e2', '#f3e8ff'].map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-dot-btn ${selectedColor === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setSelectedColor(c)}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
            <button type="submit" className="btn-primary" disabled={!newTitle.trim()}>
              <Plus size={15} /> Add Note
            </button>
          </div>
        </form>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card" style={{ backgroundColor: note.color }}>
            <div className="note-card-header">
              <h4>{note.title}</h4>
              <button
                type="button"
                className="task-action-btn delete"
                onClick={() => handleDeleteNote(note.id)}
                aria-label={`Delete note: ${note.title}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="note-card-body">{note.content}</p>
            <span className="note-card-date">{note.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
