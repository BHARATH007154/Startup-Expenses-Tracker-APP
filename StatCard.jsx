

import './StatCard.css'

export default function StatCard({ icon, label, value, color, bgColor }) {
  return (
    <div className="stat-card">
      {/* Icon circle */}
      <div className="stat-icon" style={{ background: bgColor }}>
        {icon}
      </div>

      {/* Label (small text) */}
      <div className="stat-label">{label}</div>

      {/* Value (big text) — color comes from the color prop */}
      <div className="stat-value" style={{ color: color }}>
        {value}
      </div>
    </div>
  )
}
