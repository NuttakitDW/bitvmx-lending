import { create } from 'zustand';

// Mock data generators
const generateMockLendingOffers = () => [
  {
    id: '1',
    lender: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: 0.5,
    interestRate: 5.0,
    duration: 30,
    minCollateral: 150,
    maxLoanToValue: 66.67,
    status: 'active',
    createdAt: '2 hours ago',
    remainingAmount: 0.5,
    description: 'Competitive rates for quality borrowers',
    requirements: ['Min 150% collateral', 'Verified identity', 'Good repayment history'],
  },
  {
    id: '2',
    lender: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    amount: 1.0,
    interestRate: 4.5,
    duration: 60,
    minCollateral: 140,
    maxLoanToValue: 71.43,
    status: 'active',
    createdAt: '5 hours ago',
    remainingAmount: 0.75,
    description: 'Long-term loans with flexible terms',
    requirements: ['Min 140% collateral', 'KYC required'],
  },
  {
    id: '3',
    lender: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    amount: 0.25,
    interestRate: 6.0,
    duration: 14,
    minCollateral: 160,
    maxLoanToValue: 62.5,
    status: 'active',
    createdAt: '1 day ago',
    remainingAmount: 0.25,
    description: 'Short-term flash loans',
    requirements: ['Min 160% collateral', 'Instant approval'],
  },
];

const generateMockLoans = () => [
  {
    id: 'loan-1',
    borrower: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    lender: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: 0.1,
    interestRate: 5.0,
    duration: 30,
    collateral: 0.15,
    status: 'active',
    startDate: '2024-01-15',
    dueDate: '2024-02-14',
    remainingDays: 12,
    interestAccrued: 0.002,
    totalDue: 0.102,
  },
];

