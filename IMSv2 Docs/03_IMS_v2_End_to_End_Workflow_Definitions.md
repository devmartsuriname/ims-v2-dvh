# IMS v2 – End-to-End Workflow Definitions

## 1. Purpose of this Document
This document defines the **complete, end-to-end workflows** for all services within IMS v2.

It describes:
- Mandatory workflow steps
- Allowed transitions
- Decision points
- Return paths
- Final closure rules

This document is **authoritative** for:
- State machines
- Role enforcement
- SLA tracking
- Audit logging

No UI, no technical implementation details are defined here.

---

## 2. Global Workflow Principles (Applies to All Services)

1. Every workflow operates on a **Dossier**
2. A dossier always has **exactly one active state**
3. States are **append-only** (history cannot be edited)
4. Dossiers may move **forward or backward**, but never skip mandatory steps
5. A dossier may be **locked** after final closure
6. All transitions are:
   - role-restricted
   - logged
   - timestamped

---

## 3. Bouwsubsidie – End-to-End Workflow

### 3.1 Workflow Overview

INTAKE → CONTROLE → REVIEWS → BESLUIT → RAADVOORSTEL → AFSLUITING

This workflow is **mandatory and non-optional** for Bouwsubsidie.

---

### 3.2 Detailed Workflow Steps

#### Step 1: Intake
**Purpose:** Validate completeness and eligibility

- Dossier created
- Documents uploaded
- Initial validation performed

**Allowed outcomes:**
- Intake Approved → CONTROLE
- Intake Rejected → Return to applicant (Frontdesk)

---

#### Step 2: Controle (Assignment & Execution)
**Purpose:** Technical verification

- Assigned to Control Department
- Site visit scheduled
- Photos collected
- Findings recorded

**Allowed outcomes:**
- Control Completed → REVIEWS
- Control Failed → Return to Intake

---

#### Step 3: Reviews (Parallel, Mandatory)
**Purpose:** Multi-disciplinary assessment

Mandatory reviews:
- Technical Review
- Social Review
- Financial/Budget Review

All reviews must be completed before proceeding.

**Allowed outcomes:**
- All Reviews Approved → BESLUIT
- Any Review Failed → Return to CONTROLE

---

#### Step 4: Besluit (Director Review)
**Purpose:** Consolidated managerial decision

- Full dossier review
- Review summaries visible

**Allowed outcomes:**
- Approved → RAADVOORSTEL
- Returned → REVIEWS
- Rejected → AFSLUITING (Denied)

---

#### Step 5: Raadvoorstel
**Purpose:** Formal advisory proposal

- Automatically generated
- Single version only
- Can be invalidated if returned

**Allowed outcomes:**
- Submitted → MINISTER BESLUIT
- Returned → BESLUIT

---

#### Step 6: Minister Besluit
**Purpose:** Final authority decision

Minister can:
- Approve
- Reject
- Return dossier

Minister sees:
- Dossier summary
- Advice
- Proposed amounts

**Allowed outcomes:**
- Approved → AFSLUITING (Granted)
- Rejected → AFSLUITING (Denied)
- Returned → BESLUIT

---

#### Step 7: Afsluiting
**Purpose:** Legal finalization

- Dossier locked
- No further edits allowed
- Audit trail finalized

Final states:
- Subsidy Granted
- Subsidy Denied

---

## 4. Woningregistratie – End-to-End Workflow

### 4.1 Workflow Overview

INTAKE → VALIDATIE → PRIORITERING → BESLUIT → AFSLUITING

No Raadvoorstel or Ministerial decision exists for this service.

---

### 4.2 Detailed Workflow Steps

#### Step 1: Intake
**Purpose:** Administrative registration

- Dossier created
- Required documents uploaded

**Allowed outcomes:**
- Intake Approved → VALIDATIE
- Intake Rejected → Return to applicant

---

#### Step 2: Validatie
**Purpose:** Data correctness verification

- Identity check
- Household verification

**Allowed outcomes:**
- Validated → PRIORITERING
- Invalid → Return to Intake

---

#### Step 3: Prioritering (Urgency Assessment)
**Purpose:** Determine waiting list priority

- Urgency score assigned
- Justification required

Urgency score:
- Automatically influences priority
- Cannot be edited after submission

**Allowed outcomes:**
- Scored → BESLUIT

---

#### Step 4: Besluit (Administrative Approval)
**Purpose:** Administrative acceptance

- Confirms registration eligibility

**Allowed outcomes:**
- Approved → AFSLUITING (Waiting List)
- Rejected → AFSLUITING (Denied)

---

#### Step 5: Afsluiting
**Purpose:** Formal closure

- Dossier locked
- Eligible for manual allocation later

Final states:
- Registered (Waiting List)
- Registration Denied

---

## 5. Cross-Cutting Rules

### 5.1 Returns & Corrections
- Any return requires justification
- Applicant must be notified

### 5.2 Dossier Merging
- Multiple dossiers may be merged under one household
- Original histories remain intact

### 5.3 Long-Running Dossiers
- Automatic reminders every 2 months
- Escalation visibility for management

---

## 6. Dependency on Next Document

This workflow definition feeds directly into:

**IMS v2 – Roles, Departments & Authority Matrix**

No role may be defined that contradicts the transitions defined here.