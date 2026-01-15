# IMS v2 – Open Decisions Resolution Document

**Version:** 1.0  
**Status:** BINDING  
**Date:** 2026-01-15  
**Governance:** Devmart Phase-Gate  
**Reference:** IMSv2_Master_Planning.md, IMSv2_Darkone_Admin_Governance.md

---

## Purpose

This document records the **binding resolutions** for all 7 open decisions (OD-01 through OD-07) identified in the IMS v2 Master Planning Document. These resolutions are **authoritative** and must be followed in all subsequent implementation phases.

**This document is binding for all future phases.**

---

## Resolution Summary Table

| ID | Decision | Resolution | Binding For | Status |
|----|----------|------------|-------------|--------|
| OD-01 | PRD document numbering correction | Correct references to canonical order (06, 07, 08) | Documentation | ✅ RESOLVED |
| OD-02 | Technical Review ownership | Control Officer delivers; no separate reviewer role | Phase 1 Schema | ✅ RESOLVED |
| OD-03 | Reviewer role specificity | Two distinct roles: `social_reviewer`, `financial_reviewer` | Phase 1 Schema | ✅ RESOLVED |
| OD-04 | Escalated dossier return path | Escalation is a visibility flag, not a state; auto-clears on advancement | Phase 3 RLS | ✅ RESOLVED |
| OD-05 | Auditor role definition | System-level read-only access, not an `app_role` | Phase 1 Schema | ✅ RESOLVED |
| OD-06 | Raadvoorstel regeneration trigger | Director initiates; system auto-generates on Director approval | Phase 4 Backend | ✅ RESOLVED |
| OD-07 | Document deletion logging | Hard block + audit log; no soft delete | Phase 1 Schema, Phase 3 RLS | ✅ RESOLVED |

---

## Detailed Resolutions

### OD-01: PRD Document Numbering Correction

**Issue:**  
PRD Section 1 references documents with incorrect numbering (e.g., "Doc 8 Dossier & Evidence Canon" when the canonical order is Doc 6).

**Documentary Evidence:**  
- `06_IMS_v2_Dossier_Evidence_Canon.md` (canonical position: 06)
- `07_IMS_v2_Audit_Logging_Legal_Traceability.md` (canonical position: 07)
- `08_IMS_v2_Notifications_Reminders_Escalation_Rules.md` (canonical position: 08)

**Resolution:**  
Any reference in the PRD or other documents must use the canonical numbering:
- **Doc 6:** Dossier & Evidence Canon
- **Doc 7:** Audit, Logging & Legal Traceability
- **Doc 8:** Notifications, Reminders & Escalation Rules

**Implementation Impact:**  
- Phase 0: Documentation consistency (no PRD file modification unless explicitly instructed)
- All future documents must use canonical numbering

---

### OD-02: Technical Review Ownership

**Issue:**  
Unclear whether "Technical Review" is performed by the Control Officer or requires a dedicated "Technical Reviewer" role.

**Documentary Evidence:**  
- `03_IMS_v2_End_to_End_Workflow_Definitions.md` (Step 3 of Bouwsubsidie): "Control Officer — Request Technical Review"
- `04_IMS_v2_Roles_Departments_Authority_Matrix.md`: Control Officer listed as responsible for technical review coordination
- `05_IMS_v2_Dossier_State_Machine_Transition_Rules.md`: State `TECH_REVIEW_COMPLETE` triggered by Control Officer action

**Resolution:**  
**"Technical Review" is a deliverable owned by the Control Officer.**  
The Control Officer coordinates and finalizes the technical review. No separate "Technical Reviewer" role is required. The technical review is stored as a document or assessment record, but the state transition is performed by the Control Officer.

**Implementation Impact:**  
- Phase 1: No `technical_reviewer` in `app_role` enum
- Control Officer role retains technical review permissions
- Technical review data stored in `technical_reports` table (Phase 2)

---

### OD-03: Reviewer Role Specificity

**Issue:**  
Should there be a single "Reviewer" role or distinct roles for social and financial reviews?

