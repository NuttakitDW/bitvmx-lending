import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left'
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium
    rounded-lg transition-all duration-200 transform
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${!disabled && !loading ? 'hover:scale-105 active:scale-95' : ''}
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-bitcoin to-bitcoin-dark text-white
      hover:from-bitcoin-dark hover:to-bitcoin hover:shadow-lg hover:shadow-bitcoin/25
      focus:ring-bitcoin
      ${!disabled && !loading ? 'hover:shadow-glow-orange' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800 text-white
      border border-gray-600 hover:border-gray-500
      hover:from-gray-600 hover:to-gray-700 hover:shadow-lg
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 text-white
      hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-500/25
      focus:ring-red-500
    `,
    ghost: `
      bg-transparent text-gray-300 border border-gray-700
      hover:bg-gray-800 hover:text-white hover:border-gray-600
      focus:ring-gray-600
    `,
    link: `
      bg-transparent text-bitcoin hover:text-bitcoin-light
      underline-offset-4 hover:underline focus:ring-bitcoin
      p-0 h-auto
    `
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Don't apply size classes to link variant
  const sizeClass = variant === 'link' ? '' : sizes[size];

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span className={iconPosition === 'left' ? 'mr-2' : 'order-2 ml-2'}>
          <LoadingSpinner />
        </span>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

// Specialized button components
export const BitcoinButton = ({ children, ...props }) => {
  const bitcoinIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.24 10.56c-.31 1.24-2.04.61-2.61.43l.55-2.18c.56.14 2.38.44 2.06 1.75zm-.88 3.53c-.34 1.36-2.46.75-3.15.56l.62-2.49c.69.17 2.88.5 2.53 1.93zm4.64-5.98c-.42-1.68-1.91-2.55-3.62-2.66V3h-1.5v2.4c-.39 0-.79.01-1.18.02V3h-1.5v2.45c-.32 0-.65.01-.97.01l-2.07-.01v1.61s1.1-.02 1.09 0c.61 0 .81.37.86.69l2.16 8.66c-.05.2-.22.52-.73.51.02.01-1.09 0-1.09 0l-.3 1.7h2.02c.38 0 .75.01 1.11.01V21h1.5v-2.35c.4.01.79.01 1.18.01V21h1.5v-2.36c2.26-.13 3.83-.71 4.02-2.89.16-1.77-.66-2.56-1.98-2.88.82-.42 1.34-1.16 1.08-2.36z"/>
    </svg>
  );

  return (
    <Button
      variant="primary"
      icon={bitcoinIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button;