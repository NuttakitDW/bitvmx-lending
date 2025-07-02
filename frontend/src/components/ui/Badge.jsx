import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  dot = false,
  pulse = false,
  rounded = false,
  icon,
  onRemove,
  className = ''
}) => {
  const baseClasses = `
    inline-flex items-center font-medium
    transition-all duration-200
    ${rounded ? 'rounded-full' : 'rounded-md'}
  `;

  const variants = {
    default: 'bg-gray-700 text-gray-200 border border-gray-600',
    primary: 'bg-bitcoin/20 text-bitcoin border border-bitcoin/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    tech: 'bg-tech-blue/20 text-tech-blue border border-tech-blue/30',
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm',
    large: 'px-3 py-1.5 text-base',
  };

  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-bitcoin',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    danger: 'bg-red-400',
    info: 'bg-blue-400',
    tech: 'bg-tech-blue',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && (
        <span className="relative flex items-center mr-1.5">
          <span className={`
            w-2 h-2 rounded-full ${dotColors[variant]}
            ${pulse ? 'animate-pulse' : ''}
          `} />
          {pulse && (
            <span className={`absolute inset-0 w-2 h-2 rounded-full ${dotColors[variant]} animate-ping`} />
          )}
        </span>
      )}
      
      {icon && <span className="mr-1">{icon}</span>}
      
      {children}
      
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 -mr-0.5 hover:text-white transition-colors duration-200"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

// Specialized badge components
export const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    active: { variant: 'success', label: 'Active', pulse: true },
    pending: { variant: 'warning', label: 'Pending', pulse: true },
    completed: { variant: 'default', label: 'Completed' },
    verified: { variant: 'success', label: 'Verified', icon: '✓' },
    unverified: { variant: 'danger', label: 'Unverified' },
    processing: { variant: 'info', label: 'Processing', pulse: true },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge 
      variant={config.variant} 
      dot 
      pulse={config.pulse}
      className={className}
    >
      {config.icon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </Badge>
  );
};

export const CountBadge = ({ count, max = 99, variant = 'primary', className = '' }) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge 
      variant={variant} 
      size="small" 
      rounded
      className={`min-w-[1.5rem] justify-center ${className}`}
    >
      {displayCount}
    </Badge>
  );
};

export const TagBadge = ({ label, onRemove, className = '' }) => {
  return (
    <Badge 
      variant="default" 
      size="small"
      onRemove={onRemove}
      className={className}
    >
      {label}
    </Badge>
  );
};

// Badge group for multiple badges
export const BadgeGroup = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
};

// Network badge for blockchain networks
export const NetworkBadge = ({ network, className = '' }) => {
  const networkConfig = {
    mainnet: { 
      variant: 'success', 
      label: 'Mainnet',
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      )
    },
    testnet: { 
      variant: 'warning', 
      label: 'Testnet',
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    regtest: { 
      variant: 'info', 
      label: 'Regtest',
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
  };

  const config = networkConfig[network] || networkConfig.mainnet;

  return (
    <Badge 
      variant={config.variant} 
      icon={config.icon}
      className={className}
    >
      {config.label}
    </Badge>
  );
};

export default Badge;