**Documentary Evidence:**  
- `03_IMS_v2_End_to_End_Workflow_Definitions.md`: Separate steps for "Social Review" and "Financial Review" with distinct owners
- `04_IMS_v2_Roles_Departments_Authority_Matrix.md`: Social and financial reviews have different departmental ownership
- `05_IMS_v2_Dossier_State_Machine_Transition_Rules.md`: States `SOCIAL_REVIEW_PENDING`, `SOCIAL_REVIEW_COMPLETE`, `FINANCIAL_REVIEW_PENDING`, `FINANCIAL_REVIEW_COMPLETE` indicate separate processes

**Resolution:**  
**Two distinct roles: `social_reviewer` and `financial_reviewer`.**  
Each role can only perform their respective review type. This ensures separation of concerns and proper audit attribution.

**Implementation Impact:**  
- Phase 1: `app_role` enum includes both `social_reviewer` and `financial_reviewer`
- Phase 3: RLS policies restrict each reviewer to their domain
- Phase 5: UI must show only relevant review actions per role

---

### OD-04: Escalated Dossier Return Path

**Issue:**  
Who can de-escalate a dossier that has been flagged for escalation (120+ days pending)?

**Documentary Evidence:**  
- `08_IMS_v2_Notifications_Reminders_Escalation_Rules.md`: Escalation at 120 days triggers management notification and visibility flag
- `05_IMS_v2_Dossier_State_Machine_Transition_Rules.md`: No explicit "ESCALATED" state; escalation is metadata
- `07_IMS_v2_Audit_Logging_Legal_Traceability.md`: Escalation events must be logged

**Resolution:**  
**Escalation is a visibility flag (`dossiers.escalation_flag`), not a state.**  
- The flag is **set** by the Reminder Service when a dossier exceeds 120 days pending
- The flag is **cleared automatically** when the dossier advances to a new state (any valid state transition)
- No manual de-escalation action is required or permitted
- Escalation flag clears upon any forward state transition

**Implementation Impact:**  
- Phase 1: Add `escalation_flag` (boolean, default false) and `escalation_date` (timestamp, nullable) to `dossiers` table
- Phase 3: RLS ensures escalation flag cannot be directly modified by users
- Phase 4: State transition function clears escalation flag on advancement
- Phase 4: Reminder Service sets escalation flag at 120-day threshold

---

### OD-05: Auditor Role Definition

**Issue:**  
Is "Auditor / Oversight" an explicit system role or a system-level access pattern?

**Documentary Evidence:**  
- `04_IMS_v2_Roles_Departments_Authority_Matrix.md`: Auditor listed with read-only access across all modules
- `07_IMS_v2_Audit_Logging_Legal_Traceability.md`: Auditor access is for oversight and compliance verification
- `10_IMS_v2_Product_Requirements_Document_PRD.md`: Audit viewer module for governance oversight

**Resolution:**  
**"Auditor / Oversight" is a system-level read-only access pattern, not an `app_role`.**  
Auditor access is implemented as:
- A dedicated `admin` role with constrained permissions (read-only on audit tables, no operational access)
- OR system-level query access via secure reporting views

The `app_role` enum does NOT include "auditor" as a separate operational role. Audit access is granted to designated admin users with explicit read-only scope on audit data.

**Implementation Impact:**  
- Phase 1: No `auditor` in `app_role` enum
- Phase 3: Create read-only RLS policies for audit_logs table accessible to `admin` role
- Phase 5: Audit Viewer module accessible to `admin` role only
- Future: Consider dedicated `auditor` role if external oversight is required

---

### OD-06: Raadvoorstel Regeneration Trigger

**Issue:**  
Who triggers Raadvoorstel regeneration — the Director or the System?

**Documentary Evidence:**  
- `03_IMS_v2_End_to_End_Workflow_Definitions.md`: Director action triggers Raadvoorstel approval/rejection
- `05_IMS_v2_Dossier_State_Machine_Transition_Rules.md`: Transition to `RAADVOORSTEL_GENERATED` after Director review
- `11_IMS_v2_Raadvoorstel_Template.md`: Template defines auto-population from dossier data

**Resolution:**  
**Director initiates; System auto-generates.**  
- Initial generation: Raadvoorstel is auto-generated by the system when all required reviews are complete and dossier enters `DECISION_PENDING` state
- Regeneration: Director may request regeneration if dossier data changes (e.g., returned for corrections and resubmitted)
- Upon Director approval: System generates final version with approval metadata
- Director action triggers the generation request; system executes the template population

