import React from 'react';
import type { LucideProps } from 'lucide-react';

/** Глаз с анимацией зрачка при наведении */
export const AnimatedEyeIcon: React.FC<LucideProps> = ({ size = 14, className, ...props }) => {
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
      <path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        className="eye-outline"
      />
      <circle cx="12" cy="12" r="3" className="eye-pupil" />
    </svg>
  );
};
