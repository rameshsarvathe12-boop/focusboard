import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_COLOR = {
  'todo':        'var(--todo)',
  'in-progress': 'var(--progress)',
  'completed':   'var(--done)',
};

export default function CalendarView({ tasks, onEditTask, onDeleteTask, onStatusChangeTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday   = () => { setCurrentDate(new Date()); setSelectedDate(new Date().toISOString().split('T')[0]); };

  const monthLabel = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Group tasks by dueDate string
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        if (!map[task.dueDate]) map[task.dueDate] = [];
        map[task.dueDate].push(task);
      }
    });
    return map;
  }, [tasks]);

  // Build grid cells
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const firstWeekDay  = new Date(year, month, 1).getDay();
  const todayStr      = new Date().toISOString().split('T')[0];

  const cells = [];
  for (let i = 0; i < firstWeekDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, dateStr, tasks: tasksByDate[dateStr] || [] });
  }

  const selectedTasks = selectedDate ? (tasksByDate[selectedDate] || []) : [];

  return (
    <div className="view-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Calendar</h2>
          <p>View your tasks by due date — click any day to see its tasks</p>
        </div>
        <button className="btn-secondary" onClick={goToday} type="button">Today</button>
      </div>

      <div className="cal-layout">
        {/* Calendar grid */}
        <div className="cal-card">
          {/* Nav header */}
          <div className="cal-nav">
            <button className="focus-nav-btn" onClick={prevMonth} aria-label="Previous month" type="button">
              <ChevronLeft size={16} />
            </button>
            <h3 className="cal-month-label">{monthLabel}</h3>
            <button className="focus-nav-btn" onClick={nextMonth} aria-label="Next month" type="button">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day-name headers */}
          <div className="cal-grid">
            {DAY_NAMES.map(d => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}

            {/* Cells */}
            {cells.map((cell, i) => (
              <div
                key={i}
                className={[
                  'cal-cell',
                  !cell          ? 'cal-cell--empty' : '',
                  cell?.dateStr === todayStr      ? 'cal-cell--today'    : '',
                  cell?.dateStr === selectedDate  ? 'cal-cell--selected' : '',
                  cell?.tasks.length > 0          ? 'cal-cell--has-tasks': '',
                ].join(' ')}
                onClick={() => cell && setSelectedDate(cell.dateStr)}
                role={cell ? 'button' : undefined}
                tabIndex={cell ? 0 : undefined}
                aria-label={cell ? `${monthLabel} ${cell.day}, ${cell.tasks.length} tasks` : undefined}
                onKeyDown={e => { if (cell && (e.key === 'Enter' || e.key === ' ')) setSelectedDate(cell.dateStr); }}
              >
                {cell && (
                  <>
                    <span className="cal-day-num">{cell.day}</span>
                    <div className="cal-dots">
                      {cell.tasks.slice(0, 4).map(t => (
                        <span
                          key={t.id}
                          className="cal-dot"
                          style={{ background: STATUS_COLOR[t.status] }}
                          title={t.title}
                        />
                      ))}
                      {cell.tasks.length > 4 && (
                        <span className="cal-dot-more">+{cell.tasks.length - 4}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="cal-legend">
            {[
              { label: 'To Do',       color: 'var(--todo)' },
              { label: 'In Progress', color: 'var(--progress)' },
              { label: 'Completed',   color: 'var(--done)' },
            ].map(l => (
              <span key={l.label} className="cal-legend-item">
                <span className="cal-dot" style={{ background: l.color, flexShrink: 0 }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Side panel: tasks for selected day */}
        <div className="cal-side-panel">
          <div className="cal-panel-header">
            <Calendar size={16} color="var(--primary)" aria-hidden="true" />
            <span>
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : 'Select a day'}
            </span>
          </div>

          {!selectedDate ? (
            <p className="cal-panel-hint">Click any date on the calendar to view its tasks.</p>
          ) : selectedTasks.length === 0 ? (
            <p className="cal-panel-hint">No tasks due on this date.</p>
          ) : (
            <div className="cal-panel-tasks">
              {selectedTasks.map(task => (
                <div key={task.id} className="cal-task-card">
                  <div className="cal-task-top">
                    <span
                      className="cal-task-status-dot"
                      style={{ background: STATUS_COLOR[task.status] }}
                    />
                    <span className="cal-task-title">{task.title}</span>
                  </div>
                  <div className="cal-task-badges">
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className={`status-badge ${task.status}`}>
                      {{ 'todo': 'To Do', 'in-progress': 'In Progress', 'completed': 'Completed' }[task.status]}
                    </span>
                  </div>
                  {task.description && (
                    <p className="cal-task-desc">{task.description}</p>
                  )}
                  <div className="cal-task-actions">
                    <select
                      className={`task-status-select ${task.status}`}
                      value={task.status}
                      onChange={e => onStatusChangeTask(task.id, e.target.value)}
                      aria-label={`Change status for ${task.title}`}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button className="task-action-btn" onClick={() => onEditTask(task)} type="button" aria-label="Edit task">
                      ✏️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
