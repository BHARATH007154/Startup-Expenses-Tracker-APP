// ============================================
// components/AddExpenseForm.jsx
//
// The form used to add a new expense.
//
// REACT CONCEPTS USED HERE:
//   - useState    → tracks what the user types
//   - onChange    → updates state on every keystroke
//   - onSubmit    → handles form submission
//   - props       → onAdd + onCancel come from App.jsx
//
// HOW DATA FLOWS:
//   User types → onChange fires → setForm() updates state
//   User clicks "Add" → handleSubmit runs → calls onAdd(newExpense)
//   onAdd is a function passed from App.jsx via props
//   App.jsx then adds the expense to its own state
// ============================================

import { useState } from 'react'
import { CATEGORIES } from './CategoryBadge.jsx'
import './AddExpenseForm.css'

export default function AddExpenseForm({ onAdd, onCancel }) {
  // ── Form state — one object holds all field values ──
  const [form, setForm] = useState({
    name:     '',
    amount:   '',
    category: 'Software',
    date:     new Date().toISOString().slice(0, 10), // today's date
    note:     '',
  })

  // ── Error message state ──
  const [error, setError] = useState('')

  // ── Called every time user types in ANY field ──
  // e.target.name  = the name="" attribute of the input
  // e.target.value = the new value the user typed
  function handleChange(e) {
    setForm({
      ...form,                     // keep all existing field values
      [e.target.name]: e.target.value  // update only the field that changed
    })
    setError('') // clear error when user starts typing
  }

  // ── Called when the form is submitted ──
  function handleSubmit(e) {
    e.preventDefault() // stop the browser from refreshing the page

    // Validate — make sure required fields are filled
    if (!form.name.trim()) {
      setError('Please enter an expense name.')
      return
    }
    if (!form.amount || Number(form.amount) <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    // Build the new expense object
    const newExpense = {
      id:       Date.now(),              // unique id using timestamp
      name:     form.name.trim(),
      amount:   parseFloat(form.amount),
      category: form.category,
      date:     form.date,
      note:     form.note.trim(),
    }

    // Send it up to App.jsx via the onAdd prop
    onAdd(newExpense)

    // Reset the form back to empty
    setForm({
      name: '', amount: '', category: 'Software',
      date: new Date().toISOString().slice(0, 10), note: '',
    })
  }

  return (
    <div className="form-card">
      <h2 className="form-title">➕ Add New Expense</h2>

      <form onSubmit={handleSubmit}>

        {/* ── Row 1: Name + Amount ── */}
        <div className="form-row">
          <div className="form-group grow-2">
            <label className="form-label">Expense Name *</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. AWS Hosting"
            />
          </div>

          <div className="form-group grow-1">
            <label className="form-label">Amount (₹) *</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* ── Row 2: Category + Date ── */}
        <div className="form-row">
          <div className="form-group grow-1">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {/* .map() renders one <option> for each category */}
              {CATEGORIES
                .filter((c) => c.name !== 'All') // skip the "All" option
                .map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="form-group grow-1">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Note field ── */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label">Note (optional)</label>
          <input
            className="form-input"
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Any extra details..."
          />
        </div>

        {/* ── Error message — only shows if error is not empty ── */}
        {error && (
          <div className="form-error">
            ⚠️ {error}
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            ✅ Add Expense
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}
