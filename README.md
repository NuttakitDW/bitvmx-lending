# 🟧 BitVMX Lending Protocol MVP

A minimal proof-of-concept showing that **non-custodial BTC lending is possible** using BitVMX and Rootstock.

## 🎯 Goal

Demonstrate the simplest possible flow:
1. **Lender** locks BTC on Bitcoin (non-custodial)
2. **Borrower** can unlock it by repaying on RSK
3. **BitVMX** ensures trustless execution

---

## 📦 Project Structure

```
bitvmx-lending-mvp/
├── contracts/               # RSK smart contracts
│   ├── LoanManager.sol
│   └── MockUSD.sol          # Simple ERC20 stablecoin for POC
├── bitvmx/                  # BitVMX challenge logic
│   └── vm.c
│   └── challenge.json
├── btc/                     # Bitcoin lock/redeem scripts
│   └── lock_btc.sh
│   └── redeem_btc.sh
├── prover/                  # Offchain proof generation
│   └── Cargo.toml
│   └── src/
│       └── main.rs
├── frontend/ (optional)     # Simple UI to simulate proof submission
├── .env.example
├── README.md
└── CLAUDE.md
```

---

## 🧪 Minimal Flow

1. **Lock**: Lender locks BTC with BitVMX script
2. **Mint & Borrow**: Contract mints MockUSD stablecoin to borrower
3. **Repay**: Borrower repays MockUSD + interest + generates proof
4. **Unlock**: Valid proof allows lender to redeem BTC + burns MockUSD

---

## 🚀 Quickstart

### 1. Clone & Install

```bash
git clone https://github.com/NuttakitDW/bitvmx-lending.git
cd bitvmx-lending-mvp
```

### 2. Set up Environment

Copy and edit environment config:

```bash
cp .env.example .env
```

### 3. Lock BTC

```bash
./btc/lock_btc.sh <borrower_pubkey>
```

### 4. Deploy Smart Contract to RSK Testnet

```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url $RSK_TESTNET_RPC --broadcast
```

### 5. Generate Proof

```bash
cd prover
cargo run -- > proof.json
```

### 6. Submit Proof to RSK

```bash
node submit_proof.js --loanId 1 --proof proof.json
```

---

## 📚 Dependencies

* Node.js + web3
* Foundry (for contract deployment)
* Rust + Cargo (for proof generation)
* Bitcoin Core or Libbitcoin (for BTC ops)
* BitVMX C runtime (for custom logic)

---

## ⚠️ Disclaimer

**Minimal MVP only** — demonstrates that non-custodial BTC lending is technically possible. Not production-ready.

---

## 🙌 Credits

* BitVMX by @supertestnet
* RSK for Bitcoin-EVM bridging