import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import Badge, { NetworkBadge } from './ui/Badge';
import useStore from '../utils/store';

const Navigation = () => {
  const location = useLocation();
  const { wallet, disconnectWallet, showModal } = useStore();
  
  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/lender', label: 'Lend', icon: '💰' },
    { path: '/borrower', label: 'Borrow', icon: '🏦' },
    { path: '/verify', label: 'Verify', icon: '✅' },
  ];

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <nav className="bg-slate-800 border-b border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bitcoin rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.24 10.56c-.31 1.24-2.04.61-2.61.43l.55-2.18c.56.14 2.38.44 2.06 1.75zm-.88 3.53c-.34 1.36-2.46.75-3.15.56l.62-2.49c.69.17 2.88.5 2.53 1.93zm4.64-5.98c-.42-1.68-1.91-2.55-3.62-2.66V3h-1.5v2.4c-.39 0-.79.01-1.18.02V3h-1.5v2.45c-.32 0-.65.01-.97.01l-2.07-.01v1.61s1.1-.02 1.09 0c.61 0 .81.37.86.69l2.16 8.66c-.05.2-.22.52-.73.51.02.01-1.09 0-1.09 0l-.3 1.7h2.02c.38 0 .75.01 1.11.01V21h1.5v-2.35c.4.01.79.01 1.18.01V21h1.5v-2.36c2.26-.13 3.83-.71 4.02-2.89.16-1.77-.66-2.56-1.98-2.88.82-.42 1.34-1.16 1.08-2.36z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-bitcoin to-bitcoin-light bg-clip-text text-transparent">
                BitVMX
              </span>
            </Link>
            
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isActive(link.path) 
                      ? 'bg-bitcoin/20 text-bitcoin border border-bitcoin/30' 
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }
                  `}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NetworkBadge network={wallet.network} />
            
            {wallet.connected ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="text-sm font-mono text-white">{wallet.balance} BTC</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-gray-300">
                    {truncateAddress(wallet.address)}
                  </span>
                  <button
                    onClick={disconnectWallet}
                    className="ml-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => showModal('walletConnect')}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;