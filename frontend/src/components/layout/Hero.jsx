import React from 'react';
import Button, { BitcoinButton } from '../ui/Button';
import Badge from '../ui/Badge';

const Hero = ({ 
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  badge,
  backgroundEffect = 'gradient',
  className = ''
}) => {
  const renderBackgroundEffect = () => {
    switch (backgroundEffect) {
      case 'gradient':
        return (
          <>
            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-bitcoin/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        );
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }} />
        );
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-bitcoin/50 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`relative py-24 px-4 overflow-hidden ${className}`}>
      {/* Background effects */}
      {renderBackgroundEffect()}
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {badge && (
          <div className="mb-6 animate-fade-in">
            {badge}
          </div>
        )}
        
        {title && (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-semibold text-bitcoin mb-8 animate-slide-up animation-delay-100">
            {subtitle}
          </h2>
        )}
        
        {description && (
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            {description}
          </p>
        )}
        
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-300">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </section>
  );
};

// Specialized hero sections
export const LandingHero = () => {
  return (
    <Hero
      title={
        <>
          <span className="bg-gradient-to-r from-bitcoin to-bitcoin-light bg-clip-text text-transparent">
            BitVMX
          </span>{' '}
          Lending Protocol
        </>
      }
      subtitle="Decentralized Bitcoin Lending with Zero Trust"
      description="Leverage advanced cryptographic verification to create trustless lending markets on Bitcoin. No intermediaries, no custody, just pure peer-to-peer finance."
      badge={<Badge variant="tech" dot pulse>Beta Version</Badge>}
      primaryAction={
        <BitcoinButton size="large">
          Start Lending
        </BitcoinButton>
      }
      secondaryAction={
        <Button variant="ghost" size="large">
          Learn More
        </Button>
      }
      backgroundEffect="gradient"
    />
  );
};

export const PageHero = ({ title, description, breadcrumbs }) => {
  return (
    <div className="relative py-12 px-4 border-b border-gray-800">
      {/* Simple grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23smallGrid)' /%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {breadcrumbs && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <li>
                    {crumb.href ? (
                      <a href={crumb.href} className="text-gray-400 hover:text-bitcoin transition-colors">
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-gray-300">{crumb.label}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}
        
        <h1 className="text-4xl font-bold text-white mb-2">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export const FeatureHero = ({ features }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose BitVMX?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the future of Bitcoin lending with our cutting-edge protocol
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="
                bg-gradient-to-br from-slate-800 to-slate-900 
                p-8 rounded-xl border border-gray-700
                hover:border-bitcoin/50 transition-all duration-300
                group-hover:transform group-hover:scale-105
                group-hover:shadow-xl group-hover:shadow-bitcoin/10
              ">
                <div className="text-bitcoin text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;