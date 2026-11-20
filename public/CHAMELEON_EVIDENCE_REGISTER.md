# CHAMELEON PLATFORM — EVIDENCE & CLAIMS REGISTER
**Document Type:** Evidence Verification & Telemetry Traceability Register  
**Assessment Nature:** Internal Product, Technical and Institutional Readiness Assessment (Project-Owner-Led)  
**Target Institution:** Faculty of Computer and Data Science (FCDS), Alexandria University  
**Audit Period:** 15 November 2026 | **Scope:** Codebase, Database Records, and Operational Telemetry  

---

## 1. Methodology and Evidence Categorization

This register maps every major factual, technical, operational, and institutional statement made in the due diligence documents to its verifiable source. 

### Categories of Verification:
- **Verified (Direct Database / Code Evidence):** Confirmed by direct SQL queries against the production Supabase PostgreSQL instance or static codebase inspection.
- **Qualified Operational Metric:** Data reflects internal application telemetry (e.g., quiz completions) rather than whole-platform web analytics.
- **Architectural Design (Unmeasured SLA):** Feature or configuration is implemented in code, but lacks third-party historical uptime or performance monitoring records.
- **Hypothetical Estimate:** Projection based on industry benchmarks; explicitly identified as an assumption.
- **Clarified / Corrected Claim:** Previously reported figures that have been refined or corrected during this credibility pass.

---

## 2. Traceability & Claims Matrix

