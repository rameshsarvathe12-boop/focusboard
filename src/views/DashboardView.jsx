import React from 'react';
import { Plus } from 'lucide-react';
import StatCard   from '../components/StatCard';
import FocusNotes from '../components/FocusNotes';
import QuickStats from '../components/QuickStats';
import TaskList   from '../components/TaskList';
import SearchBar  from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';

export default function DashboardView({
  filteredTasks, stats, breakdown, statusCounts,
  searchQuery, onSearchChange,
  statusFilter, onStatusChange,
  priorityFilter, onPriorityChange,
  hasActiveFilters, onResetFilters,
  onAddTask, onEditTask, onDeleteTask, onStatusChangeTask,
}) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-text">
          <h2>My Dashboard</h2>
          <p>Track and manage all your tasks in one place</p>
        </div>
        <button className="btn-primary" onClick={onAddTask} type="button">
          <Plus size={16} aria-hidden="true" /> Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" role="region" aria-label="Dashboard statistics">
        <StatCard label="Total Tasks" value={stats.total} icon="hash"
          accentColor="var(--stat-total)" bgColor="var(--stat-total-bg)" trend={`${stats.todo} remaining`} />
        <StatCard label="In Progress" value={stats.inProgress} icon="clock"
          accentColor="var(--stat-prog)" bgColor="var(--stat-prog-bg)" trend="Active tasks" />
        <StatCard label="Completed" value={stats.completed} icon="check-circle"
          accentColor="var(--stat-done)" bgColor="var(--stat-done-bg)" trend="Tasks done" />
        <StatCard label="Completion" value={`${stats.percent}%`} icon="trending-up"
          accentColor="var(--stat-pct)" bgColor="var(--stat-pct-bg)" trend="Overall rate"
          isPercentage percent={stats.percent} />
      </div>

      {/* Middle Row */}
      <div className="dashboard-middle">
        <FocusNotes />
        <QuickStats stats={stats} breakdown={breakdown} />
      </div>

      {/* Task Section */}
      <section className="task-section" aria-label="Task management">
        <div className="task-section-header">
          <h3 className="task-section-title">
            Tasks <span className="task-count-badge">{filteredTasks.length}</span>
          </h3>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
          {hasActiveFilters && (
            <button className="reset-filter-btn" onClick={onResetFilters} type="button">
              Reset filters
            </button>
          )}
          <button className="btn-primary" onClick={onAddTask} type="button">
            <Plus size={15} aria-hidden="true" /> Add Task
          </button>
        </div>
        <FilterTabs
          statusFilter={statusFilter} onStatusChange={onStatusChange}
          priorityFilter={priorityFilter} onPriorityChange={onPriorityChange}
          statusCounts={statusCounts}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={onEditTask} onDelete={onDeleteTask}
          onStatusChange={onStatusChangeTask}
          searchQuery={searchQuery} hasFilters={hasActiveFilters}
          onAddTask={onAddTask}
        />
      </section>
    </>
  );
}
