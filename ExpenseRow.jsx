
import { useState } from 'react'
import CategoryBadge, { getCategoryConfig } from './CategoryBadge.jsx'
import './ExpenseRow.css'

export default function ExpenseRow({ expense, onDelete }) {
  // useState to track if mouse is hovering over this row
  // Used to show the delete button and highlight the row
  const [isHovered, setIsHovered] = useState(false)

  const cat = getCategoryConfig(expense.category)

  // Format the date nicely: "1 May '25"
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  })

  return (
    <div
      className={`expense-row ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Category icon circle ── */}
      <div className="row-icon" style={{ background: cat.bg }}>
        {cat.icon}
      </div>

      {/* ── Name + optional note ── */}
      <div className="row-info">
        <div className="row-name">{expense.name}</div>
        {expense.note && (
          <div className="row-note">{expense.note}</div>
        )}
      </div>

      {/* ── Category badge ── */}
      <div className="row-badge">
        <CategoryBadge name={expense.category} />
      </div>

      {/* ── Date ── */}
      <div className="row-date">{formattedDate}</div>

      {/* ── Amount ── */}
      <div className="row-amount">
        −₹{expense.amount.toLocaleString()}
      </div>

      {/* ── Delete button ──
          Calls onDelete with this expense's id.
          onDelete is the handleDeleteExpense function from App.jsx */}
      <button
        className={`row-delete ${isHovered ? 'visible' : ''}`}
        onClick={() => onDelete(expense.id)}
        title="Delete expense"
      >
        🗑
      </button>
    </div>
  )
}
