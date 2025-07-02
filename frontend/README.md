# BitVMX Lending Protocol - Mock Frontend

A fully interactive mock frontend for the BitVMX Bitcoin lending protocol, built with React and Tailwind CSS. This educational demo showcases the complete user flow for lending and borrowing Bitcoin using BitVMX and RSK smart contracts.

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📱 Features

### For Lenders
- Create lending offers with custom terms
- Lock BTC and deploy smart contracts (simulated)
- Track active loans and earnings
- Withdraw funds with BitVMX proofs

### For Borrowers
- Browse available lending offers
- Calculate collateral requirements
- Submit borrow requests
- Repay loans with interest

### Educational Elements
- Interactive tutorials for first-time users
- Tooltips explaining technical concepts
- Step-by-step flow indicators
- Example calculations and simulations

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── pages/          # Main application pages
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # Design system components
│   │   └── layout/    # Layout components
│   ├── utils/         # Utilities and state management
│   └── styles/        # Global styles
├── public/            # Static assets
└── package.json       # Dependencies
```

## 🎨 Design System

The app uses a custom design system with:
- **Colors**: Bitcoin orange (#F7931A) as primary accent
- **Typography**: Inter for UI, JetBrains Mono for code
- **Components**: Cards, buttons, modals, progress bars, badges
- **Animations**: Smooth transitions and hover effects

## 🔧 Development

### State Management
We use Zustand for global state management. The store is located at `/src/utils/store.js`.

### Mock Data
All blockchain interactions are simulated. Mock data includes:
- Sample lending offers
- Transaction hashes
- Verification proofs
- Interest calculations

### Keyboard Shortcuts
- `Ctrl/Cmd + H` - Home
- `Ctrl/Cmd + L` - Lender page
- `Ctrl/Cmd + B` - Borrower page
- `Ctrl/Cmd + V` - Verify page
- `?` - Show help

## 📚 Educational Mode

The app includes several educational features:
1. **Tutorials**: First-time user guidance
2. **Learn More**: Detailed explanations in modals
3. **Tooltips**: Hover over technical terms
4. **Examples**: Pre-filled forms with sample data

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 🚢 Building for Production

```bash
# Create production build
npm run build

# Serve production build locally
npm install -g serve
serve -s build
```

## 🤝 Contributing

This is a mock frontend for educational purposes. Contributions that enhance the learning experience are welcome!

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Related Documentation

- [Protocol Flow](/docs/protocol_flow.md) - Technical details of the lending protocol
- [User Content](/docs/user_content.md) - All UI copy and content
- [Design System](/docs/design_system.md) - Complete design guidelines