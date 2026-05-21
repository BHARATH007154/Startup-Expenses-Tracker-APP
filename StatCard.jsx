// ============================================
// components/StatCard.jsx
//
// A small summary card shown on the Dashboard.
// Displays: icon + label + value
//
// REACT CONCEPT: Props
//   This component receives 5 props from Dashboard:
//     - icon    → the emoji to show
//     - label   → the small text above the number
//     - value   → the big number/text to show
//     - color   → text color of the value
//     - bgColor → background color of the icon circle
//
// Props make this component REUSABLE — we render it
// 4 times with different data, not 4 separate components.
// ============================================

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