const useStore = create((set, get) => ({
  // Wallet state
  wallet: {
    connected: false,
    address: null,
    balance: null,
    network: 'testnet',
  },
  
  // Flow states
  lenderFlow: {
    currentStep: 0,
    formData: {
      amount: '',
      interestRate: '',
      duration: '',
      minCollateral: '150',
      requirements: [],
    },
    isCreating: false,
    error: null,
  },
  
  borrowerFlow: {
    currentStep: 0,
    selectedOffer: null,
    formData: {
      borrowAmount: '',
      collateralAmount: '',
      duration: '',
    },
    isSubmitting: false,
    error: null,
  },
  
  verificationFlow: {
    transactionId: '',
    isVerifying: false,
    result: null,
    error: null,
  },
  
  // Data
  lendingOffers: generateMockLendingOffers(),
  activeLoans: generateMockLoans(),
  activeBorrows: [],
  transactions: [],
  
  // UI State
  ui: {
    isLoading: false,
    notifications: [],
    modals: {
      walletConnect: false,
      confirmAction: false,
      learnMore: false,
      tutorial: false,
    },
    tooltips: {},
  },
  
  // Actions - Wallet
  connectWallet: (address) => set((state) => ({
    wallet: {
      ...state.wallet,
      connected: true,
      address,
      balance: 1.5, // Mock balance
    },
    ui: {
      ...state.ui,
      notifications: [...state.ui.notifications, {
        id: Date.now(),
        type: 'success',
        message: 'Wallet connected successfully',
        timestamp: new Date(),
      }],
    },
  })),
  
  disconnectWallet: () => set((state) => ({
    wallet: {
      connected: false,
      address: null,
      balance: null,
      network: 'testnet',
    },
    ui: {
      ...state.ui,
      notifications: [...state.ui.notifications, {
        id: Date.now(),
        type: 'info',
        message: 'Wallet disconnected',
        timestamp: new Date(),
      }],
    },
  })),
  
  // Actions - Lender Flow
  updateLenderStep: (step) => set((state) => ({
    lenderFlow: { ...state.lenderFlow, currentStep: step },
  })),
  
  updateLenderFormData: (data) => set((state) => ({
    lenderFlow: { ...state.lenderFlow, formData: { ...state.lenderFlow.formData, ...data } },
  })),
  
  createLendingOffer: async () => {
    set((state) => ({ lenderFlow: { ...state.lenderFlow, isCreating: true, error: null } }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { lenderFlow, wallet } = get();
    const newOffer = {
      id: Date.now().toString(),
      lender: wallet.address,
      amount: parseFloat(lenderFlow.formData.amount),
      interestRate: parseFloat(lenderFlow.formData.interestRate),
      duration: parseInt(lenderFlow.formData.duration),
      minCollateral: parseInt(lenderFlow.formData.minCollateral),
      maxLoanToValue: 100 / (parseInt(lenderFlow.formData.minCollateral) / 100),
      status: 'active',
      createdAt: 'Just now',
      remainingAmount: parseFloat(lenderFlow.formData.amount),
      description: 'New lending offer',
      requirements: lenderFlow.formData.requirements,
    };
    
    set((state) => ({
      lendingOffers: [newOffer, ...state.lendingOffers],
      lenderFlow: {
        ...state.lenderFlow,
        isCreating: false,
        currentStep: state.lenderFlow.currentStep + 1,
      },
      ui: {
        ...state.ui,
        notifications: [...state.ui.notifications, {
          id: Date.now(),
          type: 'success',
          message: 'Lending offer created successfully!',
          timestamp: new Date(),
        }],
      },
    }));
  },
  
  // Actions - Borrower Flow
  updateBorrowerStep: (step) => set((state) => ({
    borrowerFlow: { ...state.borrowerFlow, currentStep: step },
  })),
  
  selectLendingOffer: (offer) => set((state) => ({
    borrowerFlow: { ...state.borrowerFlow, selectedOffer: offer },
  })),
  
  updateBorrowerFormData: (data) => set((state) => ({
    borrowerFlow: { ...state.borrowerFlow, formData: { ...state.borrowerFlow.formData, ...data } },
  })),
  
  submitBorrowRequest: async () => {
    set((state) => ({ borrowerFlow: { ...state.borrowerFlow, isSubmitting: true, error: null } }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { borrowerFlow, wallet } = get();
    const newBorrow = {
      id: Date.now().toString(),
      borrower: wallet.address,
      lender: borrowerFlow.selectedOffer.lender,
      amount: parseFloat(borrowerFlow.formData.borrowAmount),
      interestRate: borrowerFlow.selectedOffer.interestRate,
      duration: borrowerFlow.selectedOffer.duration,
      collateral: parseFloat(borrowerFlow.formData.collateralAmount),
      status: 'pending',
      createdAt: new Date(),
    };
    
    set((state) => ({
      activeBorrows: [...state.activeBorrows, newBorrow],
      borrowerFlow: {
        ...state.borrowerFlow,
        isSubmitting: false,
        currentStep: state.borrowerFlow.currentStep + 1,
      },
      ui: {
        ...state.ui,
        notifications: [...state.ui.notifications, {
          id: Date.now(),
          type: 'success',
          message: 'Borrow request submitted successfully!',
          timestamp: new Date(),
        }],
      },
    }));
  },
  
  // Actions - Verification
  updateVerificationId: (id) => set((state) => ({
    verificationFlow: { ...state.verificationFlow, transactionId: id },
  })),
  
  verifyTransaction: async () => {
    set((state) => ({ verificationFlow: { ...state.verificationFlow, isVerifying: true, error: null } }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { verificationFlow } = get();
    const mockResult = {
      txId: verificationFlow.transactionId,
      status: 'confirmed',
      type: 'lending',
      amount: '0.5 BTC',
      date: new Date().toLocaleDateString(),
      blockHeight: 823456,
      confirmations: 6,
      parties: {
        lender: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        borrower: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      },
      details: {
        interestRate: '5.0%',
        duration: '30 days',
        collateral: '0.75 BTC',
        scriptHash: '0x1234...5678',
        witnessScript: 'OP_IF OP_2 ...',
      },
      verificationSteps: [
        { step: 'Transaction found', status: 'completed' },
        { step: 'Script validation', status: 'completed' },
        { step: 'Signature verification', status: 'completed' },
        { step: 'Collateral locked', status: 'completed' },
      ],
    };
    
    set((state) => ({
      verificationFlow: {
        ...state.verificationFlow,
        isVerifying: false,
        result: mockResult,
      },
    }));
  },
  
  // Actions - UI
  setLoading: (isLoading) => set((state) => ({
    ui: { ...state.ui, isLoading },
  })),
  
  showModal: (modalName) => set((state) => ({
    ui: {
      ...state.ui,
      modals: { ...state.ui.modals, [modalName]: true },
    },
  })),
  
  hideModal: (modalName) => set((state) => ({
    ui: {
      ...state.ui,
      modals: { ...state.ui.modals, [modalName]: false },
    },
  })),
  
  addNotification: (notification) => set((state) => ({
    ui: {
      ...state.ui,
      notifications: [...state.ui.notifications, {
        id: Date.now(),
        timestamp: new Date(),
        ...notification,
      }],
    },
  })),
  
  removeNotification: (id) => set((state) => ({
    ui: {
      ...state.ui,
      notifications: state.ui.notifications.filter(n => n.id !== id),
    },
  })),
  
  // Reset functions
  resetLenderFlow: () => set((state) => ({
    lenderFlow: {
      currentStep: 0,
      formData: {
        amount: '',
        interestRate: '',
        duration: '',
        minCollateral: '150',
        requirements: [],
      },
      isCreating: false,
      error: null,
    },
  })),
  
  resetBorrowerFlow: () => set((state) => ({
    borrowerFlow: {
      currentStep: 0,
      selectedOffer: null,
      formData: {
        borrowAmount: '',
        collateralAmount: '',
        duration: '',
      },
      isSubmitting: false,
      error: null,
    },
  })),
}));

export default useStore;