import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { MiniStepIndicator } from './layout/StepIndicator';
import Card from './ui/Card';

const Tutorial = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Welcome to BitVMX Lending',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-bitcoin/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👋</span>
            </div>
          </div>
          <p className="text-gray-300">
            BitVMX is a decentralized lending protocol that enables trustless Bitcoin lending 
            using advanced cryptographic verification.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card padding="compact" className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm text-gray-400">Earn yield as a lender</p>
            </Card>
            <Card padding="compact" className="text-center">
              <div className="text-2xl mb-2">🏦</div>
              <p className="text-sm text-gray-400">Borrow without selling</p>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: 'How Lending Works',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-bitcoin/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Create Offer</h4>
                <p className="text-sm text-gray-400">Set your lending amount, interest rate, and terms</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-bitcoin/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Match Borrowers</h4>
                <p className="text-sm text-gray-400">Borrowers accept your offer with proper collateral</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-bitcoin/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Earn Interest</h4>
                <p className="text-sm text-gray-400">Receive automated interest payments</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'How Borrowing Works',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Browse Offers</h4>
                <p className="text-sm text-gray-400">Find the best rates from available lenders</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Lock Collateral</h4>
                <p className="text-sm text-gray-400">Secure your loan with Bitcoin collateral (usually 150%)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Receive Funds</h4>
                <p className="text-sm text-gray-400">Get instant liquidity without selling your Bitcoin</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Safety & Security',
      content: (
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg flex items-start gap-3">
              <span className="text-green-400 text-xl">🔒</span>
              <div>
                <h4 className="font-medium text-white">Non-Custodial</h4>
                <p className="text-sm text-gray-400">You control your keys and funds at all times</p>
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg flex items-start gap-3">
              <span className="text-green-400 text-xl">🛡️</span>
              <div>
                <h4 className="font-medium text-white">Over-Collateralized</h4>
                <p className="text-sm text-gray-400">All loans are secured with 140%+ collateral</p>
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg flex items-start gap-3">
              <span className="text-green-400 text-xl">⚡</span>
              <div>
                <h4 className="font-medium text-white">BitVMX Protocol</h4>
                <p className="text-sm text-gray-400">Advanced cryptographic verification ensures security</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tutorialSteps[currentStep].title}
      size="medium"
    >
      <div className="space-y-6">
        {tutorialSteps[currentStep].content}
        
        <div className="flex justify-center">
          <MiniStepIndicator
            totalSteps={tutorialSteps.length}
            currentStep={currentStep}
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={onClose}
            size="small"
          >
            Skip Tutorial
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
          >
            {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Tutorial;