// ============================================
// App.jsx
// The ROOT component of the entire app.
//
// WHAT IT DOES:
//   - Holds the expenses array in useState
//   - Passes data DOWN to child components via props
//   - Decides which tab (Dashboard / Expenses) to show
//
// REACT CONCEPTS USED HERE:
//   - useState         → remembers our data
//   - props            → shares data with child components
//   - conditional rendering → shows one tab or another
//   - event handling   → add / delete / switch tabs
// ============================================

import { useState } from 'react'
import './App.css'

// Import all our child components
import Dashboard       from './components/Dashboard.jsx'
import AddExpenseForm  from './components/AddExpenseForm.jsx'
import ExpenseList     from './components/ExpenseList.jsx'

// ── Sample data so the app is not empty on first load ──
const INITIAL_EXPENSES = [
  { id: 1, name: 'AWS Hosting',        amount: 120,  category: 'Software',     date: '2025-05-01', note: 'Monthly cloud bill' },
  { id: 2, name: 'Google Ads',         amount: 350,  category: 'Marketing',    date: '2025-05-03', note: '' },
  { id: 3, name: 'Office Snacks',      amount: 45,   category: 'Food & Drink', date: '2025-05-05', note: 'Team snacks' },
  { id: 4, name: 'Figma Pro',          amount: 15,   category: 'Software',     date: '2025-05-08', note: '' },
  { id: 5, name: 'Team Lunch',         amount: 180,  category: 'Food & Drink', date: '2025-05-10', note: 'Sprint celebration' },
  { id: 6, name: 'Conference Flight',  amount: 420,  category: 'Travel',       date: '2025-05-12', note: 'TechConf 2025' },
  { id: 7, name: 'Slack Subscription', amount: 60,   category: 'Software',     date: '2025-05-14', note: '' },
  { id: 8, name: 'Stationery',         amount: 30,   category: 'Office',       date: '2025-05-16', note: '' },
]

// ── Tab config ──
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'expenses',  label: 'Expenses',  icon: '🧾' },
]

export default function App() {
  // useState — stores the array of all expenses
  // setExpenses() is how we update the array
  const [expenses,  setExpenses]  = useState(INITIAL_EXPENSES)
  const [activeTab, setActiveTab] = useState('dashboard') // which tab is open
  const [showForm,  setShowForm]  = useState(false)       // is the add form visible?

  // ── Calculate total for the header chip ──
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  // ── Add a new expense ──
  // This function is passed as a PROP to <AddExpenseForm />
  // When the form is submitted, it calls this function with the new expense object
  function handleAddExpense(newExpense) {
    setExpenses([newExpense, ...expenses]) // add to front of array
    setShowForm(false)
    setActiveTab('expenses')              // go to list to see it
  }

  // ── Delete an expense by its id ──
  // This is passed as a PROP to <ExpenseList /> → <ExpenseRow />
  function handleDeleteExpense(id) {
    // .filter() keeps every expense that does NOT match the deleted id
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  return (
    <div className="app-wrapper">

      {/* ── TOP HEADER BAR ── */}
      <header className="topbar">
        {/* Logo */}
        <div className="topbar-logo">
          <div className="logo-icon">💼</div>
          <div>
            <div className="logo-title">SpendWise</div>
            <div className="logo-sub">Startup Expense Tracker</div>
          </div>
        </div>

        {/* Running total */}
        <div className="total-chip">
          ₹{total.toLocaleString()} total
        </div>

        {/* Add / Cancel button */}
        <button
          className={`add-btn ${showForm ? 'cancel' : ''}`}
          onClick={() => {
            setShowForm(!showForm)
            setActiveTab('expenses')
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Expense'}
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="main-content">

        {/* CONDITIONAL RENDERING:
            Only show the form when showForm === true */}
        {showForm && (
          <div className="form-wrapper">
            <AddExpenseForm
              onAdd={handleAddExpense}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* ── TAB NAVIGATION ── */}
        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                setShowForm(false)
              }}
            >
              {tab.icon} {tab.label}
              {/* Show expense count badge on the Expenses tab */}
              {tab.id === 'expenses' && (
                <span className="tab-count">{expenses.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ──
            Show Dashboard OR ExpenseList depending on activeTab */}
        {activeTab === 'dashboard' && (
          <Dashboard expenses={expenses} />
        )}

        {activeTab === 'expenses' && (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
          />
        )}

      </main>
    </div>
  )
}
