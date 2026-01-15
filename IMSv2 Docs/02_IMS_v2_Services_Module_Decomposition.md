# IMS v2 – Services & Module Decomposition

## 1. Purpose of this Document
This document defines **what services exist in IMS v2**, how they are decomposed into modules, and which modules are **shared** versus **service-specific**.

This document is intentionally **structural**, not technical. It does not define workflows, states, or screens yet. Its purpose is to ensure that later documents (workflow, roles, PRD) are aligned and non-contradictory.

---

## 2. Core Principle
IMS v2 supports **exactly two primary services**:

1. **Bouwsubsidie (Construction Subsidy)**
2. **Woningregistratie (Housing Registration)**

Both services:
- Run inside **one unified IMS platform**
- Share core entities (Person, Household, Dossier)
- Differ in **workflow complexity, authority steps, and outcomes**

No other services are in scope for v2.

---

## 3. High-Level Service Comparison

| Aspect | Bouwsubsidie | Woningregistratie |
|------|-------------|------------------|
| Dossier-based | Yes | Yes |
| Technical Control / Site Visit | Yes | No |
| Social Review | Yes | Limited / Validation only |
| Financial/Budget Step | Yes | No |
| Raadvoorstel | Yes | No |
| Ministerial Decision | Mandatory | Not applicable |
| Allocation Engine | No | Manual only |
| Urgency Score | Influences priority | Influences waiting list |

---

## 4. Shared Core Modules (Used by Both Services)

These modules exist **once** and are reused by both services.

### 4.1 Persons Module
- Natural persons
- Identification data
- Contact information
- Linked to one or more households

### 4.2 Households Module
- Household composition
- Relationships
- Shared attributes (dependents, income indicators)

### 4.3 Dossier Module (Core)
- Unique dossier per service instance
- Status lifecycle (service-specific states later defined)
- Merge support (multiple dossiers → one household case)
- Locking on final closure

### 4.4 Documents & Evidence Module
- File uploads
- Mandatory document enforcement (per service)
- Versioning (append-only)
- Linked to dossier

### 4.5 Audit & Logging Module
- Immutable audit trail
- Captures:
  - status changes
  - decisions
  - document uploads
  - comments
  - reminders

### 4.6 Notification & Reminder Module
- Email-based notifications
- Mandatory system notifications
- Time-based reminders (e.g. dormant dossiers)
- User preferences respected except for mandatory events

---

## 5. Bouwsubsidie – Service-Specific Modules

These modules exist **only** for Bouwsubsidie dossiers.

### 5.1 Intake & Control Assignment
- Intake validation
- Assignment to Control Department

### 5.2 Technical Control Module
- Site visit scheduling
- Photo uploads
- Technical findings
- Structured technical report (fixed format)

### 5.3 Social Review Module
- Social assessment
- Household situation review
- Mandatory completion

### 5.4 Financial / Budget Module
- Budget preparation
- Cost breakdown
- Prepared by Control Department (technical team)
- Mandatory before director review

### 5.5 Director Review Module
- Consolidated view of all reviews
- Approve / return / reject

### 5.6 Raadvoorstel Module
- Auto-generated draft after approval
- Single version only
- Can be invalidated and regenerated

### 5.7 Minister Decision Module
- Read full dossier
- See:
  - summary for board
  - advice
  - proposed amounts
- Actions:
  - approve
  - reject
  - return dossier

---

## 6. Woningregistratie – Service-Specific Modules

These modules exist **only** for Woningregistratie dossiers.

### 6.1 Registration Intake
- Administrative validation
- Document completeness check

### 6.2 Urgency Assessment Module
- Scoring with justification
- Automatically affects priority
- Append-only

### 6.3 Waiting List Module
- District-based ordering
- Priority influenced by urgency
- No automatic allocation

### 6.4 Manual Allocation Module
- Assignment triggered manually
- Records decision
- Locks dossier after finalization

---

## 7. Explicit Non-Modules (Out of Scope)

The following are **explicitly excluded** from IMS v2:

- Public citizen portal
- External system integrations
- Automated allocation
- Financial disbursement execution

These may be documented later as **optional extensions**, but are not implemented.

---

## 8. Key Structural Guarantees

- Each service owns its **own workflow**, but reuses shared modules
- No module may bypass the Dossier core
- Ministerial authority exists only in Bouwsubsidie
- Woningregistratie never escalates to Raadvoorstel

---

## 9. Dependency on Next Document

This document feeds directly into:

**IMS v2 – End-to-End Workflow Definitions**

No workflow may introduce steps that are not backed by a module defined here.