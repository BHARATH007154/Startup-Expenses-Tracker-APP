

import { useState } from 'react'
import { CATEGORIES } from './CategoryBadge.jsx';
import ExpenseRow from './ExpenseRow.jsx'
import './ExpenseList.css'

export default function ExpenseList({ expenses, onDelete }) {
  // ── Local state for search, filter, and sort ──
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy,         setSortBy]         = useState('date-desc')

  // ── Step 1: FILTER the expenses array ──
  // .filter() keeps only items where the test returns true
  const filtered = expenses.filter((expense) => {
    // Does the name or note contain the search text?
    const matchesSearch =
      expense.name.toLowerCase().includes(search.toLowerCase()) ||
      expense.note.toLowerCase().includes(search.toLowerCase())

    // Does the category match the selected filter?
    const matchesCategory =
      activeCategory === 'All' || expense.category === activeCategory

    // Keep this expense only if BOTH conditions are true
    return matchesSearch && matchesCategory
  })

  // ── Step 2: SORT the filtered array ──
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc')   return new Date(b.date)   - new Date(a.date)
    if (sortBy === 'date-asc')    return new Date(a.date)   - new Date(b.date)
    if (sortBy === 'amount-desc') return b.amount - a.amount
    if (sortBy === 'amount-asc')  return a.amount - b.amount
    return 0
  })

  // ── Total of the filtered expenses ──
  const filteredTotal = filtered.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div>

      {/* ── Search bar + Sort dropdown ── */}
      <div className="list-controls">
        <input
          className="search-input"
          type="text"
          placeholder="🔍  Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* ── Category filter buttons ──
          .map() renders one button for each category */}
      <div className="category-filters">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name
          return (
            <button
              key={cat.name}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              style={isActive
                ? { borderColor: cat.color, background: cat.bg, color: cat.color }
                : {}
              }
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.icon} {cat.name}
            </button>
          )
        })}
      </div>

      {/* ── Results summary line ── */}
      <div className="results-summary">
        <span>{sorted.length} expense{sorted.length !== 1 ? 's' : ''} found</span>
        <span className="results-total">
          Total: ₹{filteredTotal.toLocaleString()}
        </span>
      </div>

      {/* ── CONDITIONAL RENDERING ──
          If no results: show empty state message
          If results exist: show the list */}
      {sorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No expenses found</div>
          <div className="empty-sub">Try a different search or category filter</div>
        </div>
      ) : (
        // .map() loops through sorted array and renders one ExpenseRow per item
        <div className="expense-rows">
          {sorted.map((expense) => (
            <ExpenseRow
              key={expense.id}        // React needs a unique key for each list item
              expense={expense}       // pass the full expense object as a prop
              onDelete={onDelete}     // pass the delete function as a prop
            />
          ))}
        </div>
      )}

    </div>
  )
}