**Implementation Impact:**  
- Phase 4: Edge Function `raadvoorstel-generator` handles all generation
- Phase 4: Trigger on state transition to `DECISION_PENDING` for initial generation
- Phase 4: Director UI action triggers regeneration if dossier was modified
- Phase 4: Final generation occurs on Director approval with signature/date metadata

---

### OD-07: Document Deletion Logging

**Issue:**  
Should document deletion use soft delete (deleted_at timestamp) or hard block with audit logging?

**Documentary Evidence:**  
- `06_IMS_v2_Dossier_Evidence_Canon.md`: "Append-only versioning; no deletion permitted"
- `07_IMS_v2_Audit_Logging_Legal_Traceability.md`: All evidence actions must be auditable; immutability required
- `10_IMS_v2_Product_Requirements_Document_PRD.md`: No deletion of evidence for legal compliance

**Resolution:**  
**Hard block document deletion; audit log all deletion attempts.**  
- DELETE operations on `documents` table are blocked via RLS (no DELETE policy)
- Any deletion attempt (if bypassed) is logged as an audit event with severity `ERROR`
- No `deleted_at` column is required (no soft delete pattern)
- Document versioning replaces deletion: new versions supersede old versions, but old versions remain accessible

**Implementation Impact:**  
- Phase 1: No `deleted_at` column on `documents` table
- Phase 3: No DELETE RLS policy on `documents` table (default deny)
- Phase 3: Database trigger logs any DELETE attempt as audit event
- Phase 5: UI provides no delete action for documents; only version management

---

## Finalized Role Enum Definition

Based on the above resolutions, the `app_role` enum is defined as:

```sql
CREATE TYPE app_role AS ENUM (
  'frontdesk',
  'control_officer',
  'social_reviewer',
  'financial_reviewer',
  'director',
  'minister',
  'allocation_officer',
  'admin'
);
```

**Total: 8 roles**

| Role | Description |
|------|-------------|
| `frontdesk` | Intake processing, dossier creation |
| `control_officer` | Technical review coordination, workflow management |
| `social_reviewer` | Social assessment review |
| `financial_reviewer` | Financial assessment review |
| `director` | Raadvoorstel approval, decision authority |
| `minister` | Final ministerial decision (construction subsidy) |
| `allocation_officer` | Housing allocation (woningregistratie) |
| `admin` | System administration, audit access |

---

## Escalation Flag Specification

Per OD-04 resolution:

**Field Definitions:**
- `dossiers.escalation_flag` — `BOOLEAN DEFAULT FALSE`
- `dossiers.escalation_date` — `TIMESTAMP WITH TIME ZONE NULL`

**Behavior:**
- **Set by:** Reminder Service when dossier pending > 120 days
- **Cleared by:** Any state transition (automatic)
- **Visibility:** Management dashboard, dossier list filters

---

## Deletion Prevention Specification

Per OD-07 resolution:

**Implementation:**
- No DELETE RLS policy on `documents` table → default deny
- Trigger on DELETE attempt → log to `audit_logs` with:
  - `event_type`: `DOCUMENT_DELETE_BLOCKED`
  - `severity`: `ERROR`
  - `actor_id`: User who attempted deletion
  - `target_id`: Document ID
  - `details`: JSON with attempt context

---

## PRD Reference Correction Appendix

For reference consistency, the canonical document numbering is:

| PRD Reference | Correct Document |
|---------------|------------------|
| Doc 6 | 06_IMS_v2_Dossier_Evidence_Canon.md |
| Doc 7 | 07_IMS_v2_Audit_Logging_Legal_Traceability.md |
| Doc 8 | 08_IMS_v2_Notifications_Reminders_Escalation_Rules.md |

---

## Approval Statement

These resolutions are **approved and binding** for all IMS v2 implementation phases.

Any deviation from these resolutions requires:
1. Explicit stakeholder approval
2. Update to this document
3. Impact assessment on affected phases

---

**Document Status:** BINDING  
**Approved:** 2026-01-15  
**Governance:** Devmart Phase-Gate

---

**Await Further Instructions.**
