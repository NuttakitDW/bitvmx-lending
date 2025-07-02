import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  gradient = false,
  onClick,
  padding = 'normal'
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl border border-gray-700
    ${gradient ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-slate-800'}
    ${hover ? 'transition-all duration-300 hover:border-bitcoin/50 hover:shadow-xl hover:shadow-bitcoin/10 hover:scale-[1.02]' : ''}
    ${glow ? 'shadow-glow-orange animate-glow-pulse' : 'shadow-lg'}
    ${onClick ? 'cursor-pointer' : ''}
    ${padding === 'normal' ? 'p-6' : padding === 'compact' ? 'p-4' : padding === 'large' ? 'p-8' : ''}
  `;

  return (
    <div 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bitcoin/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Specialized card variants
export const LoanCard = ({ loan, onSelect }) => {
  return (
    <Card 
      hover 
      gradient 
      onClick={onSelect}
      className="group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {loan.amount} BTC
          </h3>
          <p className="text-gray-400 text-sm">
            {loan.duration} days duration
          </p>
        </div>
        <div className="text-right">
          <div className="text-bitcoin font-bold text-lg">
            {loan.interestRate}%
          </div>
          <div className="text-gray-400 text-xs">
            Interest Rate
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Collateral</span>
          <span className="text-white font-mono">{loan.collateral} BTC</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className={`
            ${loan.status === 'active' ? 'text-green-400' : ''}
            ${loan.status === 'pending' ? 'text-yellow-400' : ''}
            ${loan.status === 'completed' ? 'text-gray-400' : ''}
          `}>
            {loan.status}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Created {loan.createdAt}
          </span>
          <svg 
            className="w-5 h-5 text-bitcoin opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default Card;