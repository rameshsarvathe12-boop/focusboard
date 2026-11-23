import React, { useState, useMemo, useCallback } from 'react';

import Sidebar            from './components/Sidebar';
import Header             from './components/Header';
import TaskForm           from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import useLocalStorage    from './hooks/useLocalStorage';
import { sampleTasks }   from './data/sampleTasks';

// Views
import DashboardView from './views/DashboardView';
import TasksView     from './views/TasksView';
import CalendarView  from './views/CalendarView';
import AnalyticsView from './views/AnalyticsView';
import NotesView     from './views/NotesView';
import SettingsView  from './views/SettingsView';
import HelpView      from './views/HelpView';

/** localStorage key – change only if you want to clear saved data */
const STORAGE_KEY = 'focusboard_tasks';

export default function App() {
  /* ── Persistent state ──────────────────────────────────── */
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks);

  /* ── UI / filter state ─────────────────────────────────── */
  const [searchQuery,    setSearchQuery]    = useState('');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isFormOpen,     setIsFormOpen]     = useState(false);
  const [editingTask,    setEditingTask]    = useState(null);   // null = create mode
  const [deleteConfirm,  setDeleteConfirm]  = useState({
    isOpen: false, taskId: null, taskTitle: '',
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav,        setActiveNav]        = useState('dashboard');

  /* ── Derived: statistics ──────────────────────────────── */
  const stats = useMemo(() => {
    const total      = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed  = tasks.filter(t => t.status === 'completed').length;
    const todo       = tasks.filter(t => t.status === 'todo').length;
    const percent    = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, inProgress, completed, todo, percent };
  }, [tasks]);

  /* ── Derived: priority breakdown ───────────────────────── */
  const breakdown = useMemo(() => ({
    high:   tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low:    tasks.filter(t => t.priority === 'low').length,
  }), [tasks]);

  /* ── Derived: filtered task list ───────────────────────── */
  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchSearch   = !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus   = statusFilter   === 'all' || task.status   === statusFilter;
    const matchPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  }), [tasks, searchQuery, statusFilter, priorityFilter]);

  /* ── Derived: tab counts ───────────────────────────────── */
  const statusCounts = useMemo(() => ({
    all:          tasks.length,
    todo:         tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed:    tasks.filter(t => t.status === 'completed').length,
  }), [tasks]);

  /* ── CRUD handlers ─────────────────────────────────────── */

  /** Create a new task and prepend it */
  const handleCreate = useCallback(data => {
    setTasks(prev => [{ ...data, id: Date.now() }, ...prev]);
    setIsFormOpen(false);
  }, [setTasks]);

  /** Update an existing task (keep original id) */
  const handleUpdate = useCallback(data => {
    setTasks(prev =>
      prev.map(t => t.id === editingTask.id ? { ...data, id: editingTask.id } : t)
    );
    setEditingTask(null);
    setIsFormOpen(false);
  }, [setTasks, editingTask]);

  /** Open delete confirmation dialog */
  const handleDeleteRequest = useCallback((taskId, taskTitle) => {
    setDeleteConfirm({ isOpen: true, taskId, taskTitle });
  }, []);

  /** Confirmed delete */
  const handleConfirmDelete = useCallback(() => {
    setTasks(prev => prev.filter(t => t.id !== deleteConfirm.taskId));
    setDeleteConfirm({ isOpen: false, taskId: null, taskTitle: '' });
  }, [setTasks, deleteConfirm.taskId]);

  /** Open form in edit mode */
  const handleEditTask = useCallback(task => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  /** Update a single task's status */
  const handleStatusChange = useCallback((taskId, newStatus) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
    );
  }, [setTasks]);

  /** Open form in create mode */
  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  /** Close any open form */
  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  /** Reset all filters and search */
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  }, []);

  const hasActiveFilters = Boolean(
    searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
  );

  /* ── Render View based on activeNav ─────────────────────── */
  const renderCurrentView = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <DashboardView
            filteredTasks={filteredTasks}
            stats={stats}
            breakdown={breakdown}
            statusCounts={statusCounts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            onAddTask={openCreateForm}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteRequest}
            onStatusChangeTask={handleStatusChange}
          />
        );
      case 'tasks':
        return (
          <TasksView
            tasks={tasks}
            onAddTask={openCreateForm}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteRequest}
            onStatusChangeTask={handleStatusChange}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteRequest}
            onStatusChangeTask={handleStatusChange}
          />
        );
      case 'analytics':
        return <AnalyticsView tasks={tasks} />;
      case 'notes':
        return <NotesView />;
      case 'settings':
        return <SettingsView tasks={tasks} setTasks={setTasks} />;
      case 'help':
        return <HelpView />;
      default:
        return (
          <DashboardView
            filteredTasks={filteredTasks}
            stats={stats}
            breakdown={breakdown}
            statusCounts={statusCounts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            onAddTask={openCreateForm}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteRequest}
            onStatusChangeTask={handleStatusChange}
          />
        );
    }
  };

  /* ── Render ────────────────────────────────────────────── */
  return (
    <div className="app-layout">
      {/* Sidebar overlay – always in DOM; shown via .show class */}
      <div
        className={`sidebar-overlay${isMobileMenuOpen ? ' show' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onClose={() => setIsMobileMenuOpen(false)}
        taskCount={stats.total}
      />

      {/* Main content */}
      <main className="main-content">
        <Header
          onMenuToggle={() => setIsMobileMenuOpen(prev => !prev)}
          onAddTask={openCreateForm}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <div className="page-content">
          {renderCurrentView()}
        </div>
      </main>

      {/* ── Modals ─────────────────────────────────────── */}

      {/* Create / Edit form */}
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onClose={closeForm}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm.isOpen && (
        <DeleteConfirmModal
          taskTitle={deleteConfirm.taskTitle}
          onConfirm={handleConfirmDelete}
          onCancel={() =>
            setDeleteConfirm({ isOpen: false, taskId: null, taskTitle: '' })
          }
        />
      )}
    </div>
  );
}
