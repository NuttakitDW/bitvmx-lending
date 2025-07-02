# BitVMX Lending Protocol

An educational demonstration of a Bitcoin-based lending protocol using BitVMX and RSK smart contracts. This project includes a fully interactive mock frontend that visualizes the complete user flow for lending and borrowing Bitcoin.

## 🎯 Project Overview

This project demonstrates how BitVMX can enable trustless Bitcoin lending by:
- Allowing lenders to lock BTC on the Bitcoin network
- Deploying smart contracts on RSK for loan management
- Using BitVMX proofs for secure withdrawals
- Enabling borrowers to access Bitcoin liquidity

## 📁 Project Structure

```
bitvmx-lending/
├── frontend/          # React + Tailwind CSS mock frontend
├── docs/             # Documentation and design specifications
│   ├── protocol_flow.md    # End-to-end protocol flow
│   ├── user_content.md     # UI copy and content
│   └── design_system.md    # Design guidelines
└── AGENTS.md         # Multi-agent development plan
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd bitvmx-lending

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Architecture

### Frontend (Mock)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Routing**: React Router

### Key Features
1. **Lender Flow**: Create offers, lock BTC, track loans
2. **Borrower Flow**: Browse offers, submit requests, repay
3. **Verification**: BitVMX proof simulation
4. **Educational**: Tutorials, tooltips, and guides

## 📚 Documentation

- **[Protocol Flow](docs/protocol_flow.md)**: Technical details of the lending protocol
- **[User Content](docs/user_content.md)**: All UI copy and user-facing content
- **[Design System](docs/design_system.md)**: Visual design guidelines and components
- **[Frontend README](frontend/README.md)**: Frontend-specific documentation

## 🎓 Educational Purpose

This is a **mock implementation** designed for educational purposes. It demonstrates:
- How BitVMX enables Bitcoin programmability
- Smart contract interactions on RSK
- User experience design for DeFi protocols
- Security considerations in lending protocols

**Note**: This is not a production-ready implementation. All blockchain interactions are simulated.

## 🛠️ Development

### Multi-Agent Approach
This project was developed using a multi-agent approach as outlined in [AGENTS.md](AGENTS.md):
- **Researcher Agent**: Protocol flow definition
- **Docs Agent**: User content creation
- **Designer Agent**: Visual design system
- **Dev Agent**: Frontend implementation

## 🤝 Contributing

Contributions that enhance the educational value of this project are welcome! Please focus on:
- Improving explanations and tutorials
- Adding more educational features
- Enhancing the user experience
- Fixing bugs or improving performance

## 📄 License

MIT License - This is an open educational resource.

## 🔗 Resources

- [BitVMX Documentation](https://bitvmx.org)
- [RSK Documentation](https://developers.rsk.co)
- [Bitcoin Developer Guide](https://developer.bitcoin.org)

## ⚠️ Disclaimer

This is a mock educational project. It does not interact with real Bitcoin or RSK networks. Do not use this code for production applications without proper security audits and real blockchain integration.