| # | Specific Statement / Metric | Primary Source of Evidence | Verification Status | Confidence Level | Permitted Institutional Use & Required Caveats |
|---|---|---|---|---|---|
| **1** | **5,298 Registered User Accounts** | SQL Query: `SELECT count(*) FROM chameleons;` returned 5,298 rows. Earliest registration: June 7, 2025; latest: November 4, 2026. | **Verified Database Metric** | **High (100%)** | Must be stated as **"registered accounts"**, NOT "verified enrolled students". Without registrar cross-referencing, potential account duplication, inactive accounts, or non-student registrations cannot be excluded. |
| **2** | **Cohort Level Breakdown** | SQL Query on `chameleons.current_level`: Level 1: 681; Level 2: 1,617; Level 3: 1,631; Level 4: 857; Unassigned/Alumni: 227. | **Verified Database Metric** | **High (100%)** | Must be accurately labeled: Level 1 (Freshmen / الفرقة الأولى), Level 2 (Sophomores / الفرقة الثانية), Level 3 (Juniors / الفرقة الثالثة), Level 4 (Seniors / الفرقة الرابعة). Do NOT group Levels 2–4 collectively as "juniors and seniors". |
| **3** | **21,161 Completed Quiz Attempts** | SQL Query: `SELECT count(*) FROM quiz_data;` returned 21,161 rows. Sequence `proccess_id` reached 30,285. | **Verified Database Metric** | **High (100%)** | Represents total completed quiz submissions across 14 months. Must NOT be confused with unique users or monthly active users. |
| **4** | **1,926 Unique Quiz Completers** | Paginated SQL extraction of distinct `auth_id` values from `quiz_data` confirmed 1,926 unique accounts. | **Verified Database Metric** | **High (100%)** | Permitted. Represents **36.4% of total registered accounts** that have completed at least one formative assessment. |
| **5** | **Monthly Quiz Activity & Exam Seasonality** | SQL grouping of `quiz_data.solved_at`: Jan 2026: 8,288 attempts; Nov 2025: 5,497; Dec 2025: 4,001; Oct 2025: 603; Oct 2026: 571; Nov 2026 (4 days): 262. | **Verified Database Metric** | **High (100%)** | Proves significant traffic spikes during midterm and final exam periods. Must be reported as **quiz attempt volume**, NOT as general site-wide MAU or DAU. |
| **6** | **Site-Wide Daily / Monthly Active Users (DAU / MAU)** | Not tracked via dedicated web analytics platforms (e.g., PostHog, Google Analytics, or Mixpanel). | **Unmeasured / Clarified** | **N/A** | **DO NOT CLAIM generic DAU (e.g. 500) or MAU (e.g. 3,000).** Explicitly state that overall browsing, reading, and non-quiz visits are currently unmeasured by dedicated analytics. |
| **7** | **211 Live Quizzes & 638 Pre-Structured Seed Modules** | Production table `quiz_department` hosts 211 active quizzes. Seed SQL file `seed_quiz_department.sql` contains 638 quiz inserts and 16,948 questions across 66 course codes. | **Verified Content Asset** | **High (100%)** | Permitted. Clarifies that the 196 figure previously reported was an earlier milestone. |
| **8** | **Marline AI Bylaw & Prerequisite Grounding** | Source code: `src/lib/marline/bylaw-retriever.ts` and `data/faculty_courses_bylaw.json`. Injects course titles, credit hours, prerequisites, and aliases for 206 courses. | **Verified Code Implementation** | **High (95%)** | Describe as **curriculum-context-aware AI using structured bylaw retrieval**. Do NOT claim deterministic factual infallibility. Outputs may contain errors or hallucinations and require student/faculty verification. |
| **9** | **Marline 5-Tier Fallback Architecture** | Source code: `src/lib/marline/router.ts` coordinates Cerebras, Groq, Google Gemini, OpenRouter, and Cloudflare Workers AI with health checks and cooldowns. | **Verified Architecture** | **High (90%)** | Represents a configured architectural failover system. Must NOT be presented as a historically measured uptime SLA. |
| **10** | **AI Token Consumption** | SQL Query: `SELECT sum(CAPI_REQS) FROM chameleons WHERE CAPI_REQS > 0;` returned 3,102,524 tokens across 141 recorded accounts. | **Verified Database Metric** | **High (100%)** | Permitted as documented baseline token usage under the daily 20-question quota policy. |
| **11** | **Virtual Economic Loop (Coins & Store)** | Source code: `recordQuizCompletionAction` in `src/app/quiz/actions.ts` credits coins server-side. `chameleons.coins` pool holds 14.36M coins. `store-catalog.ts` offers purely cosmetic items. | **Verified Code Implementation** | **High (100%)** | Permitted. Accurately describes an intrinsic, non-monetary motivational mechanism with zero financial transaction gateways. |
| **12** | **Document & PDF Analysis in Chat** | Backend route `api/ai/extract-pdf` uses `pdf-parse`; `/ai` testing page uses `mammoth`. Production `/marline` chat interface does not have a document upload button. | **Partially Implemented** | **High (90%)** | **DO NOT claim end-to-end document RAG in production chat.** Clarify that document extraction exists in backend routes, while production Marline focuses on text-based bylaw and concept guidance. |
| **13** | **Official Certification Issuance & Matchmaking Tournaments** | Prototype UI `certifications/page.tsx` contains static Framer Motion cards. No backend issuance logic or tournament database models exist. | **Planned / Not Implemented** | **High (100%)** | Must be classified honestly as a **future roadmap concept**, NOT an existing capability. |
| **14** | **Platform Uptime & Availability** | No APM or third-party monitoring service (e.g., Datadog, BetterStack, Pingdom) was active during the 14-month operating period. | **Unmeasured / Clarified** | **N/A** | **DO NOT claim 99.2% or any specific historical uptime percentage.** State that uptime has relied on default Vercel and Supabase platform availability without independent synthetic tracking. |
| **15** | **Security & Incident History** | No security breaches have been reported by users or detected on database accounts, but no centralized SIEM/IDS logs exist to prove zero unauthorized probes. | **Qualified Statement** | **Medium (75%)** | State that **no security incidents or account compromises have been recorded or reported**, while acknowledging that formal institutional deployment requires dedicated audit logging. |
| **16** | **Regulatory Compliance (Egyptian Law 151/2020)** | Platform incorporates standard security headers, HTTPS, bcrypt password hashing, and RLS policies, but has not undergone a formal legal compliance audit. | **Requires Legal Assessment** | **Medium (70%)** | Do NOT assert "full compliance". State that the platform's architecture is **designed to support compliance** and propose a formal data governance framework for joint legal review. |
| **17** | **Data Ownership & Software IP** | Software code and original branding were developed independently by the founder/project maintainers; student user data is stored in the cloud. | **Requires Written Agreement** | **High (100%)** | Do NOT assume automatic university data ownership or grant an automatic perpetual license. Propose a clear contractual framework: university ownership of student data, non-exclusive institutional license for software. |
| **18** | **Infrastructure Operating Costs** | Actual documented receipts: Supabase Pro ($25/mo), Vercel Pro ($20/mo), Domain ($1.25/mo). Subtotal: **~$46.25/mo (~2,260 EGP/mo)**. AI currently uses free/promotional credits. | **Documented Actual Expense** | **High (100%)** | Documented baseline is ~$46.25/mo. Future institutional pilot with Upstash Redis and dedicated paid AI quotas is estimated at **$100–$150/mo (~4,900–7,350 EGP/mo)**. |

---

## 3. Disclosed Limitations & Items Requiring Institutional Verification

To maintain strict credibility before the Faculty Dean, Department Heads, and Technical Committees, the following items are formally disclosed as requiring institutional verification:

1. **Student Account Validation:** Cross-referencing the 5,298 registered accounts with official Alexandria University FCDS registrar enrollment lists to establish the exact proportion of currently enrolled students versus graduated, testing, or duplicate accounts.
2. **Web Analytics Implementation:** Installation of lightweight, privacy-compliant product analytics (e.g., PostHog self-hosted) to measure exact daily active users (DAU), session duration, and non-quiz page engagement.
3. **Academic Content Audit:** Formal review by departmental course coordinators of the 211 live quizzes and 638 seed modules to ensure terminology and answer keys align perfectly with current course syllabi.
4. **Third-Party Uptime Monitoring:** Deployment of automated synthetic monitoring (e.g., BetterStack or UptimeRobot) to establish an audited availability SLA.
5. **Formal Legal Review:** Review of data processing workflows by qualified legal counsel to ensure full adherence to Egyptian Personal Data Protection Law No. 151 of 2020.
