
import StatCard from './StatCard.jsx'
import { getCategoryConfig } from './CategoryBadge.jsx'
import './Dashboard.css'

export default function Dashboard({ expenses }) {
  // ── Total amount of all expenses ──
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  // ── Count how much was spent in each category ──
  // We build an object like: { Software: 195, Marketing: 350, ... }
  const byCategory = {}
  expenses.forEach((expense) => {
    if (byCategory[expense.category]) {
      byCategory[expense.category] += expense.amount
    } else {
      byCategory[expense.category] = expense.amount
    }
  })

  // ── Find the top (most expensive) category ──
  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1])
  const topCategory = sortedCategories[0]

  // ── Count expenses added this calendar month ──
  const currentMonth = new Date().toISOString().slice(0, 7) // e.g. "2025-05"
  const thisMonthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth))

  // ── Average expense amount ──
  const average = expenses.length > 0
    ? (total / expenses.length).toFixed(0)
    : 0

  return (
    <div>

      {/* ── Stat cards row ── */}
      <div className="stats-row">
        <StatCard
          icon="💰"
          label="Total Spent"
          value={`₹${total.toLocaleString()}`}
          color="var(--accent)"
          bgColor="var(--accent-soft)"
        />
        <StatCard
          icon="🧾"
          label="Total Expenses"
          value={expenses.length}
          color="var(--teal)"
          bgColor="var(--teal-soft)"
        />
        <StatCard
          icon="📅"
          label="This Month"
          value={`${thisMonthExpenses.length} items`}
          color="var(--amber)"
          bgColor="var(--amber-soft)"
        />
        <StatCard
          icon="📊"
          label="Avg per Expense"
          value={`₹${Number(average).toLocaleString()}`}
          color="var(--green)"
          bgColor="var(--green-soft)"
        />
      </div>

      {/* ── Category breakdown card ── */}
      <div className="breakdown-card">
        <h3 className="breakdown-title">📈 Spending by Category</h3>

        {/* CONDITIONAL RENDERING:
            Show "no data" message if expenses array is empty */}
        {sortedCategories.length === 0 ? (
          <p className="breakdown-empty">
            No expenses yet — add some to see your breakdown!
          </p>
        ) : (
          // .map() renders one progress bar row per category
          sortedCategories.map(([categoryName, amount]) => {
            const cat = getCategoryConfig(categoryName)
            const percent = total > 0 ? Math.round((amount / total) * 100) : 0

            return (
              <div key={categoryName} className="breakdown-row">
                {/* Category name + amount */}
                <div className="breakdown-meta">
                  <span className="breakdown-name">
                    {cat.icon} {categoryName}
                  </span>
                  <span className="breakdown-amount">
                    ₹{amount.toLocaleString()} · {percent}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percent}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* ── Top category highlight ── */}
      {topCategory && (
        <div className="top-category-tip">
          🏆 Your biggest spending category is{' '}
          <strong style={{ color: 'var(--accent)' }}>{topCategory[0]}</strong>
          {' '}at{' '}
          <strong style={{ color: 'var(--accent)' }}>
            ₹{topCategory[1].toLocaleString()}
          </strong>
        </div>
      )}

    </div>
  )
}
