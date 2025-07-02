import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/layout/Hero';
import StepIndicator from '../components/layout/StepIndicator';
import Button from '../components/ui/Button';
import Card, { LoanCard } from '../components/ui/Card';
import Badge, { StatusBadge } from '../components/ui/Badge';
import Modal, { ConfirmModal, InfoModal, Tooltip } from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';
import useStore from '../utils/store';

const LenderPage = () => {
  const navigate = useNavigate();
  const {
    wallet,
    lenderFlow,
    lendingOffers,
    activeLoans,
    updateLenderStep,
    updateLenderFormData,
    createLendingOffer,
    resetLenderFlow,
    showModal,
  } = useStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const steps = [
    { title: 'Set Terms', subtitle: 'Define loan parameters' },
    { title: 'Requirements', subtitle: 'Set borrower criteria' },
    { title: 'Review', subtitle: 'Confirm details' },
    { title: 'Create', subtitle: 'Deploy offer' },
  ];

  useEffect(() => {
    // Reset flow when component mounts
    resetLenderFlow();
  }, []);

  const validateStep = () => {
    const errors = {};
    const { formData } = lenderFlow;

    if (lenderFlow.currentStep === 0) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        errors.amount = 'Amount must be greater than 0';
      }
      if (!formData.interestRate || parseFloat(formData.interestRate) <= 0) {
        errors.interestRate = 'Interest rate must be greater than 0';
      }
      if (!formData.duration || parseInt(formData.duration) <= 0) {
        errors.duration = 'Duration must be greater than 0';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (lenderFlow.currentStep === 2) {
        setShowConfirm(true);
      } else {
        updateLenderStep(lenderFlow.currentStep + 1);
      }
    }
  };

  const handleCreateOffer = async () => {
    setShowConfirm(false);
    updateLenderStep(3);
    await createLendingOffer();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Page Header */}
      <PageHero
        title="Lender Dashboard"
        description="Create lending offers and manage your active loans"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Lender Dashboard' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Create New Offer Section */}
        <Card className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create New Lending Offer</h2>
            <p className="text-gray-400">Set your terms and start earning yield on your Bitcoin</p>
          </div>

          {/* Step Indicator */}
          <StepIndicator
            steps={steps}
            currentStep={lenderFlow.currentStep}
            className="mb-8"
          />

          {/* Step Content */}
          <div className="mt-8">
            {lenderFlow.currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lending Amount
                    <Tooltip content="The amount of Bitcoin you want to lend">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.0001"
                      value={lenderFlow.formData.amount}
                      onChange={(e) => updateLenderFormData({ amount: e.target.value })}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin ${
                        validationErrors.amount ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="0.1"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">BTC</span>
                  </div>
                  {validationErrors.amount && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Annual Interest Rate
                    <Tooltip content="The yearly interest rate borrowers will pay">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={lenderFlow.formData.interestRate}
                      onChange={(e) => updateLenderFormData({ interestRate: e.target.value })}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin ${
                        validationErrors.interestRate ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="5.0"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">%</span>
                  </div>
                  {validationErrors.interestRate && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.interestRate}</p>
                  )}
                  {lenderFlow.formData.interestRate && (
                    <p className="mt-2 text-sm text-gray-500">
                      Monthly return: ~{(parseFloat(lenderFlow.formData.interestRate) / 12).toFixed(2)}%
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Duration
                    <Tooltip content="Maximum loan duration in days">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={lenderFlow.formData.duration}
                      onChange={(e) => updateLenderFormData({ duration: e.target.value })}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin ${
                        validationErrors.duration ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="30"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">days</span>
                  </div>
                  {validationErrors.duration && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.duration}</p>
                  )}
                </div>
              </div>
            )}

            {lenderFlow.currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Collateral Ratio
                    <Tooltip content="The minimum collateral percentage required from borrowers">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['140', '150', '160'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => updateLenderFormData({ minCollateral: ratio })}
                        className={`p-3 rounded-lg border transition-all ${
                          lenderFlow.formData.minCollateral === ratio
                            ? 'bg-bitcoin/20 border-bitcoin text-bitcoin'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {ratio}%
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {lenderFlow.formData.minCollateral}% (LTV: {(100 / (parseInt(lenderFlow.formData.minCollateral) / 100)).toFixed(1)}%)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Borrower Requirements
                  </label>
                  <div className="space-y-2">
                    {[
                      'Verified identity (KYC)',
                      'Good repayment history',
                      'Minimum account age (30 days)',
                      'Insurance coverage',
                    ].map((req) => (
                      <label key={req} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={lenderFlow.formData.requirements.includes(req)}
                          onChange={(e) => {
                            const reqs = e.target.checked
                              ? [...lenderFlow.formData.requirements, req]
                              : lenderFlow.formData.requirements.filter(r => r !== req);
                            updateLenderFormData({ requirements: reqs });
                          }}
                          className="mr-3 rounded bg-gray-800 border-gray-700 text-bitcoin focus:ring-bitcoin"
                        />
                        <span className="text-gray-300">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {lenderFlow.currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Review Your Offer</h3>
                
                <Card padding="compact" className="bg-gray-800/50">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Lending Amount</span>
                      <span className="text-white font-mono">{lenderFlow.formData.amount} BTC</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Interest Rate</span>
                      <span className="text-white">{lenderFlow.formData.interestRate}% APY</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{lenderFlow.formData.duration} days</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                      <span className="text-gray-400">Min Collateral</span>
                      <span className="text-white">{lenderFlow.formData.minCollateral}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-2">Requirements</span>
                      <div className="space-y-1">
                        {lenderFlow.formData.requirements.length > 0 ? (
                          lenderFlow.formData.requirements.map((req, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-300">
                              <span className="text-green-400 mr-2">✓</span>
                              {req}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No additional requirements</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="p-4 bg-bitcoin/10 border border-bitcoin/30 rounded-lg">
                  <p className="text-sm text-bitcoin">
                    <strong>Note:</strong> Once created, your offer will be visible to all potential borrowers. 
                    You can cancel unclaimed offers at any time.
                  </p>
                </div>
              </div>
            )}

            {lenderFlow.currentStep === 3 && (
              <div className="text-center py-12">
                {lenderFlow.isCreating ? (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-bitcoin/20 rounded-full mb-4">
                        <svg className="animate-spin h-8 w-8 text-bitcoin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Creating Your Offer...</h3>
                    <p className="text-gray-400">Please wait while we deploy your lending offer</p>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Offer Created Successfully!</h3>
                    <p className="text-gray-400 mb-6">Your lending offer is now live and available to borrowers</p>
                    <div className="flex justify-center gap-4">
                      <Button variant="primary" onClick={() => resetLenderFlow()}>
                        Create Another Offer
                      </Button>
                      <Button variant="ghost" onClick={() => navigate('/')}>
                        Back to Dashboard
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {lenderFlow.currentStep < 3 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => updateLenderStep(Math.max(0, lenderFlow.currentStep - 1))}
                disabled={lenderFlow.currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                loading={lenderFlow.isCreating}
              >
                {lenderFlow.currentStep === 2 ? 'Create Offer' : 'Next'}
              </Button>
            </div>
          )}
        </Card>

        {/* Active Offers & Loans */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Your Active Offers */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Your Active Offers</h3>
            {lendingOffers.filter(o => o.lender === wallet.address).length > 0 ? (
              <div className="space-y-4">
                {lendingOffers
                  .filter(o => o.lender === wallet.address)
                  .map((offer) => (
                    <Card key={offer.id} hover>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{offer.amount} BTC</h4>
                          <p className="text-sm text-gray-400">{offer.duration} days • {offer.interestRate}% APY</p>
                        </div>
                        <StatusBadge status={offer.status} />
                      </div>
                      <ProgressBar
                        value={offer.amount - offer.remainingAmount}
                        max={offer.amount}
                        label="Amount Claimed"
                        variant="primary"
                        size="small"
                      />
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Created {offer.createdAt}</span>
                        <Button variant="ghost" size="small">
                          Manage
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="text-center py-8">
                <p className="text-gray-400">No active offers yet</p>
              </Card>
            )}
          </div>

          {/* Active Loans */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Active Loans</h3>
            {activeLoans.length > 0 ? (
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    onSelect={() => setShowInfo(true)}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-8">
                <p className="text-gray-400">No active loans yet</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCreateOffer}
        title="Confirm Lending Offer"
        message="Are you ready to create this lending offer? Once created, it will be visible to all potential borrowers."
        confirmText="Create Offer"
      />

      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Loan Details"
      >
        <div className="space-y-4">
          <p className="text-gray-300">View detailed information about this loan, including payment history and borrower details.</p>
          <Button variant="primary" fullWidth onClick={() => setShowInfo(false)}>
            View Full Details
          </Button>
        </div>
      </InfoModal>
    </div>
  );
};

export default LenderPage;