import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../utils/store';

const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const { showModal, hideModal, ui } = useStore();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't handle if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Global keyboard shortcuts
      switch (e.key) {
        case 'h':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            navigate('/');
          }
          break;
        
        case 'l':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            navigate('/lender');
          }
          break;
        
        case 'b':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            navigate('/borrower');
          }
          break;
        
        case 'v':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            navigate('/verify');
          }
          break;
        
        case 'w':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            showModal('walletConnect');
          }
          break;
        
        case '?':
          if (e.shiftKey) {
            e.preventDefault();
            showModal('tutorial');
          }
          break;
        
        case 'Escape':
          // Close any open modals
          Object.keys(ui.modals).forEach(modalName => {
            if (ui.modals[modalName]) {
              hideModal(modalName);
            }
          });
          break;
        
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, showModal, hideModal, ui.modals]);
};

export default useKeyboardNavigation;