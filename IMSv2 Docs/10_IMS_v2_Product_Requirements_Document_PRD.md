# IMS v2 – Product Requirements Document (PRD)

## 1. Purpose
This Product Requirements Document (PRD) consolidates and operationalizes **IMS v2** requirements strictly derived from **Documents 1–8**. It introduces **no new scope**. Any requirement not traceable to prior documents is out of scope.

**Authoritative Sources:**
- Doc 1: Scope, Objectives & Boundaries
- Doc 2: Services & Module Decomposition
- Doc 3: End-to-End Workflow Definitions
- Doc 4: Roles, Departments & Authority Matrix
- Doc 5: Dossier State Machine & Transition Rules
- Doc 6: Audit, Logging & Legal Traceability
- Doc 7: Notifications, Reminders & Escalation Rules
- Doc 8: Dossier & Evidence Canon

---

## 2. In-Scope Services
- **Construction Subsidy (Bouwsubsidie)**
- **Housing Registration (Woningregistratie)**

No additional services are permitted in v2.

---

## 3. Users & Roles (Summary)
- Frontdesk Officer
- Control Officer (Technical)
- Social Reviewer
- Financial Reviewer
- Director
- Minister (Bouwsubsidie only)
- Allocation Officer (Woningregistratie)
- System Administrator

Permissions must align exactly with Doc 4. No role stacking is allowed.

---

## 4. Core Functional Requirements (Shared)

### FR-CORE-01 Dossier Management
- Create, view, and progress dossiers with exactly one active state.
- Enforce state transitions per Doc 5.

### FR-CORE-02 Evidence Management
- Upload mandatory evidence per service (Doc 8).
- Enforce presence validation gates at Intake.
- Append-only versioning; no deletions.

### FR-CORE-03 Audit & Logging
- Log all mandatory events per Doc 6.
- Provide read-only audit views per role.

### FR-CORE-04 Notifications
- Trigger mandatory notifications per Doc 7.
- Respect optional preferences where allowed.

### FR-CORE-05 Dossier Locking
- Lock dossiers upon terminal states; enforce read-only thereafter.

---

## 5. Bouwsubsidie Requirements

### FR-BS-01 Intake & Control
- Frontdesk creates dossiers and submits Intake.
- Control Department assigns and completes site visits.

### FR-BS-02 Reviews
- Mandatory Technical, Social, and Financial reviews.
- No progression until all reviews are approved.

### FR-BS-03 Budget Preparation
- Control Department prepares budgets.
- Financial review validates budgets.

### FR-BS-04 Director Review
- Director may approve, return, or reject.

### FR-BS-05 Raadvoorstel
- System generates a single Raadvoorstel after Director approval.
- Raadvoorstel may be invalidated and regenerated if returned.

### FR-BS-06 Minister Decision
- Minister views dossier summary, advice, and proposed amounts.
- Minister may approve, reject, or return.

---

## 6. Woningregistratie Requirements

### FR-WR-01 Administrative Intake
- Frontdesk submits Intake with mandatory documents.

### FR-WR-02 Validation
- Reviewer validates identity and household data.

### FR-WR-03 Urgency Scoring
- Assign urgency score with justification.
- Score influences priority automatically.

### FR-WR-04 Manual Allocation
- Allocation Officer performs manual allocation only.

---

## 7. State Management
- Implement state machines exactly as defined in Doc 5.
- Prevent skipping states or unauthorized transitions.

---

## 8. Audit, Compliance & Legal
- Ensure non-repudiation and immutability.
- Support dossier and audit exports (read-only, watermarked).

---

## 9. UX & Interaction Principles
- Darkone Admin baseline.
- Prefer modals; use detail pages only when necessary.
- One primary action per screen.

---

## 10. Out of Scope (Explicit)
- Public portals or citizen-facing flows
- Automated allocation or approvals
- External integrations
- AI-driven decisions

---

## 11. Acceptance Criteria
- All features traceable to Docs 1–8.
- No role can exceed its authority.
- All mandatory notifications fire correctly.
- All audit events are captured and immutable.

---

## 12. Implementation Readiness
Upon PRD approval, implementation may proceed under strict governance with phase-gated execution and mandatory restore points.