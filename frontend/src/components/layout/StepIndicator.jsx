import React from 'react';
import Badge from '../ui/Badge';

const StepIndicator = ({ 
  steps, 
  currentStep, 
  orientation = 'horizontal',
  showLabels = true,
  allowClickableSteps = false,
  onStepClick,
  className = ''
}) => {
  const isStepCompleted = (stepIndex) => stepIndex < currentStep;
  const isStepActive = (stepIndex) => stepIndex === currentStep;
  const isStepClickable = (stepIndex) => allowClickableSteps && stepIndex <= currentStep;

  const handleStepClick = (stepIndex) => {
    if (isStepClickable(stepIndex) && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className={`relative ${className}`}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const completed = isStepCompleted(index);
          const active = isStepActive(index);
          const clickable = isStepClickable(index);

          return (
            <div key={index} className="relative flex items-start">
              {/* Connector line */}
              {!isLast && (
                <div 
                  className={`
                    absolute left-5 top-10 w-0.5 h-full -ml-px
                    transition-all duration-500
                    ${completed ? 'bg-bitcoin' : 'bg-gray-700'}
                  `}
                />
              )}
              
              {/* Step */}
              <div className="flex items-start mb-8 last:mb-0">
                {/* Step indicator */}
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!clickable}
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full
                    transition-all duration-300 transform
                    ${clickable ? 'cursor-pointer' : 'cursor-default'}
                    ${completed ? 'bg-bitcoin text-white scale-110' : ''}
                    ${active ? 'bg-bitcoin text-white scale-110 ring-4 ring-bitcoin/30 animate-pulse' : ''}
                    ${!completed && !active ? 'bg-gray-800 text-gray-400 border-2 border-gray-700' : ''}
                    ${clickable && !active ? 'hover:scale-105 hover:border-bitcoin/50' : ''}
                  `}
                >
                  {completed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                  
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-bitcoin/20 animate-ping" />
                  )}
                </button>
                
                {/* Step content */}
                {showLabels && (
                  <div className="ml-4 flex-1">
                    <h3 className={`
                      text-lg font-semibold transition-colors duration-300
                      ${active ? 'text-white' : 'text-gray-400'}
                      ${completed ? 'text-gray-300' : ''}
                    `}>
                      {step.title}
                    </h3>
                    
                    {step.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>
                    )}
                    
                    {step.status && (
                      <div className="mt-2">
                        <Badge 
                          variant={active ? 'primary' : completed ? 'success' : 'default'}
                          size="small"
                          dot={active}
                          pulse={active}
                        >
                          {step.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal orientation (default)
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700" />
        
        {/* Progress line filled */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-bitcoin transition-all duration-500 ease-out"
          style={{ 
            width: `${(currentStep / (steps.length - 1)) * 100}%` 
          }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const completed = isStepCompleted(index);
            const active = isStepActive(index);
            const clickable = isStepClickable(index);

            return (
              <div 
                key={index} 
                className="flex flex-col items-center"
                style={{ flex: index === 0 || index === steps.length - 1 ? '0 0 auto' : 1 }}
              >
                {/* Step indicator */}
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!clickable}
                  className={`
                    relative z-10 flex items-center justify-center w-10 h-10 rounded-full
                    transition-all duration-300 transform
                    ${clickable ? 'cursor-pointer' : 'cursor-default'}
                    ${completed ? 'bg-bitcoin text-white scale-110' : ''}
                    ${active ? 'bg-bitcoin text-white scale-110 ring-4 ring-bitcoin/30' : ''}
                    ${!completed && !active ? 'bg-gray-800 text-gray-400 border-2 border-gray-700' : ''}
                    ${clickable && !active ? 'hover:scale-105 hover:border-bitcoin/50' : ''}
                  `}
                >
                  {completed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                  
                  {/* Active pulse */}
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-bitcoin/20 animate-ping" />
                  )}
                </button>
                
                {/* Step label */}
                {showLabels && (
                  <div className="mt-3 text-center">
                    <p className={`
                      text-sm font-medium transition-colors duration-300
                      ${active ? 'text-bitcoin' : 'text-gray-400'}
                      ${completed ? 'text-gray-300' : ''}
                    `}>
                      {step.title}
                    </p>
                    
                    {step.subtitle && (
                      <p className="mt-1 text-xs text-gray-500 max-w-[120px]">
                        {step.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Mini step indicator for compact spaces
export const MiniStepIndicator = ({ totalSteps, currentStep, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`
            transition-all duration-300
            ${index === currentStep 
              ? 'w-8 h-2 bg-bitcoin rounded-full' 
              : 'w-2 h-2 bg-gray-700 rounded-full hover:bg-gray-600'
            }
            ${index < currentStep ? 'bg-bitcoin/50' : ''}
          `}
        />
      ))}
    </div>
  );
};

// Step indicator with timeline
export const TimelineStepIndicator = ({ events, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700" />
      
      {events.map((event, index) => (
        <div key={index} className="relative flex items-start mb-8 last:mb-0">
          {/* Event dot */}
          <div className={`
            relative z-10 flex items-center justify-center w-16 h-16 rounded-full
            ${event.completed ? 'bg-bitcoin' : 'bg-gray-800 border-2 border-gray-700'}
            transition-all duration-300
          `}>
            {event.icon ? (
              <span className="text-2xl">{event.icon}</span>
            ) : (
              <span className={`text-sm font-bold ${event.completed ? 'text-white' : 'text-gray-400'}`}>
                {index + 1}
              </span>
            )}
            
            {event.active && (
              <span className="absolute inset-0 rounded-full bg-bitcoin/20 animate-ping" />
            )}
          </div>
          
          {/* Event content */}
          <div className="ml-6 flex-1 pt-2">
            <div className="bg-slate-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {event.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {event.timestamp}
                </span>
              </div>
              
              {event.description && (
                <p className="text-gray-400 text-sm mb-3">
                  {event.description}
                </p>
              )}
              
              {event.details && (
                <div className="space-y-1">
                  {event.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <span className="text-gray-500 mr-2">•</span>
                      <span className="text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {event.action && (
                <div className="mt-3">
                  {event.action}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;