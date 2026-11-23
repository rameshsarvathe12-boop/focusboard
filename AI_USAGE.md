# AI Usage Disclosure

## Tools Used

- **Antigravity (Google DeepMind)** – used for code generation guidance and debugging assistance

---

## Representative Prompts

1. "Explain how `useMemo` differs from `useEffect` for derived state in React."
2. "How do I implement a custom `useLocalStorage` hook that falls back to an initial value safely?"
3. "What ARIA attributes should I add to a custom carousel for keyboard accessibility?"
4. "How do I keep the same form component working for both Create and Edit operations in React?"
5. "Help me structure CSS custom properties for a design-token-based colour system."

---

## AI-Assisted Areas

| Area | Detail |
|------|--------|
| CSS architecture | AI suggested using CSS custom properties (design tokens) for the colour system |
| Component structure | AI helped plan the separation of `TaskCard` vs `TaskList` responsibilities |
| Accessibility | AI recommended ARIA roles (`alertdialog`, `tablist`, `progressbar`) and `aria-live` regions |
| useLocalStorage hook | AI explained the lazy initialiser pattern for the `useState` callback |

---

## Verified or Corrected AI Suggestion

**Suggestion:** AI initially recommended using `useEffect` to sync state to `localStorage` after every render.

**Correction:** This was replaced with direct synchronisation inside the `setValue` function of the `useLocalStorage` hook. Using `useEffect` introduced a one-render delay where the old value could be briefly stored. Writing synchronously inside the setter eliminates this race condition and keeps the hook self-contained.

---

> All submitted code has been reviewed, understood and tested by the candidate.
