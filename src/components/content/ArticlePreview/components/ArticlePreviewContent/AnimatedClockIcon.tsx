import React from 'react';
import type { LucideProps } from 'lucide-react';

/** Часы с отдельными стрелками для анимации при наведении (разная скорость) */
export const AnimatedClockIcon: React.FC<LucideProps> = ({ size = 14, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <g className="clock-hour-hand">
        <line x1="12" y1="12" x2="12" y2="7" />
      </g>
      <g className="clock-minute-hand">
        <line x1="12" y1="12" x2="16" y2="12" />
      </g>
    </svg>
  );
};
