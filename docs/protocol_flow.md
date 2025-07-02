# Bitcoin Lending Protocol Flow with BitVMX and RSK

## Table of Contents
1. [Overview](#overview)
2. [Main User Flows](#main-user-flows)
   - [Lender Journey](#lender-journey)
   - [Borrower Journey](#borrower-journey)
   - [Verification Flow](#verification-flow)
3. [Detailed Step-by-Step Flows](#detailed-step-by-step-flows)
4. [User Stories and Edge Cases](#user-stories-and-edge-cases)
5. [Technical Terminology Glossary](#technical-terminology-glossary)

## Overview

This document outlines the complete end-to-end flow for a Bitcoin-based lending protocol that leverages BitVMX for trustless verification and RSK for smart contract functionality. The protocol enables Bitcoin holders to lend their BTC and earn interest while borrowers can access liquidity by providing collateral.

## Main User Flows

### Lender Journey

The lender's journey encompasses the complete lifecycle from initial BTC deposit to final withdrawal with interest.

**High-Level Flow:**
1. Lender locks BTC on Bitcoin mainnet
2. Proof of lock is generated and verified via BitVMX
3. Lending position is created on RSK smart contract
4. Lender waits for borrowers to match
5. Interest accrues during loan period
6. Lender withdraws principal + interest after loan completion

### Borrower Journey

The borrower's journey covers the process from loan application to repayment.

**High-Level Flow:**
1. Borrower discovers available lending positions on RSK
2. Borrower provides collateral (could be rBTC or other tokens)
3. Loan terms are accepted and funds are released
4. Borrower uses the borrowed funds
5. Borrower repays loan with interest before deadline
6. Collateral is released back to borrower

### Verification Flow

The verification flow ensures trustless operation between Bitcoin and RSK networks.

**High-Level Flow:**
1. User action on Bitcoin triggers proof generation
2. BitVMX circuit generates cryptographic proof
3. Proof is submitted to RSK smart contract
4. Contract verifies proof using BitVMX verifier
5. Upon successful verification, contract state is updated

## Detailed Step-by-Step Flows

### 1. Lender Locks BTC on Bitcoin Network

**Step 1.1: Preparation**
- Lender decides on lending amount and terms
- Lender generates a unique lending identifier
- Lender prepares Bitcoin transaction

**Step 1.2: Bitcoin Lock Transaction**
- Lender creates a special Bitcoin transaction with:
  - Time-locked output (for emergency recovery)
  - Commitment to RSK contract address
  - Lending terms encoded in OP_RETURN
- Transaction is broadcast to Bitcoin network
- Wait for required confirmations (typically 6 blocks)

**Step 1.3: Proof Generation**
- BitVMX observer monitors the Bitcoin transaction
- Once confirmed, BitVMX circuit generates proof of:
  - Transaction validity
  - Lock amount
  - Time-lock parameters
  - Lender's commitment

### 2. Smart Contract Deployment on RSK

**Step 2.1: Contract Initialization**
- Lending protocol smart contract is already deployed on RSK
- Contract maintains state for all active loans

**Step 2.2: Lending Position Creation**
- Lender calls `createLendingPosition()` with:
  - BitVMX proof of Bitcoin lock
  - Lending terms (interest rate, duration, etc.)
  - Minimum collateral ratio requirement
- Contract verifies the BitVMX proof
- New lending position is created and indexed

**Step 2.3: Position Activation**
- Lending position becomes visible to potential borrowers
- Position status: "Available for Borrowing"
- Event emitted for indexing services

### 3. Borrower Interaction and Collateral

**Step 3.1: Discovery**
- Borrower browses available lending positions
- Filters by:
  - Loan amount
  - Interest rate
  - Duration
  - Collateral requirements

**Step 3.2: Collateral Provision**
- Borrower selects desired lending position
- Calculates required collateral (e.g., 150% of loan value)
- Approves and transfers collateral to smart contract
- Collateral types supported:
  - rBTC (wrapped BTC on RSK)
  - Other approved ERC-20 tokens
  - NFTs (if protocol supports)

**Step 3.3: Loan Activation**
- Borrower calls `borrowFunds()` with position ID
- Contract verifies:
  - Sufficient collateral provided
  - Lending position is available
  - Terms are still valid
- Loan agreement is created
- Borrowed amount is transferred to borrower

### 4. Repayment Process

**Step 4.1: Interest Calculation**
- Interest accrues based on:
  - Annual Percentage Rate (APR) set by lender
  - Actual time borrowed
  - Compound or simple interest (protocol-defined)
- Formula: `Total Due = Principal + (Principal × Rate × Time)`

**Step 4.2: Repayment Execution**
- Borrower approves repayment amount
- Calls `repayLoan()` with loan ID
- Contract verifies full amount (principal + interest)
- Updates loan status to "Repaid"

**Step 4.3: Collateral Release**
- Upon successful repayment:
  - Collateral is unlocked
  - Borrower can withdraw collateral
  - Loan record is marked complete

### 5. BitVMX Proof Generation for Withdrawals

**Step 5.1: Withdrawal Initiation**
- Lender initiates withdrawal on RSK contract
- Contract calculates total amount (principal + earned interest)
- Withdrawal request is created with unique ID

**Step 5.2: Proof Requirements**
- BitVMX circuit requires proof of:
  - Original Bitcoin lock transaction
  - Successful loan completion on RSK
  - Lender's ownership
  - No double-spending attempts

**Step 5.3: Proof Generation Process**
- Off-chain BitVMX prover collects necessary data
- Generates zero-knowledge proof
- Proof size: typically 200-500 bytes
- Generation time: 10-30 seconds

### 6. Contract Verification of Proofs

**Step 6.1: Proof Submission**
- Generated proof is submitted to RSK contract
- Contract calls BitVMX verifier with:
  - Proof data
  - Public inputs (amounts, addresses)
  - Verification parameters

**Step 6.2: Verification Process**
- BitVMX verifier checks proof validity
- Ensures all constraints are satisfied
- Verification typically takes < 100ms
- Gas cost: approximately 500,000 gas

**Step 6.3: State Update**
- Upon successful verification:
  - Withdrawal is approved
  - Bitcoin unlock transaction can be created
  - Lender receives unlock signature/script

## User Stories and Edge Cases

### What Happens if Borrower Defaults?

**Default Scenario:**
1. Loan duration expires without repayment
2. Grace period activated (e.g., 24 hours)
3. If still no repayment after grace period:
   - Loan marked as "Defaulted"
   - Collateral becomes claimable by lender
   - Lender can liquidate collateral to recover funds

**Liquidation Process:**
1. Lender calls `liquidateCollateral()`
2. If collateral value > loan + interest:
   - Lender receives loan + interest worth
   - Excess returned to borrower
3. If collateral value < loan + interest:
   - Lender receives all collateral
   - Loss is recorded

### How Are Interest Rates Calculated?

**Fixed Rate Model:**
- Lender sets fixed APR when creating position
- Interest = Principal × (APR/365) × Days
- No changes during loan period

**Variable Rate Model (Advanced):**
- Base rate + utilization-based premium
- Formula: `Rate = BaseRate + (Utilization × Multiplier)`
- Updates periodically based on market conditions

**Example Calculation:**
- Loan: 1 BTC
- APR: 10%
- Duration: 30 days
- Interest: 1 × (0.10/365) × 30 = 0.00822 BTC

### What if Proof Verification Fails?

**Failure Scenarios:**

1. **Invalid Proof Data:**
   - Transaction reverts immediately
   - No state changes occur
   - User must regenerate proof

2. **Timeout Issues:**
   - Proof has validity period (e.g., 1 hour)
   - Expired proofs are rejected
   - New proof generation required

3. **Network Synchronization:**
   - BitVMX requires Bitcoin data to be synchronized
   - If data is outdated, verification fails
   - Wait for synchronization and retry

**Recovery Mechanisms:**
- Emergency withdrawal via time-lock
- Dispute resolution process
- Manual intervention by protocol governance

### Timeout Scenarios

**Lending Position Timeout:**
- Unmatched positions expire after set period
- Lender can cancel and withdraw
- No penalties for cancellation

**Loan Duration Timeout:**
- Borrower has until deadline + grace period
- After timeout, liquidation becomes available
- Automated liquidation bots may act

**Proof Generation Timeout:**
- If BitVMX prover is unresponsive
- Fallback to emergency withdrawal path
- Time-locked funds become spendable

## Technical Terminology Glossary

### BitVMX
**Definition:** A system that enables verification of arbitrary computations on Bitcoin without changing Bitcoin's consensus rules.

**Key Concepts:**
- **Zero-Knowledge Proofs:** Cryptographic proofs that verify statements without revealing underlying data
- **Verifier Contract:** Smart contract component that validates BitVMX proofs
- **Prover:** Off-chain service that generates cryptographic proofs

### RSK (Rootstock)
**Definition:** A Bitcoin sidechain that enables smart contract functionality while maintaining Bitcoin's security through merge-mining.

**Key Concepts:**
- **rBTC:** RSK's native currency, pegged 1:1 with Bitcoin
- **Merge-Mining:** Process where Bitcoin miners simultaneously mine RSK blocks
- **2-Way Peg:** Mechanism to transfer BTC between Bitcoin and RSK networks

### Collateral
**Definition:** Assets locked by borrower to secure a loan, protecting lender from default risk.

**Types:**
- **Over-collateralization:** Collateral value exceeds loan value (e.g., 150%)
- **Under-collateralization:** Collateral value less than loan (requires additional guarantees)
- **Cross-chain Collateral:** Assets from different blockchains used as security

### Time-Lock
**Definition:** Bitcoin script condition that prevents spending until a specific time or block height.

**Usage:**
- **Absolute Time-Lock:** Specific block height or timestamp
- **Relative Time-Lock:** Time relative to transaction confirmation
- **Emergency Recovery:** Allows fund recovery if protocol fails

### Liquidation
**Definition:** Process of selling collateral to recover funds when borrower fails to repay.

**Methods:**
- **Instant Liquidation:** Immediate sale at market price
- **Auction Liquidation:** Collateral auctioned to highest bidder
- **Partial Liquidation:** Only enough collateral sold to cover debt

### Smart Contract
**Definition:** Self-executing code on blockchain that automatically enforces agreement terms.

**Components:**
- **State Variables:** Store loan positions, balances, etc.
- **Functions:** Executable operations (borrow, repay, liquidate)
- **Events:** Logged occurrences for off-chain monitoring

### Proof of Lock
**Definition:** Cryptographic evidence that Bitcoin has been locked in a specific manner on the Bitcoin blockchain.

**Elements:**
- **Transaction ID:** Unique identifier of lock transaction
- **Output Script:** Locking conditions
- **Merkle Proof:** Proof of inclusion in Bitcoin block
- **Block Headers:** Chain of headers proving transaction depth

---

This document serves as the authoritative reference for understanding the Bitcoin lending protocol's operation. It should be updated as the protocol evolves and new features are added.