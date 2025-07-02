# BitVMX Lending Protocol - User Interface Content

## 1. Welcome/Home Page Content

### Hero Section
**Headline:** Unlock Bitcoin's True Potential with BitVMX Lending

**Subheadline:** Experience the future of Bitcoin lending - trustless, secure, and powered by zero-knowledge proofs on RSK

**Introduction:**
Welcome to a revolutionary lending protocol that brings the security of Bitcoin together with the programmability of smart contracts. Our platform leverages BitVMX technology to enable trustless Bitcoin lending without intermediaries, ensuring your assets remain secure while earning competitive yields.

### What is BitVMX?
BitVMX is a groundbreaking technology that enables complex computations to be verified on Bitcoin without changing the Bitcoin protocol. Think of it as a bridge that allows Bitcoin to "understand" smart contract logic through mathematical proofs, making advanced financial operations possible while maintaining Bitcoin's legendary security.

### What is RSK?
RSK (Rootstock) is Bitcoin's premier smart contract platform. It's a sidechain that enables Ethereum-like smart contracts while being secured by Bitcoin's mining network. When you use our protocol, you benefit from both Bitcoin's security and RSK's programmability.

### Call-to-Action Buttons
- **Primary CTA:** "Start Lending Bitcoin" 
- **Secondary CTA:** "Learn How It Works"
- **Tertiary CTA:** "View Active Loans"

## 2. Lender Journey Content

### Step-by-Step Guide

#### Step 1: Connect Your Wallet
**Title:** Connect Your Bitcoin Wallet
**Description:** Start by connecting your Bitcoin wallet. We support all major wallets that are compatible with RSK.
**Tooltip:** "Your wallet connection is secure and you maintain full control of your funds at all times."

#### Step 2: Choose Lending Amount
**Title:** Select Your Lending Amount
**Description:** Enter the amount of Bitcoin you want to lend. You can start with as little as 0.001 BTC.
**Tooltip:** "The minimum lending amount is 0.001 BTC. There's no maximum limit."

#### Step 3: Review Terms
**Title:** Review Loan Terms
**Description:** Check the interest rate, loan duration, and collateral details before proceeding.
**Tooltip:** "Interest rates are determined by market demand and the borrower's collateral ratio."

#### Step 4: Confirm Transaction
**Title:** Approve and Lend
**Description:** Confirm the transaction in your wallet to complete the lending process.
**Tooltip:** "This transaction will lock your Bitcoin in a smart contract until the loan term ends or is repaid."

### Success Messages
- **Loan Created:** "Success! Your Bitcoin is now earning interest. You can track your loan in the Dashboard."
- **Interest Claimed:** "Interest successfully claimed! The funds have been sent to your wallet."
- **Loan Repaid:** "Your loan has been fully repaid. Principal and interest are now available for withdrawal."

### Error Messages
- **Insufficient Balance:** "You don't have enough Bitcoin in your wallet. Please add funds and try again."
- **Transaction Failed:** "Transaction failed. Please check your wallet connection and try again."
- **Network Error:** "Unable to connect to the network. Please check your internet connection."

### Educational Popups

#### "How is my Bitcoin secured?"
Your Bitcoin is locked in a smart contract that uses BitVMX proofs to ensure only valid transactions can access the funds. The borrower must provide collateral worth more than the loan value, protecting you from default risk.

#### "What happens if the borrower defaults?"
If a borrower fails to repay, their collateral is automatically liquidated to repay your principal plus interest. The over-collateralization ensures you're protected even if asset prices fluctuate.

#### "How are interest rates calculated?"
Interest rates are dynamically set based on supply and demand. When more people want to borrow, rates increase. When more lenders join, rates decrease. You'll always see the current rate before lending.

## 3. Borrower Journey Content

### Clear Instructions for Borrowers

#### Getting Started
**Title:** Borrow Bitcoin with Confidence
**Description:** Access Bitcoin liquidity by using your crypto assets as collateral. Our protocol ensures transparent terms and automated execution.

#### Step 1: Provide Collateral
**Title:** Lock Your Collateral
**Description:** Deposit collateral worth at least 150% of your desired loan amount. We accept various cryptocurrencies as collateral.
**Tooltip:** "Higher collateral ratios result in better interest rates and lower liquidation risk."

#### Step 2: Receive Bitcoin
**Title:** Receive Your Loan
**Description:** Once your collateral is verified, Bitcoin is instantly sent to your wallet.
**Tooltip:** "Loan proceeds are sent directly to your connected wallet address."

#### Step 3: Manage Your Loan
**Title:** Monitor and Maintain
**Description:** Keep track of your collateral ratio and make sure it stays healthy to avoid liquidation.
**Tooltip:** "If your collateral value drops below 120%, you'll receive a warning. Below 110%, automatic liquidation occurs."

### Repayment Process Explanation

#### How to Repay
1. **Access Your Loan:** Go to your Dashboard and find your active loan
2. **Choose Repayment Amount:** Select partial or full repayment
3. **Confirm Transaction:** Approve the repayment in your wallet
4. **Retrieve Collateral:** Once fully repaid, your collateral is automatically unlocked

