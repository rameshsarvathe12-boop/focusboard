# FocusBoard – Task Management Dashboard

A functional, responsive task management dashboard built with **React.js + Vite**, implementing full CRUD operations, real-time filtering, localStorage persistence and a 3-slide Focus Notes carousel.

---

## 🚀 Live Demo

> **Hosted URL:** *(update after Vercel/Netlify deployment)*  
> **GitHub:** *(update after `git push`)*

---

## 📋 Project Overview

FocusBoard lets teams and individuals create, track and manage tasks across three statuses (**To Do**, **In Progress**, **Completed**) with priority levels, due dates and category tagging — all persisted locally in the browser.

---

## 🛠 Technology Stack

| Technology     | Purpose                            |
|----------------|------------------------------------|
| React.js 18    | Component-based UI                 |
| Vite 6         | Build tool & development server    |
| JavaScript ES6+| Application logic                  |
| CSS3           | Styling, layouts, responsiveness   |
| React Hooks    | State & lifecycle management       |
| localStorage   | Browser-side data persistence      |
| Lucide React   | Icon library                       |
| Inter (Google) | Typography                         |

---

## ✨ Features Implemented

| Feature               | Status |
|-----------------------|--------|
| Initial sample data (8 tasks) | ✅ |
| Create task (modal form) | ✅ |
| Edit task (pre-filled form) | ✅ |
| Delete task (confirmation dialog) | ✅ |
| Status management (To Do / In Progress / Completed) | ✅ |
| Inline status change dropdown per row | ✅ |
| Checkbox toggle (complete / incomplete) | ✅ |
| Case-insensitive title search | ✅ |
| Status tabs filter | ✅ |
| Priority dropdown filter | ✅ |
| Combined search + filter logic | ✅ |
| Dynamic statistics (total, in-progress, completed, %) | ✅ |
| Focus Notes carousel (3 slides, prev/next, dot indicators) | ✅ |
| Priority breakdown panel | ✅ |
| Overdue task highlight | ✅ |
| Interactive Sidebar Navigation (7 views) | ✅ |
| Kanban Tasks Board view (move between columns) | ✅ |
| Monthly Calendar view with task dots & day drawer | ✅ |
| Deep Productivity Analytics & category/priority charts | ✅ |
| Focus Notes & custom scratchpad notes | ✅ |
| LocalStorage Reset / Clear settings | ✅ |
| localStorage persistence | ✅ |
| Responsive: 390px / 768px / 1440px | ✅ |
| Semantic HTML & ARIA attributes | ✅ |
| Keyboard navigation & focus indicators | ✅ |
| Escape key closes modals | ✅ |

---

## 📁 Project Structure

```
focusboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           # Fixed navigation sidebar
│   │   ├── Header.jsx            # Top header bar
│   │   ├── StatCard.jsx          # Reusable statistics card
│   │   ├── FocusNotes.jsx        # 3-slide carousel component
│   │   ├── QuickStats.jsx        # Progress bars + priority breakdown
│   │   ├── TaskList.jsx          # Task list container + empty state
│   │   ├── TaskCard.jsx          # Individual task row with actions
│   │   ├── TaskForm.jsx          # Create / Edit modal form
│   │   ├── SearchBar.jsx         # Search input component
│   │   ├── FilterTabs.jsx        # Status tabs + priority select
│   │   └── DeleteConfirmModal.jsx# Confirmation dialog
│   ├── data/
│   │   └── sampleTasks.js        # 8 initial sample task objects
│   ├── hooks/
│   │   └── useLocalStorage.js    # Custom localStorage + React state hook
│   ├── App.jsx                   # Root component — all state lives here
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Global styles & responsive CSS
├── screenshots/                  # (add after deployment)
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
└── AI_USAGE.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/focusboard.git
cd focusboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 🧠 State Management

FocusBoard uses **React Hooks exclusively** — no Redux, MobX or external state library.

### Hook usage

| Hook            | Used for |
|-----------------|----------|
| `useState`      | UI state: search query, active filters, modal open/closed, mobile menu, active nav item |
| `useMemo`       | Derived values recalculated only when dependencies change: `stats`, `breakdown`, `filteredTasks`, `statusCounts` |
| `useCallback`   | Stable handler references for all CRUD operations, preventing unnecessary re-renders |
| `useLocalStorage` | Custom hook — synchronises the task array to localStorage on every change |

### Data flow diagram

```
useLocalStorage('focusboard_tasks', sampleTasks)
        │
        ▼
   tasks[]  ◄─────── CRUD handlers (create / update / delete / statusChange)
        │
        ├── useMemo → stats          → StatCard ×4, QuickStats
        ├── useMemo → breakdown      → QuickStats priority bars
        ├── useMemo → filteredTasks  → TaskList → TaskCard ×n
        └── useMemo → statusCounts   → FilterTabs
```

### Why no Redux?

The assignment specifies a 24-hour completion window. With a single data source (the task array), `useState` + `useMemo` is simpler, easier to debug and entirely sufficient. Redux would add unnecessary boilerplate for this scope.

---

## 💾 localStorage Implementation

- **Storage key:** `focusboard_tasks`
- **On mount:** The custom `useLocalStorage` hook reads from `localStorage` using `JSON.parse`. If the key is absent (first visit), it falls back to the 8 `sampleTasks` — ensuring sample data is never shown again after the user has created real tasks.
- **On update:** Every `setTasks` call serialises the full task array via `JSON.stringify` and writes it synchronously to `localStorage`.
- **Safety:** All reads and writes are wrapped in `try/catch` to handle quota errors or corrupted JSON gracefully.
- **Principle:** Only the **complete** task array is persisted. Search queries, active filters and modal state are session-only — they reset on refresh, which is the expected browser behaviour.

---

## 📱 Responsive Design

| Breakpoint | Behaviour |
|------------|-----------|
| **≤ 480px** (390px target) | 2-column stats grid, stacked carousel + quick panel, compact task rows, bottom-sheet modal |
| **≤ 768px** | Hamburger menu (sidebar slides in), all columns stack, search bar full-width |
| **≤ 1024px** | 2-column stats grid, carousel + quick panel stack vertically |
| **≥ 1440px** | 4-column stats, 260px+ sidebar, wider content area |

---

## 🚢 Deployment (Vercel)

1. Push your code to a public GitHub repository.
2. Log in at [vercel.com](https://vercel.com).
3. Click **Add New → Project** and import the `focusboard` repo.
4. Configure build settings:

| Setting          | Value         |
|------------------|---------------|
| Framework        | Vite          |
| Build command    | `npm run build` |
| Output directory | `dist`        |
| Install command  | `npm install` |

5. Click **Deploy** and copy the generated HTTPS URL.

---

## ⚠️ Known Limitations

- Data is browser-local — not shared across devices or users.
- No authentication or user accounts.
- Task descriptions are truncated in the list view; full text is visible in the edit form.
- No backend API, cloud database or real-time collaboration.

---

## 📄 License

MIT © 2026 FocusBoard
#   f o c u s b o a r d  
 