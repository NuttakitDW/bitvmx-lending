import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LenderPage from './pages/LenderPage';
import BorrowerPage from './pages/BorrowerPage';
import VerifyPage from './pages/VerifyPage';
import { NotificationContainer } from './components/ui/Notification';
import WalletConnectModal from './components/WalletConnectModal';
import Tutorial from './components/Tutorial';
import ErrorBoundary from './components/ErrorBoundary';
import useStore from './utils/store';
import useKeyboardNavigation from './hooks/useKeyboardNavigation';

function AppContent() {
  const { ui, hideModal, showModal } = useStore();
  
  // Enable keyboard navigation
  useKeyboardNavigation();
  
  // Show tutorial for first-time users
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setTimeout(() => {
        showModal('tutorial');
        localStorage.setItem('hasSeenTutorial', 'true');
      }, 1000);
    }
  }, [showModal]);
  
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lender" element={<LenderPage />} />
        <Route path="/borrower" element={<BorrowerPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
      
      {/* Global Components */}
      <NotificationContainer />
      <WalletConnectModal 
        isOpen={ui.modals.walletConnect} 
        onClose={() => hideModal('walletConnect')} 
      />
      <Tutorial
        isOpen={ui.modals.tutorial}
        onClose={() => hideModal('tutorial')}
      />
      
      {/* Keyboard Shortcuts Helper */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-600">
        Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">?</kbd> for help
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
