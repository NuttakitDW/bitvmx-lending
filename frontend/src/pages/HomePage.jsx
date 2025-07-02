import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero, { FeatureHero } from '../components/layout/Hero';
import Button, { BitcoinButton } from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge, { NetworkBadge } from '../components/ui/Badge';
import Modal, { InfoModal } from '../components/ui/Modal';
import useStore from '../utils/store';

const HomePage = () => {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const wallet = useStore((state) => state.wallet);
  const showModal = useStore((state) => state.showModal);

  const features = [
    {
      icon: '🔒',
      title: 'Non-Custodial',
      description: 'Your Bitcoin remains under your control with multi-sig smart contracts',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Instant loan approval with automated verification and settlement',
    },
    {
      icon: '🛡️',
      title: 'Cryptographically Secure',
      description: 'Built on BitVMX with zero-knowledge proofs and advanced scripting',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '2,345 BTC', change: '+12%' },
    { label: 'Active Loans', value: '1,234', change: '+8%' },
    { label: 'Average APY', value: '5.2%', change: '+0.3%' },
    { label: 'Total Users', value: '8,901', change: '+25%' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
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
        badge={
          <div className="flex items-center gap-2">
            <NetworkBadge network="testnet" />
            <Badge variant="tech" dot pulse>Beta Version</Badge>
          </div>
        }
        primaryAction={
          <BitcoinButton 
            size="large" 
            onClick={() => {
              if (wallet.connected) {
                navigate('/lender');
              } else {
                showModal('walletConnect');
              }
            }}
          >
            Start Lending
          </BitcoinButton>
        }
        secondaryAction={
          <Button 
            variant="ghost" 
            size="large"
            onClick={() => setShowLearnMore(true)}
          >
            Learn More
          </Button>
        }
        backgroundEffect="gradient"
      />

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} padding="compact" className="text-center">
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Actions Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-gray-400">
              Whether you're looking to earn yield or access liquidity, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Lender Card */}
            <Card 
              hover 
              gradient
              onClick={() => navigate('/lender')}
              className="group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">💰</div>
                <Badge variant="primary">For Lenders</Badge>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Earn Yield on Bitcoin
              </h3>
              
              <p className="text-gray-400 mb-6">
                Put your Bitcoin to work by providing liquidity to borrowers. 
                Earn competitive interest rates with full collateral protection.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Average APY: 4-8%
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Fully collateralized loans
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Automated interest payments
                </div>
              </div>

              <div className="flex items-center text-bitcoin group-hover:text-bitcoin-light transition-colors">
                <span className="font-semibold">Start Lending</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>

            {/* Borrower Card */}
            <Card 
              hover 
              gradient
              onClick={() => navigate('/borrower')}
              className="group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">🏦</div>
                <Badge variant="success">For Borrowers</Badge>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Access Instant Liquidity
              </h3>
              
              <p className="text-gray-400 mb-6">
                Unlock the value of your Bitcoin without selling. 
                Use your BTC as collateral to access stable liquidity.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Keep your Bitcoin exposure
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Flexible loan terms
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  No credit checks required
                </div>
              </div>

              <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                <span className="font-semibold">Start Borrowing</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </div>

          {/* Verify Transaction Link */}
          <div className="mt-12 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/verify')}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Verify a transaction
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureHero features={features} />

      {/* Learn More Modal */}
      <InfoModal
        isOpen={showLearnMore}
        onClose={() => setShowLearnMore(false)}
        title="How BitVMX Lending Works"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">1. Smart Contract Creation</h4>
            <p className="text-gray-400">
              Lenders and borrowers create a multi-signature smart contract that locks collateral 
              and defines loan terms using BitVMX's advanced scripting capabilities.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">2. Cryptographic Verification</h4>
            <p className="text-gray-400">
              All transactions are verified using zero-knowledge proofs, ensuring privacy 
              while maintaining complete transparency and security.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">3. Automated Settlement</h4>
            <p className="text-gray-400">
              Interest payments and loan settlements are handled automatically through 
              time-locked contracts, eliminating counterparty risk.
            </p>
          </div>

          <div className="mt-6 p-4 bg-bitcoin/10 border border-bitcoin/30 rounded-lg">
            <p className="text-sm text-bitcoin">
              <strong>Note:</strong> This is a beta version running on testnet. 
              Please use test Bitcoin only.
            </p>
          </div>
        </div>
      </InfoModal>
    </div>
  );
};

export default HomePage;