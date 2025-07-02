# 🧠 Executive Order: Claude Multi-Agent Flow for Lending Protocol UX Mock

## 🎯 Mission

Design and develop a **100% mock frontend** that visualizes the **end-to-end user flow** of a **Bitcoin-based lending protocol** using BitVMX and RSK.  
The experience should resemble an **immersive, educational website**, guiding users step-by-step through the protocol with clean UI and popups/tooltips.

---

## 🧩 Agents & Responsibilities

### 1. 📄 Docs Agent
**Goal:** Write user-facing content to explain the lending flow in simple, engaging terms.

- Provide **step-by-step walkthroughs** for both lender and borrower.
- Write tooltip/popup content for UI elements (e.g., "This is where the lender locks BTC").
- Summarize BitVMX and RSK in layman's terms.

### 2. 🧠 Researcher Agent
**Goal:** Structure the logical flow of the protocol and ensure technical accuracy.

- Define the **end-to-end flow**:
  - Lender locks BTC on Bitcoin
  - Contract deployed on RSK
  - Borrower repays
  - BitVMX proof generation
  - Proof submission to contract
- Create user stories and edge cases.
- Advise on terminology and educational framing.

### 3. 🧬 Designer Agent
**Goal:** Create a visually clean, modern, and engaging mock design system.

- Use wireframes or components to show:
  - Loan creation form
  - BTC locking visualization
  - Proof verification status
  - Borrower repayment flow
- Create popup/tooltips placement plan.
- Suggest color palette and font system for futuristic/technical feel.

### 4. 💻 Dev Agent
**Goal:** Produce a working **mock frontend** (e.g., React + Tailwind) that shows the flow without real backend.

- Scaffold `pages/`:
  - `/` - Home/Intro
  - `/lender` - Lender journey
  - `/borrower` - Borrower journey
  - `/verify` - BitVMX simulation
- Implement buttons/forms that **don’t require backend**, just simulate state transitions.
- Integrate popups/tooltips written by Docs agent.

---

## 🔄 Agent Workflow

```
[Researcher] → [Docs] → [Designer] → [Dev]
```

- Researcher defines flow.
- Docs writes descriptions per step.
- Designer plans visuals around docs content.
- Dev brings it all together in a frontend mock with interactivity.

---

## 💡 End Result

A **clickable education-first UI demo** that lets users explore:
- How BTC is locked on Bitcoin
- How smart contracts on RSK listen to proof
- How BitVMX verifies claims off-chain
- How borrowers redeem collateral

All **visually simulated**, no backend or wallet integration required.

---

## 🛠 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Mock State Mgmt**: Zustand or useState
- **Design Tool (optional)**: Figma / Gamma.app
- **Popups**: React-tooltip or custom modal

---

## 🧭 Guiding Principles

- 📚 **Educational** — Explain everything clearly.
- 🎮 **Interactive** — Let users "walk through" the flow.
- 🚫 **No backend** — Everything mocked, simulate all actions.
- ✨ **Modern** — Clean UI with slight motion and highlight effects.

---

## 📦 Output Deliverables

1. `/frontend` folder with React + Tailwind mock implementation.
2. `/docs/user_flow.md` with tooltip texts and step guides.
3. `/design/wireframes.png` (or JSX layout mock).
4. README that shows how to run the demo locally.

---

## 🧭 Next Step

> Deploy these agents and assign their tasks. Start with the Researcher to map the complete end-to-end flow of a lending operation using BitVMX and RSK.
