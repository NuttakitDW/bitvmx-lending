import React from 'react';

const Skeleton = ({ 
  className = '', 
  variant = 'text',
  width,
  height,
  rounded = false,
  animate = true
}) => {
  const baseClasses = `
    ${animate ? 'animate-pulse' : ''}
    bg-gray-800
    ${rounded ? 'rounded-full' : 'rounded-lg'}
  `;

  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    box: 'h-32 w-full',
    circle: 'rounded-full',
    card: 'h-48 w-full',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton variant="title" className="mb-2" />
          <Skeleton width="60%" />
        </div>
        <Skeleton width="80px" height="24px" />
      </div>
      <div className="space-y-3">
        <Skeleton />
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </div>
    </div>
  );
};

export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-gray-800">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton width={i === 0 ? '100%' : '80px'} />
        </td>
      ))}
    </tr>
  );
};

export const FormSkeleton = ({ fields = 3 }) => {
  return (
    <div className="space-y-6">
      {[...Array(fields)].map((_, i) => (
        <div key={i}>
          <Skeleton width="120px" className="mb-2" />
          <Skeleton height="48px" />
        </div>
      ))}
      <Skeleton height="48px" width="150px" className="mt-6" />
    </div>
  );
};

export default Skeleton;