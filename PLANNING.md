# BitVMX Lending MVP - Implementation Plan

## 🎯 Objective
Build the simplest possible proof-of-concept that demonstrates non-custodial BTC lending is feasible using BitVMX.

## ⚠️ Current BitVMX Status
**Important**: BitVMX is still experimental. This MVP assumes:
- BitVMX can verify simple computational proofs offchain
- We can create Bitcoin scripts that unlock based on BitVMX verification
- The actual BitVMX integration may need to be simulated for now

## 🏗️ Tech Stack

### Core Components
- **Bitcoin**: Testnet for BTC locking
- **RSK**: Testnet for smart contracts
- **BitVMX**: For trustless verification (may need simulation)
- **Foundry**: Smart contract development
- **Rust**: Proof generation

### Infrastructure Required
1. **Bitcoin Testnet Node** or API access
2. **RSK Testnet Node** or public RPC
3. **Local Development**:
   - Foundry for contracts
   - Rust toolchain
   - Bitcoin wallet/tools

## 👥 User Flow

### 1. Lender Flow
```
Lender → Locks BTC → Waits for repayment → Claims BTC + interest
```

### 2. Borrower Flow  
```
Borrower → Receives MockUSD → Repays MockUSD → Generates proof → Unlocks BTC
```

## 📋 Implementation Steps

### Phase 1: Smart Contracts (2-3 days)
1. **MockUSD.sol** - Simple ERC20 for testing
2. **LoanManager.sol** - Core lending logic
   - Track loans
   - Mint/burn MockUSD
   - Verify proofs (mock for now)

### Phase 2: Bitcoin Scripts (2-3 days)
1. Create lock script with conditions:
   - Timelock for lender (fallback)
   - BitVMX unlock path for borrower
2. Test on Bitcoin testnet

### Phase 3: Proof System (3-4 days)
1. Define proof structure in Rust
2. Mock BitVMX verification (until real integration possible)
3. Generate proofs for repayment

### Phase 4: Integration (2-3 days)
1. Connect all components
2. Create simple CLI tools
3. Test full flow

## 🚧 Current Limitations

### BitVMX Readiness
- **Challenge**: BitVMX is not production-ready
- **Solution**: Mock the verification for POC, design for future integration

### Bitcoin Script Complexity
- **Challenge**: Complex scripts for BitVMX verification
- **Solution**: Use simplified version with basic conditions

### Cross-chain Communication
- **Challenge**: No direct BTC ↔ RSK communication
- **Solution**: Manual proof submission for MVP

## 🔄 Simplified Architecture

```
Bitcoin Testnet          RSK Testnet
     |                        |
[Lock Script]          [LoanManager.sol]
     |                        |
     └──── BitVMX Proof ──────┘
         (offchain verify)
```

## ✅ MVP Success Criteria

1. Lender can lock BTC with conditions
2. Borrower receives MockUSD on RSK
3. Repayment generates valid proof
4. Proof unlocks BTC for borrower
5. Timeout returns BTC to lender

## 🤔 Is This Possible Now?

**Yes, but with caveats:**
- Full BitVMX integration: **Not yet** (still in development)
- Proof-of-concept with mocked verification: **Yes**
- Demonstrates the flow and architecture: **Yes**
- Production-ready: **No**

## 📅 Timeline
- **Total estimate**: 10-12 days for basic MVP
- **With BitVMX mocking**: Can start immediately
- **Full BitVMX integration**: Wait for BitVMX maturity

## 🎬 Next Steps
1. Set up development environment
2. Create MockUSD contract
3. Build basic LoanManager
4. Design Bitcoin lock script
5. Implement mock proof system