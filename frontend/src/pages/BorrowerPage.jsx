import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/layout/Hero';
import StepIndicator, { MiniStepIndicator } from '../components/layout/StepIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge, { StatusBadge, CountBadge } from '../components/ui/Badge';
import Modal, { ConfirmModal, InfoModal, Tooltip } from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';
import useStore from '../utils/store';

const BorrowerPage = () => {
  const navigate = useNavigate();
  const {
    wallet,
    borrowerFlow,
    lendingOffers,
    activeBorrows,
    updateBorrowerStep,
    selectLendingOffer,
    updateBorrowerFormData,
    submitBorrowRequest,
    resetBorrowerFlow,
    addNotification,
  } = useStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [selectedOfferDetails, setSelectedOfferDetails] = useState(null);
  const [filters, setFilters] = useState({
    maxRate: '',
    minDuration: '',
    minAmount: '',
  });

  const steps = [
    { title: 'Browse Offers', subtitle: 'Find the best rates' },
    { title: 'Set Collateral', subtitle: 'Secure your loan' },
    { title: 'Review Terms', subtitle: 'Confirm details' },
    { title: 'Submit Request', subtitle: 'Complete borrowing' },
  ];

  useEffect(() => {
    resetBorrowerFlow();
  }, []);

  // Filter offers based on criteria
  const filteredOffers = lendingOffers.filter(offer => {
    if (filters.maxRate && offer.interestRate > parseFloat(filters.maxRate)) return false;
    if (filters.minDuration && offer.duration < parseInt(filters.minDuration)) return false;
    if (filters.minAmount && offer.amount < parseFloat(filters.minAmount)) return false;
    return offer.status === 'active' && offer.remainingAmount > 0;
  });

  // Calculate collateral requirements
  const calculateRequiredCollateral = () => {
    if (!borrowerFlow.selectedOffer || !borrowerFlow.formData.borrowAmount) return 0;
    const amount = parseFloat(borrowerFlow.formData.borrowAmount);
    const ratio = borrowerFlow.selectedOffer.minCollateral / 100;
    return (amount * ratio).toFixed(4);
  };

  const calculateInterest = () => {
    if (!borrowerFlow.selectedOffer || !borrowerFlow.formData.borrowAmount) return 0;
    const amount = parseFloat(borrowerFlow.formData.borrowAmount);
    const rate = borrowerFlow.selectedOffer.interestRate / 100;
    const days = borrowerFlow.selectedOffer.duration;
    return (amount * rate * (days / 365)).toFixed(4);
  };

  const handleOfferSelect = (offer) => {
    selectLendingOffer(offer);
    updateBorrowerStep(1);
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    updateBorrowerStep(3);
    await submitBorrowRequest();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Page Header */}
      <PageHero
        title="Borrower Dashboard"
        description="Find the best lending offers and borrow against your Bitcoin"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Borrower Dashboard' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <Card className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={borrowerFlow.currentStep}
            allowClickableSteps
            onStepClick={updateBorrowerStep}
          />
        </Card>

        {/* Step 0: Browse Offers */}
        {borrowerFlow.currentStep === 0 && (
          <div>
            {/* Filters */}
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Filter Offers</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Max Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={filters.maxRate}
                    onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Any"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Min Duration (days)</label>
                  <input
                    type="number"
                    value={filters.minDuration}
                    onChange={(e) => setFilters({ ...filters, minDuration: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Any"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Min Amount (BTC)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={filters.minAmount}
                    onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Any"
                  />
                </div>
              </div>
            </Card>

            {/* Available Offers */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Available Offers</h3>
                <CountBadge count={filteredOffers.length} />
              </div>

              {filteredOffers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOffers.map((offer) => (
                    <Card
                      key={offer.id}
                      hover
                      gradient
                      onClick={() => handleOfferSelect(offer)}
                      className="cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-white">{offer.amount} BTC</h4>
                          <p className="text-sm text-gray-400">Available: {offer.remainingAmount} BTC</p>
                        </div>
                        <Badge variant="success">{offer.interestRate}% APY</Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Duration</span>
                          <span className="text-gray-300">{offer.duration} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Min Collateral</span>
                          <span className="text-gray-300">{offer.minCollateral}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Max LTV</span>
                          <span className="text-gray-300">{offer.maxLoanToValue.toFixed(1)}%</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-4">{offer.description}</p>

                      <div className="flex items-center justify-between">
                        <Button
                          variant="link"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOfferDetails(offer);
                            setShowOfferDetails(true);
                          }}
                        >
                          View Details
                        </Button>
                        <svg 
                          className="w-5 h-5 text-bitcoin opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <p className="text-gray-400 mb-4">No offers match your criteria</p>
                  <Button variant="ghost" onClick={() => setFilters({ maxRate: '', minDuration: '', minAmount: '' })}>
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Step 1: Set Collateral */}
        {borrowerFlow.currentStep === 1 && borrowerFlow.selectedOffer && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Set Loan Parameters</h3>

              {/* Selected Offer Summary */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Selected Offer</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">
                    {borrowerFlow.selectedOffer.amount} BTC @ {borrowerFlow.selectedOffer.interestRate}% APY
                  </span>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => {
                      selectLendingOffer(null);
                      updateBorrowerStep(0);
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Borrow Amount
                    <Tooltip content="The amount of Bitcoin you want to borrow">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.0001"
                      value={borrowerFlow.formData.borrowAmount}
                      onChange={(e) => updateBorrowerFormData({ borrowAmount: e.target.value })}
                      max={borrowerFlow.selectedOffer.remainingAmount}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin"
                      placeholder="0.1"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">BTC</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Max available: {borrowerFlow.selectedOffer.remainingAmount} BTC
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Collateral Amount
                    <Tooltip content="The amount of Bitcoin you'll lock as collateral">
                      <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.0001"
                      value={borrowerFlow.formData.collateralAmount}
                      onChange={(e) => updateBorrowerFormData({ collateralAmount: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin"
                      placeholder={calculateRequiredCollateral()}
                    />
                    <span className="absolute right-3 top-3 text-gray-400">BTC</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Minimum required: {calculateRequiredCollateral()} BTC ({borrowerFlow.selectedOffer.minCollateral}%)
                    </p>
                    {borrowerFlow.formData.collateralAmount && borrowerFlow.formData.borrowAmount && (
                      <p className="text-sm text-gray-500">
                        Current ratio: {((parseFloat(borrowerFlow.formData.collateralAmount) / parseFloat(borrowerFlow.formData.borrowAmount)) * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Collateral Buttons */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Quick select:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[150, 175, 200].map((ratio) => (
                      <Button
                        key={ratio}
                        variant="ghost"
                        size="small"
                        onClick={() => {
                          const amount = parseFloat(borrowerFlow.formData.borrowAmount) || 0;
                          updateBorrowerFormData({ 
                            collateralAmount: (amount * (ratio / 100)).toFixed(4) 
                          });
                        }}
                        disabled={!borrowerFlow.formData.borrowAmount}
                      >
                        {ratio}%
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interest Calculation */}
                {borrowerFlow.formData.borrowAmount && (
                  <div className="p-4 bg-bitcoin/10 border border-bitcoin/30 rounded-lg">
                    <p className="text-sm font-medium text-bitcoin mb-2">Loan Summary</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Interest:</span>
                        <span className="text-white">{calculateInterest()} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Due:</span>
                        <span className="text-white font-semibold">
                          {(parseFloat(borrowerFlow.formData.borrowAmount) + parseFloat(calculateInterest())).toFixed(4)} BTC
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="ghost" onClick={() => updateBorrowerStep(0)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => updateBorrowerStep(2)}
                disabled={
                  !borrowerFlow.formData.borrowAmount || 
                  !borrowerFlow.formData.collateralAmount ||
                  parseFloat(borrowerFlow.formData.collateralAmount) < parseFloat(calculateRequiredCollateral())
                }
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Review Terms */}
        {borrowerFlow.currentStep === 2 && borrowerFlow.selectedOffer && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Review Loan Terms</h3>

              <div className="space-y-6">
                {/* Loan Details */}
                <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                  <h4 className="font-medium text-white mb-3">Loan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Borrow Amount</span>
                      <span className="text-white font-mono">{borrowerFlow.formData.borrowAmount} BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Interest Rate</span>
                      <span className="text-white">{borrowerFlow.selectedOffer.interestRate}% APY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{borrowerFlow.selectedOffer.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Interest</span>
                      <span className="text-white font-mono">{calculateInterest()} BTC</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-gray-400 font-medium">Total Due</span>
                      <span className="text-white font-mono font-semibold">
                        {(parseFloat(borrowerFlow.formData.borrowAmount) + parseFloat(calculateInterest())).toFixed(4)} BTC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collateral Details */}
                <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                  <h4 className="font-medium text-white mb-3">Collateral Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collateral Amount</span>
                      <span className="text-white font-mono">{borrowerFlow.formData.collateralAmount} BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collateral Ratio</span>
                      <span className="text-white">
                        {((parseFloat(borrowerFlow.formData.collateralAmount) / parseFloat(borrowerFlow.formData.borrowAmount)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Liquidation Price</span>
                      <span className="text-white">
                        <Tooltip content="If collateral value falls below this ratio, liquidation may occur">
                          <span className="cursor-help">110% of loan value</span>
                        </Tooltip>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                {borrowerFlow.selectedOffer.requirements.length > 0 && (
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-3">Lender Requirements</h4>
                    <div className="space-y-2">
                      {borrowerFlow.selectedOffer.requirements.map((req, i) => (
                        <div key={i} className="flex items-start text-sm">
                          <span className="text-green-400 mr-2 mt-0.5">✓</span>
                          <span className="text-gray-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    <strong>Important:</strong> By submitting this request, you agree to lock your collateral 
                    in a smart contract until the loan is repaid. Failure to repay may result in liquidation.
                  </p>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 mr-3 rounded bg-gray-800 border-gray-700 text-bitcoin focus:ring-bitcoin"
                  />
                  <span className="text-sm text-gray-300">
                    I understand and agree to the loan terms, including the risk of liquidation if I fail to repay.
                  </span>
                </label>
              </div>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="ghost" onClick={() => updateBorrowerStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowConfirm(true)}
              >
                Submit Request
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Submit Request */}
        {borrowerFlow.currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card className="text-center py-12">
              {borrowerFlow.isSubmitting ? (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <svg className="animate-spin h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Submitting Your Request...</h3>
                  <p className="text-gray-400">Please wait while we process your borrow request</p>
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
                  <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
                  <p className="text-gray-400 mb-6">
                    Your borrow request has been submitted successfully. 
                    The lender will review and approve it shortly.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="primary" onClick={() => navigate('/borrower')}>
                      View My Borrows
                    </Button>
                    <Button variant="ghost" onClick={() => resetBorrowerFlow()}>
                      Submit Another Request
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}

        {/* Active Borrows Section */}
        {borrowerFlow.currentStep === 0 && activeBorrows.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Your Active Borrows</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {activeBorrows.map((borrow) => (
                <Card key={borrow.id} hover>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{borrow.amount} BTC</h4>
                      <p className="text-sm text-gray-400">
                        {borrow.duration} days @ {borrow.interestRate}% APY
                      </p>
                    </div>
                    <StatusBadge status={borrow.status} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Collateral</span>
                      <span className="text-gray-300">{borrow.collateral} BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created</span>
                      <span className="text-gray-300">{new Date(borrow.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
        title="Confirm Borrow Request"
        message={`You are about to borrow ${borrowerFlow.formData.borrowAmount} BTC with ${borrowerFlow.formData.collateralAmount} BTC as collateral. This action cannot be undone.`}
        confirmText="Submit Request"
        variant="primary"
      />

      <InfoModal
        isOpen={showOfferDetails && selectedOfferDetails}
        onClose={() => setShowOfferDetails(false)}
        title="Offer Details"
      >
        {selectedOfferDetails && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">Lender Information</h4>
              <p className="text-sm text-gray-400 font-mono">{selectedOfferDetails.lender}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Requirements</h4>
              <ul className="space-y-1">
                {selectedOfferDetails.requirements.map((req, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                handleOfferSelect(selectedOfferDetails);
                setShowOfferDetails(false);
              }}
            >
              Select This Offer
            </Button>
          </div>
        )}
      </InfoModal>
    </div>
  );
};

export default BorrowerPage;