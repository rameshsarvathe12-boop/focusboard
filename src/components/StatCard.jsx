import React from 'react';
import { Hash, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const ICON_MAP = {
  hash:          Hash,
  clock:         Clock,
  'check-circle': CheckCircle,
  'trending-up':  TrendingUp,
};

/**
 * StatCard – displays a single dashboard statistic.
 * Props: label, value, icon, accentColor, bgColor, trend, isPercentage, percent
 */
export default function StatCard({
  label, value, icon,
  accentColor, bgColor,
  trend, isPercentage = false, percent = 0,
}) {
  const Icon = ICON_MAP[icon] ?? Hash;

  return (
    <article
      className="stat-card"
      aria-label={`${label}: ${value}`}
    >
      <div
        className="stat-icon-wrap"
        style={{ background: bgColor }}
        aria-hidden="true"
      >
        <Icon size={22} color={accentColor} strokeWidth={2} />
      </div>

      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={{ color: accentColor }}>
          {value}
        </div>

        {isPercentage && (
          <div
            className="stat-mini-bar"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percent}% complete`}
          >
            <div
              className="stat-mini-fill"
              style={{ width: `${percent}%`, background: accentColor }}
            />
          </div>
        )}

        <div className="stat-trend">{trend}</div>
      </div>
    </article>
  );
}
