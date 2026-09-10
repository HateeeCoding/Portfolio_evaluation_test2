import React from 'react';
import { clsx } from 'clsx';

export type BadgeVariant = 'emerald' | 'amber' | 'rose' | 'slate' | 'brand';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'slate', size = 'sm', className }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-xs font-medium',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
