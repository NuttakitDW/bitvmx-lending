# 🟧 BitVMX Lending Protocol MVP

This is a minimal proof-of-concept demonstrating how to build a non-custodial BTC-backed lending protocol using [BitVMX](https://github.com/BitVM/BitVM) and [Rootstock (RSK)](https://www.rsk.co/).

## 🎯 Goal

Allow a **lender** to lock BTC on Bitcoin testnet and a **borrower** to redeem it using an offchain-verifiable **BitVMX proof** triggered through an onchain contract on RSK.

---

## 📦 Project Structure

```
bitvmx-lending-mvp/
├── contracts/               # RSK smart contracts
│   └── LoanManager.sol
├── bitvmx/                  # BitVMX challenge logic
│   └── vm.c
│   └── challenge.json
├── btc/                     # Bitcoin lock/redeem scripts
│   └── lock_btc.sh
│   └── redeem_btc.sh
├── prover/                  # Offchain proof generation
│   └── generate_proof.py
├── frontend/ (optional)     # Simple UI to simulate proof submission
├── .env.example
├── README.md
└── CLAUDE.md
```

---

## 🧪 How It Works

1. **Lender** locks BTC using a Taproot/P2SH script on Bitcoin Testnet.
2. **LoanManager.sol** on RSK tracks the loan and awaits a valid proof.
3. **Borrower** repays in RBTC and generates a BitVMX proof of repayment.
4. Offchain BitVMX logic verifies the claim and submits a result to the RSK contract.
5. RSK contract updates state and allows BTC redemption if the proof is valid.

---

## 🚀 Quickstart

### 1. Clone & Install

```bash
git clone https://github.com/yourname/bitvmx-lending-mvp.git
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
truffle migrate --network rskTestnet
```

### 5. Generate Proof

```bash
cd prover
python generate_proof.py > proof.json
```

### 6. Submit Proof to RSK

```bash
node submit_proof.js --loanId 1 --proof proof.json
```

---

## 📚 Dependencies

* Node.js + web3
* Truffle (for contract deployment)
* Python (for proof script)
* Bitcoin Core or Libbitcoin (for BTC ops)
* BitVMX C runtime (for custom logic)

---

## ⚠️ Disclaimer

This is an educational MVP — **not secure or production-ready**. It demonstrates how BitVMX enables conditional BTC flows using offchain verification and EVM-compatible onchain enforcement.

---

## 🙌 Credits

* BitVMX by @supertestnet
* RSK for Bitcoin-EVM bridging