# IMS v2 – Scope, Objectives & Boundaries

## Purpose of this Document
This document establishes the **foundational scope, objectives, and hard boundaries** for IMS v2 (Volks Huisvesting). It is authoritative and precedes all workflow, role, and technical documentation. The PRD will be produced **last** and must align strictly with this document and all subsequent governance documents.

This document intentionally avoids UI, database, or implementation detail.

---

## 1. System Objective (Authoritative)
IMS v2 exists to **digitize, control, and audit** the full internal lifecycle of housing-related dossiers for Volks Huisvesting, with strict role-based execution, traceable decisions, and ministerial accountability.

The system's primary value is **process integrity and legal defensibility**, not speed or automation for its own sake.

---

## 2. Services in Scope (v2)
IMS v2 supports **exactly two services**:

1. **Construction Subsidy (Bouwsubsidie)**
2. **Housing Registration (Woningregistratie)**

No other services are included in scope for v2.

---

## 3. Shared Core vs Service-Specific Logic

### 3.1 Shared Core (Mandatory for Both Services)
The following concepts are shared and reused across both services:
- Dossiers (cases)
- Persons & households
- Document management
- Urgency scoring
- Status history
- Audit logging
- Notifications & reminders
- Role-based access control (RLS)

### 3.2 Service-Specific Logic

| Area | Construction Subsidy | Housing Registration |
|----|----|----|
| Technical site visit | Required | Not applicable |
| Budget / cost calculation | Required | Not applicable |
| Ministerial decision | Required | Not applicable |
| Council proposal (Raadvoorstel) | Required | Not applicable |
| Allocation | Not applicable | Manual only |

---

## 4. Allocation & Decision Principles

### 4.1 Allocation
- Allocation is **always manual**.
- No automatic assignment of housing is allowed.
- System may support prioritization and ranking, but **never auto-allocate**.

### 4.2 Decision Authority
- The **Minister has final authority** where applicable.
- The Minister may:
  - Review dossiers
  - Decide (approve / reject)
  - Return dossiers for correction or additional information

The Minister is an **active actor** in the workflow, not a read-only role.

---

## 5. Urgency & Prioritization
- Urgency scores are **active system variables**.
- Urgency **may automatically influence priority and ordering** (e.g. waiting lists, queues).
- Urgency does **not** override human decisions.

---

## 6. Dossier Lifecycle Rules

### 6.1 Dossier States
- A dossier progresses through explicit, ordered states.
- State transitions are role-restricted and logged.

### 6.2 Dossier Locking
- A dossier can be **definitively closed (locked)**.
- After locking:
  - No modifications are allowed
  - Read-only access remains
  - Audit history is preserved

### 6.3 Long-Running Dossiers
- Dossiers do not expire automatically.
- The system must issue **mandatory reminders at least every two months**.
- This ensures institutional accountability.

---

## 7. Dossier Relationships
- Dossiers **may be merged** (e.g. multiple applications within one household).
- Merging must:
  - Preserve original records
  - Be fully auditable
  - Establish a clear parent–child relationship

Automatic merging is not permitted.

---

## 8. Documents & Evidence
- Both services require document uploads.
- Construction Subsidy documents are mandatory for screening and review.
- Housing Registration also supports document uploads for internal validation.

The exact document canon is defined in a separate document.

---

## 9. Notifications & Communication

### 9.1 Mandatory Notifications
Certain notifications are **always sent**, regardless of user preferences:
- Dossier returned
- Ministerial decision
- Dossier closure
- Critical deadline breaches

### 9.2 Internal Communication
- No public portal is included in v2.
- IMS supports **internal communication templates** (email, letters, WhatsApp-style messages).

---

## 10. Public Integration (Future, Optional)
- IMS v2 is **not connected** to any public portal.
- The architecture may allow a **future optional integration**.
- This is documented only; no implementation is included.

---

## 11. Explicit Non-Goals (Out of Scope)
The following are explicitly excluded from IMS v2:
- Public-facing application wizard
- Citizen self-service portals
- Automatic allocation or approvals
- AI-based decision-making
- Silent dossier expiration

---

## 12. Governance Rule
No workflow, role, screen, or technical feature may be implemented unless it can be traced back to this document or subsequent governance documents.

The PRD must conform to this document—not redefine it.