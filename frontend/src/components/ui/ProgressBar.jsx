import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  label,
  showPercentage = true,
  size = 'medium',
  variant = 'primary',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const variants = {
    primary: 'from-bitcoin to-bitcoin-dark',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
    info: 'from-blue-500 to-blue-600',
    tech: 'from-tech-blue to-tech-darkblue',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-300">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-mono text-gray-400">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      
      <div className={`
        relative w-full bg-gray-800 rounded-full overflow-hidden 
        ${sizes[size]}
        shadow-inner
      `}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        {/* Progress bar */}
        <div
          className={`
            relative h-full bg-gradient-to-r ${variants[variant]}
            transition-all duration-500 ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          {animated && percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};

// Specialized progress components
export const StepProgress = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 transform
                  ${isCompleted ? 'bg-bitcoin text-white scale-110' : ''}
                  ${isActive ? 'bg-bitcoin text-white scale-110 animate-pulse shadow-glow-orange' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-700 text-gray-400' : ''}
                `}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-[100px]
                  ${isActive ? 'text-bitcoin' : 'text-gray-400'}
                `}>
                  {step}
                </span>
              </div>
              
              {!isLast && (
                <div className={`
                  flex-1 h-1 mx-2 rounded-full transition-all duration-500
                  ${isCompleted ? 'bg-bitcoin' : 'bg-gray-700'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  variant = 'primary',
  showValue = true,
  label
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#F7931A',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    tech: '#00D4FF',
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(31, 41, 55)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors[variant]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${colors[variant]}40)`
          }}
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {percentage.toFixed(0)}%
          </span>
          {label && (
            <span className="text-xs text-gray-400 mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Loading bar for async operations
export const LoadingBar = ({ isLoading, className = '' }) => {
  if (!isLoading) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-gray-800">
        <div className="h-full bg-gradient-to-r from-bitcoin via-bitcoin-light to-bitcoin animate-loading-bar" />
      </div>
    </div>
  );
};

export default ProgressBar;