# Chameleon Platform — Executive Readiness Summary (FCDS)

> **Document Type:** Condensed Executive Due Diligence Summary  
> **Target Institution:** Faculty of Computer and Data Science (FCDS), Alexandria University  
> **Audit Baseline:** 15 November 2026 (14 Months Continuous Operation: 25 Sep 2025 – 15 Nov 2026)  
> **Source:** Production PostgreSQL Database Logs, Codebase Inspection, and Serverless Infrastructure

---

### 1. What Chameleon Is (and Is Not)
* **What It Is:** A supplementary active-learning companion and formative assessment platform engineered specifically around Alexandria University FCDS credit-hour bylaws and undergraduate degree paths.
* **What It Is NOT:** It is **not** an administrative Learning Management System (LMS). It does not manage official university gradebooks, attendance, or official course registrations. It focuses strictly on **active problem-solving, formative practice, and bylaw-grounded academic advising**.

---

### 2. Audited Production Metrics (15 November 2026 Baseline)
* **Registered Accounts:** **5,298 total registered accounts** recorded in the production database.
  * **Freshmen (Level 1):** 858 accounts (16.2%)
  * **Sophomores, Juniors & Seniors (Levels 2–4):** 4,213 accounts (**79.5%** of user base)
  * **Alumni, TAs & Unassigned:** 227 accounts (4.3%)
* **Formative Assessment Activity:** **21,161 completed quiz attempts** across **211 live quizzes**.
* **Unique Active Solvers:** **1,926 unique student accounts** have completed at least one assessment (**36.4% participation rate** across total registered accounts).
* **Examination Correlation (Usage Spikes):**
  * **Final Exam Peak (Jan 2026):** **8,288 completed quizzes** (~275 quizzes/day).
  * **Midterm Peak (Nov 2025):** **5,497 completed quizzes**.
* **Content Inventory:** **16,948 categorized questions** across 66 course subjects, covering all 6 FCDS departments.

---

### 3. Complementary Differentiation: Official LMS vs. Chameleon
| Dimension | Official University LMS | Chameleon Learning Companion | Complementary Value |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Administrative course material distribution & official records. | Active problem-solving, voluntary practice, and self-diagnosis. | Bridges lecture comprehension to practical problem-solving. |
| **Assessment Role** | Summative formal examinations (Midterms & Finals). | Low-stakes formative quizzes with instant step-by-step rationales. | Diagnoses student knowledge gaps before high-stakes exams. |
| **Academic Advising** | Scheduled physical office hours with assigned faculty advisors. | 24/7 AI advisor (Marline) grounded in FCDS credit-hour bylaws. | Offloads high-frequency prerequisite and credit-hour queries. |
| **CS Tools** | None integrated (students use separate third-party software). | Client-side linear algebra and matrix engines (LU/QR, determinants). | Standardized calculation tools running directly in the browser. |
| **Faculty Visibility** | Final grades available only after exams conclude. | Bi-weekly aggregate question error rates on lecture concepts. | Gives instructors early diagnostic signals on difficult topics. |

---

### 4. Technical Architecture & AI Routing
* **Client UI:** Next.js 14 (App Router) + React 18 + Tailwind CSS + KaTeX (LaTeX math rendering).
* **Database Layer:** Supabase-managed PostgreSQL with Row-Level Security (RLS) and atomic PL/pgSQL procedures (`deduct_ai_credit`, `increment_user_coins`).
* **Marline AI Engine:**
  * **5-Tier Fallback Chain:** Coordinates Cerebras ➔ Groq ➔ Google Gemini ➔ OpenRouter ➔ Cloudflare Workers AI.
  * **Structured Bylaw Injection:** Injects official degree rules (`faculty_courses_bylaw.json`) covering 206 courses, prerequisites, and Arabic/English aliases.
  * **Safeguards:** Daily cap of 20 questions/day per student; clear disclaimers that outputs are advisory and not legal decrees.

---

### 5. Technical Audit Findings & Remediation Plan
* **1. In-Memory Rate Limiting in Multi-Instance Serverless (Severity: HIGH):**
  * *Problem:* In-memory maps in `src/lib/rate-limit.ts` are not shared across serverless lambdas.
  * *Fix:* Migrate to distributed **Upstash Redis** (`@upstash/ratelimit`) during Week 1 of pilot setup.
* **2. Dual Password Storage Architecture (Severity: HIGH):**
  * *Problem:* Application table stores bcrypt password hashes in parallel with Supabase Auth.
  * *Fix:* Deprecate custom password column and integrate university Single Sign-On (SSO).
* **3. Synthetic Trend Simulation in Admin Dashboard (Severity: HIGH):**
  * *Problem:* 30-day analytics trends use sinusoidal mathematical fallback functions.
  * *Fix:* Replace simulated curves with direct, indexed SQL aggregation queries on `quiz_data`.

---

### 6. Operational Sustainability & Financial Reality
* **Current Operating Baseline:** **~\$46.25 to \$61.25 / month (~2,300 to 3,000 EGP / month)** covering Supabase Pro, Vercel Pro, and domain registration.
* **Institutional Pilot Operating Budget:** **~\$100 to \$150 / month (~4,900 to 7,350 EGP / month)** adding Upstash Redis rate limiting, dedicated commercial AI quotas, and Sentry error monitoring.
* **Build vs. Partner Comparison:** Developing an equivalent system in-house would take **9–12 months** and cost an estimated **600,000 to 1,000,000 EGP** (\$12k–\$20k), whereas Chameleon is fully functional today at **\$0 capital expenditure**.

---

### 7. Proposed Spring 2027 Academic Pilot Plan
* **Duration:** 15-week low-stakes, voluntary pilot in Spring 2027.
* **Pilot Target (4 Foundation & Core Courses):**
  1. *Linear Algebra* (`02-24-00101` — Level 1 Foundation)
  2. *Programming I / II* (`02-24-00105 / 00110` — Level 1 Core)
  3. *Data Structures & Algorithms* (`02-24-00108` — Level 1/2 Core)
  4. *Database Systems* (`02-24-00202` — Level 2 Core)
* **Departmental Deliverables:** Bi-weekly concept diagnostic error reports sent to course coordinators.
* **Data Governance & Legal Compliance:** Alexandria University serves as **Data Controller** with full ownership of student academic data under Egyptian Personal Data Protection Law No. 151 of 2020. Platform maintainers act as **Data Processors**.

---

### 8. Institutional Request & Next Steps
1. **Product Walkthrough & Technical Review:** Present platform findings and live architecture to Faculty Leadership.
2. **Ad-Hoc Review Committee:** Appoint 2 faculty members and 1 IT representative to review question banks and technical standards.
3. **Pilot Authorization:** Authorize a voluntary 4-course pilot for Spring 2027 with zero financial commitment requested from the Faculty upfront.