#### Early Repayment
You can repay your loan at any time without penalties. Interest is calculated only for the time you actually borrowed.

### Risk Warnings and Disclaimers

**Liquidation Risk Warning:**
⚠️ Your collateral may be liquidated if its value falls below the minimum threshold. Monitor your loan regularly and add collateral if needed to avoid liquidation.

**Market Risk Disclaimer:**
Cryptocurrency prices are volatile. The value of your collateral can change rapidly, affecting your loan's health. Always maintain a safe collateral ratio.

**Smart Contract Risk:**
While our contracts are audited and use BitVMX for enhanced security, smart contracts carry inherent risks. Never borrow more than you can afford to lose.

## 4. Verification Page Content

### BitVMX Proof Generation Explanation

#### What's Happening?
**Simple Explanation:** 
Think of BitVMX proof generation like getting a tamper-proof receipt for your transaction. The system is creating mathematical evidence that your loan terms are valid and enforceable on the Bitcoin network. This process ensures that all parties must honor the agreement - no trust required!

#### Why It Matters
This verification step is what makes our protocol truly trustless. The proofs guarantee that:
- Your funds can only be used according to the agreed terms
- Repayments will be automatically processed
- No one can change the rules after you've agreed to them

### Status Messages

#### Verification States

**Initiating Verification**
"Starting proof generation... This ensures your transaction is cryptographically secure."

**Generating Proof (0-25%)**
"Creating mathematical proof of your loan terms... This may take a moment."

**Generating Proof (25-50%)**
"Verifying collateral and constructing Bitcoin scripts... Almost halfway there!"

**Generating Proof (50-75%)**
"Finalizing proof parameters and running verification checks..."

**Generating Proof (75-99%)**
"Nearly complete! Performing final validation..."

**Verification Complete**
"✅ Verification successful! Your loan is now active and secured by BitVMX technology."

**Verification Failed**
"❌ Verification failed. Please try again. If the problem persists, contact support."

### What Users Should Expect

**Time Expectations:**
- Typical verification: 30 seconds to 2 minutes
- Complex loans: Up to 5 minutes
- Network congestion may cause delays

**What You'll See:**
1. A progress bar showing verification status
2. Real-time updates on what's being processed
3. A confirmation screen once complete
4. Transaction ID for your records

## 5. General UI Copy

### Button Labels

**Primary Actions:**
- "Lend Bitcoin"
- "Borrow Now"
- "Connect Wallet"
- "Claim Interest"
- "Repay Loan"
- "Add Collateral"
- "Withdraw Funds"

**Secondary Actions:**
- "View Details"
- "Transaction History"
- "Learn More"
- "Calculate Returns"
- "Export Data"

**Navigation:**
- "Dashboard"
- "My Loans"
- "Market"
- "Help"

### Form Field Descriptions

**Amount Fields:**
- Label: "Lending Amount (BTC)"
- Placeholder: "0.00"
- Helper: "Minimum: 0.001 BTC"

**Address Fields:**
- Label: "Withdrawal Address"
- Placeholder: "bc1q..."
- Helper: "Double-check this address - transactions cannot be reversed"

**Duration Fields:**
- Label: "Loan Duration"
- Placeholder: "Select duration"
- Helper: "Choose between 7, 14, 30, or 90 days"

### Loading States

**Transaction Processing:**
- "Processing your transaction..."
- "Waiting for network confirmation..."
- "Almost there! Finalizing your request..."

**Data Loading:**
- "Loading your loans..."
- "Fetching current market rates..."
- "Updating your dashboard..."

### Error Messages

**Connection Errors:**
- "Unable to connect to wallet. Please try again."
- "Network connection lost. Attempting to reconnect..."
- "Wallet not detected. Please install a compatible wallet."

**Validation Errors:**
- "Please enter a valid amount"
- "Amount exceeds your available balance"
- "Minimum loan duration is 7 days"
- "Invalid Bitcoin address format"

**Transaction Errors:**
- "Transaction rejected by wallet"
- "Insufficient gas fees. Please add funds to cover network fees."
- "Transaction timeout. Please try again."

**System Errors:**
- "Something went wrong. Please refresh and try again."
- "Service temporarily unavailable. We're working on it!"
- "Rate limit exceeded. Please wait a moment before trying again."

---

## Writing Guidelines

### Tone and Voice
- **Friendly and approachable:** Use "you" and "your" to speak directly to users
- **Educational:** Explain complex concepts simply without being condescending
- **Reassuring:** Acknowledge that DeFi can be intimidating and provide comfort
- **Action-oriented:** Use active voice and clear calls-to-action

### Key Principles
1. **Clarity over cleverness:** Simple, clear language beats technical jargon
2. **Progressive disclosure:** Don't overwhelm users - reveal complexity gradually
3. **Error prevention:** Guide users to success rather than just handling failures
4. **Transparency:** Always be honest about risks, fees, and wait times

### Accessibility
- Use plain language whenever possible
- Define technical terms when first introduced
- Provide context for numbers and percentages
- Include helpful tooltips and explanations