# ArthaVault | Financial Advisory Platform & Funnel

[![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Visualizations-Recharts-10b981)](https://recharts.org/)
[![SEBI Compliant](https://img.shields.io/badge/SEBI%20RIA-INA000018921-emerald)](https://sebi.gov.in)

Minimalist lead-generation portal and mathematical authority engine featuring 5 un-gated interactive financial calculators, direct bank-integrated paid consultation bookings via dynamic UPI QR, and future model-portfolio SaaS bridging.

---

## 1. Strategic Conversion Funnel

The platform operates as an **un-gated mathematical authority engine** designed to funnel qualified Indian investors toward a paid 30-minute private consultation:

```
[ STEP 1: ACQUISITION ]
Landing / Authority Hub (Home Page A)
Value proposition, SEBI credentials, and fee-only fiduciary proof.
          │
          ▼
[ STEP 2: VALUE & PROOF ]
5 Tabbed Financial Calculators (Page B)
Un-gated client-side engines: SIP vs. Lumpsum, Retirement, Annuity, Goal, NPV.
          │
          ▼
[ STEP 3: CONVERSION ]
30-Min Paid Booking Pipeline (Modal)
Integrated calendar slot reservation + Dynamic UPI Bank QR + UTR verification + Automated Google Meet.
          │
          ▼
[ STEP 4: EXECUTION ]
Partner Model SaaS (Future Phase Alignment)
Direct mutual fund execution, rebalancing, and model portfolio delivery without distributor cuts.
```

---

## 2. Technical Stack & Implementation Boundary

| Layer / Tool | Technology | Architectural Role & Scope |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | Server-side rendering, strict static typing, and lightning-fast client hydration. |
| **Styling & UI** | Tailwind CSS + Lucide Icons | High-contrast, accessible obsidian & emerald aesthetic compliant with minimalist financial UI. |
| **Visualizations** | Recharts (Strict Library Mandate) | Client-side dynamic area, bar, and composed trajectory charts bound to formula recalculations. |
| **Consultation Pipeline** | Dynamic Bank QR + Google Meet | Zero-fee direct peer-to-merchant UPI settlement, 12-digit UTR validation, and automated Meet hooks. |
| **Deployment Target** | Vercel / Netlify / Hostinger India | Low-latency edge delivery, zero server upkeep. |

---

## 3. Mathematical Calculator Specifications (Tabbed Suite)

All calculation engines execute purely on the client side for instantaneous sub-millisecond feedback:

1. **SIP vs. Lumpsum Engine**
   - *Inputs:* Monthly installment (₹), investment tenure (years), expected return (% p.a.), lumpsum seed fund (₹).
   - *Formulas:* Monthly compounding $FV = P \times \frac{(1+i)^n - 1}{i} \times (1+i)$ and annual lumpsum $FV = L \times (1+r)^t$.
   - *Visuals:* Comparative multi-gradient growth curves over time + total wealth stacked bar.

2. **Retirement Corpus & Decumulation**
   - *Inputs:* Current age, retirement age, monthly expense, inflation rate (%), post-retirement return (%), life expectancy.
   - *Formulas:* Fisher real rate of return $r_{\text{real}} = \frac{1+r_{\text{post}}}{1+\text{inf}} - 1$, annuity-due post-retirement living expense escalation.
   - *Visuals:* Corpus accumulation curve vs. decumulation exhaustion trajectory.

3. **Annuity & Cashflow Engine**
   - *Inputs:* Initial capital corpus, payout frequency (Monthly, Quarterly, Annual), assumed annual yield (%), duration (years).
   - *Formulas:* Systematic withdrawal plan (SWP) amortization breakdown between yield-earned and principal decay.
   - *Visuals:* Periodic cashflow schedule bar chart + capital decay tracker curve.

4. **Goal Savings Shortfall & Step-Up**
   - *Inputs:* Target milestone amount, target date, existing savings, risk appetite slider (Conservative, Moderate, Aggressive).
   - *Formulas:* Future value of existing assets, inflation-adjusted milestone target, required flat monthly SIP, and 10% annual step-up SIP progression.
   - *Visuals:* Monthly shortfall metric card + required monthly step-up trajectory.

5. **NPV & Valuation Engine**
   - *Inputs:* Hurdle discount rate (%), initial cash outflow (₹), projected periodic cash inflows (dynamic add/remove rows).
   - *Formulas:* Discounted cash flows $PV_t = \frac{CF_t}{(1+r)^t}$, Net Present Value, Newton-Raphson Internal Rate of Return (IRR), and discounted payback period.
   - *Visuals:* Discounted vs. undiscounted net cumulative cashflow comparison chart.

---

## 4. Consultation & Payment Architecture

- **Slot Reservation:** Interactive calendar widget allowing clients to select open 30-min windows across upcoming business days.
- **Instant Bank QR Display:** Modal generates a real-time UPI QR code (`upi://pay?pa=...`) alongside registered HDFC Bank NEFT/IMPS coordinates.
- **Proof Verification:** Client enters their 12-digit Bank UTR / UPI Reference ID with optional screenshot receipt upload.
- **Automated Google Meet Delivery:** The backend hook at `/api/booking` validates the payload, provisions a unique Google Meet link (`https://meet.google.com/xyz-abcd-efg`), generates a downloadable `.ics` calendar invite, and triggers confirmation confetti.
- **Context Prep:** Pre-populates the advisor's briefing dossier with the client's active calculator numbers directly from the state.

---

## 5. Site Page Structure

- **Page A: Home & Funnel Overview Hub (`/`)** — Value proposition, un-gated interactive calculator preview, 4-step strategic funnel, fee-only fiduciary comparison table, client case studies, and conversion CTAs.
- **Page B: Tabbed Calculator Suite (`/calculators`)** — All 5 financial engines with deep linking (`?tab=sip`, `?tab=retirement`, etc.), shareable URLs, and dossier export/print.
- **Page C: Investor Awareness & FAQ Hub (`/faq`)** — Categorized accordion FAQ, SEBI investor charter pillars, direct vs. regular mutual fund TER impact, and redressal timelines.
- **Page D: SEBI Disclosures & Risk Profiling (`/disclosures`)** — Credentials table (INA000018921), Level 1/2/3 Grievance Redressal Matrix (SCORES & SMART ODR), SaaS execution boundaries, and interactive 4-question SEBI Risk Suitability Diagnostic.
- **Page E: Contact & Advisory Profile (`/contact`)** — Principal Officer bio (Aarav Sharma, CFA), credentials, Mumbai office coordinates, contact form, and direct booking CTA.
- **Persistent Disclaimer Banner:** Pinned, non-intrusive statutory regulatory disclosure banner across the application.

---

## 6. Quick Start & Verification

### Development Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

### Run Mathematical Fidelity Tests
```bash
npx tsx scripts/verify-math.ts
```

All 5 calculation engines are tested against known financial boundary conditions with 100% mathematical parity.

---

## 7. Deliverable Signoff

- **Clean TypeScript Codebase:** Fully type-checked across components, calculators, and API routes.
- **Responsive Architecture:** Zero horizontal layout shift across 375px (mobile), 768px (tablet), and 1440px (desktop).
- **Environment Documentation:** Configurable through `.env.example`.
