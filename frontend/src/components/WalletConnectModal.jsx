import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Card from './ui/Card';
import Badge from './ui/Badge';
import useStore from '../utils/store';

const WalletConnectModal = ({ isOpen, onClose }) => {
  const connectWallet = useStore((state) => state.connectWallet);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const wallets = [
    {
      id: 'unisat',
      name: 'UniSat Wallet',
      icon: '🟠',
      description: 'Popular Bitcoin browser wallet',
      available: true,
    },
    {
      id: 'xverse',
      name: 'Xverse',
      icon: '🔷',
      description: 'Bitcoin & Stacks wallet',
      available: true,
    },
    {
      id: 'leather',
      name: 'Leather (Hiro)',
      icon: '🟣',
      description: 'Bitcoin wallet by Hiro',
      available: true,
    },
    {
      id: 'metamask',
      name: 'MetaMask Snap',
      icon: '🦊',
      description: 'Bitcoin support via Snaps',
      available: false,
    },
  ];

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock address
    const mockAddress = `bc1q${Math.random().toString(36).substring(2, 15)}...`;
    
    connectWallet(mockAddress);
    setIsConnecting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connect Wallet"
      size="medium"
    >
      <div className="space-y-6">
        <p className="text-gray-400">
          Select a wallet to connect to the BitVMX Lending Protocol
        </p>

        {/* Wallet Options */}
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Card
              key={wallet.id}
              hover={wallet.available}
              onClick={() => wallet.available && setSelectedWallet(wallet)}
              className={`cursor-pointer transition-all ${
                !wallet.available ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                selectedWallet?.id === wallet.id 
                  ? 'ring-2 ring-bitcoin border-bitcoin' 
                  : ''
              }`}
              padding="compact"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{wallet.icon}</div>
                  <div>
                    <h4 className="font-medium text-white">{wallet.name}</h4>
                    <p className="text-sm text-gray-400">{wallet.description}</p>
                  </div>
                </div>
                {!wallet.available && (
                  <Badge variant="default" size="small">Coming Soon</Badge>
                )}
                {wallet.available && selectedWallet?.id === wallet.id && (
                  <div className="w-5 h-5 bg-bitcoin rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Test Mode Notice */}
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-400">
            <strong>Test Mode:</strong> This is a demo environment. No real Bitcoin transactions will occur.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            fullWidth
            onClick={handleConnect}
            loading={isConnecting}
            disabled={!selectedWallet}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isConnecting}
          >
            Cancel
          </Button>
        </div>

        {/* Help Link */}
        <div className="text-center">
          <Button variant="link" size="small">
            Don't have a wallet? Learn how to get one
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletConnectModal;