// ============================================
// components/CategoryBadge.jsx
//
// A small coloured pill that shows the category
// of an expense (e.g. "💻 Software").
//
// REACT CONCEPT: Props
//   Receives one prop: name (the category string)
//   Looks up the matching color from CATEGORIES config.
//
// Used inside: ExpenseRow, ExpenseList filter buttons
// ============================================

import './CategoryBadge.css'

// ── Category config — color + icon for each category ──
// We export this so other files can import it too
export const CATEGORIES = [
  { name: 'All',          color: '#6c63ff', bg: 'rgba(108,99,255,0.15)',   icon: '🗂️' },
  { name: 'Software',     color: '#6c63ff', bg: 'rgba(108,99,255,0.15)',   icon: '💻' },
  { name: 'Marketing',    color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)',   icon: '📢' },
  { name: 'Travel',       color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',   icon: '✈️' },
  { name: 'Office',       color: '#4ade80', bg: 'rgba(74,222,128,0.12)',   icon: '🏢' },
  { name: 'Salaries',     color: '#a78bfa', bg: 'rgba(167,139,250,0.12)',  icon: '👥' },
  { name: 'Food & Drink', color: '#fb923c', bg: 'rgba(251,146,60,0.12)',   icon: '🍔' },
  { name: 'Utilities',    color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',   icon: '⚡' },
  { name: 'Other',        color: '#64748b', bg: 'rgba(100,116,139,0.15)',  icon: '📦' },
]

// Helper function: finds the config for a given category name
export function getCategoryConfig(name) {
  return CATEGORIES.find((c) => c.name === name) || CATEGORIES[CATEGORIES.length - 1]
}

export default function CategoryBadge({ name }) {
  const cat = getCategoryConfig(name)

  return (
    <span
      className="category-badge"
      style={{
        background: cat.bg,
        color: cat.color,
      }}
    >
      {cat.icon} {name}
    </span>
  )
}
