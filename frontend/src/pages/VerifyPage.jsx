import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/layout/Hero';
import { TimelineStepIndicator } from '../components/layout/StepIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge, { StatusBadge, NetworkBadge } from '../components/ui/Badge';
import ProgressBar, { CircularProgress, LoadingBar } from '../components/ui/ProgressBar';
import { InfoModal, Tooltip } from '../components/ui/Modal';
import useStore from '../utils/store';

const VerifyPage = () => {
  const navigate = useNavigate();
  const {
    verificationFlow,
    updateVerificationId,
    verifyTransaction,
    showModal,
  } = useStore();

  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedStep, setSelectedStep] = React.useState(null);

  useEffect(() => {
    // Reset verification state when component mounts
    updateVerificationId('');
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (verificationFlow.transactionId) {
      await verifyTransaction();
    }
  };

  const exampleTransactions = [
    { id: 'btc:abc123...def456', type: 'Lending', amount: '0.5 BTC' },
    { id: 'btc:ghi789...jkl012', type: 'Borrowing', amount: '0.25 BTC' },
    { id: 'btc:mno345...pqr678', type: 'Repayment', amount: '0.1 BTC' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <LoadingBar isLoading={verificationFlow.isVerifying} />
      
      {/* Page Header */}
      <PageHero
        title="Verify Transaction"
        description="Verify and track BitVMX lending protocol transactions on the blockchain"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Verify Transaction' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Verification Form */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Enter Transaction Details</h2>
          
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transaction ID
                <Tooltip content="The Bitcoin transaction hash or BitVMX protocol ID">
                  <span className="ml-1 text-gray-500 cursor-help">ⓘ</span>
                </Tooltip>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={verificationFlow.transactionId}
                  onChange={(e) => updateVerificationId(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bitcoin font-mono text-sm"
                  placeholder="Enter transaction hash or ID..."
                  required
                />
                <svg 
                  className="absolute right-4 top-3.5 w-5 h-5 text-gray-500"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                loading={verificationFlow.isVerifying}
                disabled={!verificationFlow.transactionId}
                fullWidth
              >
                Verify Transaction
              </Button>
              <Button
                variant="ghost"
                onClick={() => updateVerificationId('')}
                disabled={verificationFlow.isVerifying}
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Example Transactions */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Try these example transactions:</p>
            <div className="space-y-2">
              {exampleTransactions.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => updateVerificationId(tx.id)}
                  className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex justify-between items-center group"
                >
                  <div>
                    <span className="text-sm font-mono text-gray-300">{tx.id}</span>
                    <span className="ml-3 text-xs text-gray-500">{tx.type} • {tx.amount}</span>
                  </div>
                  <svg 
                    className="w-4 h-4 text-gray-500 group-hover:text-bitcoin transition-colors"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Verification Result */}
        {verificationFlow.result && (
          <div className="space-y-8 animate-slide-up">
            {/* Status Overview */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Verification Result</h2>
                <div className="flex items-center gap-2">
                  <NetworkBadge network="testnet" />
                  <StatusBadge status="verified" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <CircularProgress
                    value={verificationFlow.result.confirmations}
                    max={6}
                    variant="success"
                    size={120}
                    showValue={false}
                  />
                  <p className="mt-3 text-lg font-semibold text-white">
                    {verificationFlow.result.confirmations}/6 Confirmations
                  </p>
                  <p className="text-sm text-gray-400">Block #{verificationFlow.result.blockHeight}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Transaction ID</p>
                    <p className="font-mono text-sm text-white break-all">{verificationFlow.result.txId}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Type</p>
                      <p className="text-white font-medium capitalize">{verificationFlow.result.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="text-white font-medium">{verificationFlow.result.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge variant="success" dot>Confirmed</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="text-white">{verificationFlow.result.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Verification Steps Timeline */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Verification Process</h3>
              <TimelineStepIndicator
                events={verificationFlow.result.verificationSteps.map((step, index) => ({
                  title: step.step,
                  completed: step.status === 'completed',
                  active: index === verificationFlow.result.verificationSteps.length - 1,
                  icon: step.status === 'completed' ? '✓' : index + 1,
                  timestamp: 'Just now',
                  description: getStepDescription(step.step),
                  action: (
                    <Button
                      variant="link"
                      size="small"
                      onClick={() => {
                        setSelectedStep(step);
                        setShowDetails(true);
                      }}
                    >
                      View Details
                    </Button>
                  ),
                }))}
              />
            </Card>

            {/* Transaction Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Parties */}
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Transaction Parties</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Lender</p>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="font-mono text-sm text-gray-300 truncate mr-2">
                        {verificationFlow.result.parties.lender}
                      </span>
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => navigator.clipboard.writeText(verificationFlow.result.parties.lender)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Borrower</p>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="font-mono text-sm text-gray-300 truncate mr-2">
                        {verificationFlow.result.parties.borrower}
                      </span>
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => navigator.clipboard.writeText(verificationFlow.result.parties.borrower)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Loan Details */}
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Loan Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interest Rate</span>
                    <span className="text-white">{verificationFlow.result.details.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{verificationFlow.result.details.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collateral</span>
                    <span className="text-white font-mono">{verificationFlow.result.details.collateral}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Script Hash</span>
                      <span className="text-white font-mono text-sm">{verificationFlow.result.details.scriptHash}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Cryptographic Details */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Cryptographic Verification</h3>
                <Badge variant="tech" dot>BitVMX Protocol</Badge>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Witness Script</p>
                <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
                  {verificationFlow.result.details.witnessScript}
                </pre>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="ghost" size="small">
                  View on Explorer
                </Button>
                <Button variant="ghost" size="small">
                  Download Proof
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!verificationFlow.result && !verificationFlow.isVerifying && (
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Transaction Verified</h3>
            <p className="text-gray-400 mb-6">Enter a transaction ID above to verify its status and details</p>
            <Button
              variant="ghost"
              onClick={() => showModal('learnMore')}
            >
              Learn About Verification
            </Button>
          </Card>
        )}
      </div>

      {/* Details Modal */}
      <InfoModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Verification Step Details"
      >
        {selectedStep && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">{selectedStep.step}</h4>
              <p className="text-gray-400">{getStepDescription(selectedStep.step)}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm font-mono text-gray-300">
                This step verifies the cryptographic signatures and ensures the transaction 
                follows the BitVMX protocol rules.
              </p>
            </div>
          </div>
        )}
      </InfoModal>
    </div>
  );
};

function getStepDescription(step) {
  const descriptions = {
    'Transaction found': 'Located the transaction on the Bitcoin blockchain',
    'Script validation': 'Verified the BitVMX script structure and parameters',
    'Signature verification': 'Confirmed all required signatures are valid',
    'Collateral locked': 'Ensured collateral is properly locked in the contract',
  };
  return descriptions[step] || 'Verification step completed';
}

export default VerifyPage;