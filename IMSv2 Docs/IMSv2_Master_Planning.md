# IMS v2 – Master Planning Document

**Version:** 1.0  
**Status:** Approved for Planning  
**Date:** 2026-01-15  
**Governance:** Devmart Phase-Gate

---

## Executive Summary

This document serves as the **single source of truth** for the IMS v2 implementation execution order. All implementation work must follow this phase-gated structure. No phase may begin without explicit approval of the preceding phase's gate criteria.

---

## Phase Overview

```
Phase 0 ─────► Phase 1 ─────► Phase 2 ─────► Phase 3 ─────► Phase 4 ─────► Phase 5 ─────► Phase 6
(Context)     (Foundation)   (Service)      (Security)     (Backend)     (UI)          (UAT)
   LOW           MEDIUM        MEDIUM          HIGH          MEDIUM        LOW           HIGH
```

---

## Phase Definitions

### Phase 0: Context Lock (Pre-Implementation)

**Purpose:** Establish immutable baseline before any code changes

**Deliverables:**
- All 11 IMS v2 documents placed with canonical numbering
- Cross-document validation report completed
- Master planning document approved
- Architecture document approved
- Backend document approved
- Tasks document approved
- Restore point created

**Gate Criteria:**
- [ ] All 11 documents in `/IMSv2 Docs/` with canonical names
- [ ] No unresolved blocking issues from validation
- [ ] Stakeholder sign-off on document set
- [ ] All planning documents approved

**Hard Stop Rules:**
- No schema work until Phase 0 gate passed
- No UI work until Phase 0 gate passed
- Document versions locked after approval

---

### Phase 1: Foundation Schema

**Purpose:** Create core database tables without RLS

**Deliverables:**
- Core identity tables (users, roles, user_roles, departments)
- Person/household tables
- Dossier core tables
- Evidence metadata tables
- Audit infrastructure tables
- All migrations documented

**Dependencies:**
- Phase 0 complete
- Open decisions resolved (see Open Decisions section)

**Gate Criteria:**
- [ ] All core tables exist per Doc 9 schema
- [ ] Migrations documented in `/IMSv2 Docs/`
- [ ] Role separation enforced (user_roles table, NOT on users)
- [ ] Audit_logs table is append-only
- [ ] Foreign key integrity validated

**Hard Stop Rules:**
- No RLS policies until Phase 1 gate passed
- No edge functions until Phase 1 gate passed
- Schema changes require documentation update

---

### Phase 2: Service-Specific Schema

**Purpose:** Add Bouwsubsidie and Woningregistratie specific tables

**Deliverables:**
- Bouwsubsidie tables (technical_reports, budgets, raadvoorstellen, reviews)
- Woningregistratie tables (urgency_assessments, allocations)
- Service-specific enums and constraints

**Dependencies:**
- Phase 1 complete
- Core tables exist

**Gate Criteria:**
- [ ] All service tables exist per Doc 2 decomposition
- [ ] Foreign keys to core tables validated
- [ ] No orphan references possible
- [ ] Service-specific enums match Doc 5 states

**Hard Stop Rules:**
- No RLS policies until Phase 2 gate passed
- Service tables must match Doc 6 evidence canon

---

### Phase 3: Security Layer (RLS)

**Purpose:** Implement Row Level Security policies

**Deliverables:**
- Security definer functions (has_role, transition_dossier_state)
- RLS policies for all tables
- State transition enforcement
- Audit trigger integration

**Dependencies:**
- Phase 2 complete
- All tables exist
- Role enum finalized

**Gate Criteria:**
- [ ] Default deny on all tables
- [ ] Role-based SELECT policies per Doc 4 authority matrix
- [ ] State-restricted UPDATE policies per Doc 5 transitions
- [ ] DELETE blocked on critical tables
- [ ] Penetration testing passed
- [ ] No privilege escalation possible

**Hard Stop Rules:**
- No edge functions until Phase 3 gate passed
- RLS changes require security review
- No client-side role validation allowed

---

### Phase 4: Backend Services

**Purpose:** Create edge functions for complex operations

**Deliverables:**
- Dossier Workflow Service (state transitions, validation)
- Evidence Management Service (upload, versioning, presence validation)
- Raadvoorstel Generation Service (auto-generate from Doc 11 template)
- Notification Service (event dispatch per Doc 8)
- Reminder Service (60-day reminders, 120-day escalations)

**Dependencies:**
- Phase 3 complete
- RLS policies active
- Storage buckets configured

**Gate Criteria:**
- [ ] All edge functions deployed
- [ ] Integration tests pass
- [ ] Notification delivery confirmed
- [ ] Raadvoorstel generation matches Doc 11 template
- [ ] Escalation triggers tested (60/120 day)

**Hard Stop Rules:**
- No UI until Phase 4 gate passed
- Edge functions must log all operations
- No raw SQL in edge functions

---

### Phase 5: Admin UI Modules

**Purpose:** Build frontend using Darkone Admin baseline

**Deliverables:**
- Authentication module (login, session management)
- Dashboard module (role-based views)
- Dossier Management module (list, detail, transitions)
- Evidence Management module (upload, versioning)
- Bouwsubsidie Workflow module (reviews, raadvoorstel, decisions)
- Woningregistratie Workflow module (urgency, allocation)
- Audit Viewer module (role-filtered, export)
- Administration module (users, roles, configuration)

**Dependencies:**
- Phase 4 complete
- All edge functions operational
- Darkone Admin baseline intact

**Gate Criteria:**
- [ ] All modules functional
- [ ] Role restrictions enforced in UI
- [ ] Responsive design verified
- [ ] UX patterns match Doc 10 PRD (modals over pages, one primary action)
- [ ] No UI-only role checks (must use RLS)

**Hard Stop Rules:**
- No production deployment until Phase 5 gate passed
- UI must call edge functions, not direct DB access for complex operations
- Darkone Admin baseline must not be broken

---

### Phase 6: Integration & UAT

**Purpose:** End-to-end testing and user acceptance

**Deliverables:**
- Full Bouwsubsidie workflow test (Intake → Closure)
- Full Woningregistratie workflow test (Intake → Allocation)
- Role boundary testing (all 8 roles)
- Audit completeness verification
- Notification delivery confirmation
- Escalation trigger testing
- Security audit report
- UAT sign-off

**Dependencies:**
- Phase 5 complete
- All modules functional
- Test environment configured

**Gate Criteria:**
- [ ] All test scenarios pass
- [ ] No privilege escalation in security audit
- [ ] Stakeholder sign-off on workflows
- [ ] Audit trail complete for all test cases
- [ ] Production deployment approved

**Hard Stop Rules:**
- No production deployment without Phase 6 gate passed
- All security findings must be resolved
- UAT failures require regression to appropriate phase

---

## Explicit Out-of-Scope for IMS v2

Per Documents 1 and 10, the following are **explicitly excluded** from this implementation:

| Item | Reason |
|------|--------|
| Public citizen portal | Future phase |
| Citizen self-service | Future phase |
| Automatic allocation | Requires human oversight per governance |
| Automatic approvals | Requires human oversight per governance |
| AI-based decision-making | Out of scope for v2 |
| External system integrations | Future phase |
| Silent dossier expiration | Not permitted per Doc 5 |
| Financial disbursement execution | Out of scope (IMS tracks, does not disburse) |
| Mobile-native applications | Web-only for v2 |
| Multi-language support | Dutch/English only implied |
| Bulk operations | Individual dossier processing only |
| Historical data migration | Clean start for v2 |

---

## Open Decisions

The following decisions are pending and must be resolved before Phase 1:

| ID | Decision | Impact | Blocking Phase |
|----|----------|--------|----------------|
| OD-01 | PRD document numbering correction | Documentation consistency | Phase 0 |
| OD-02 | Technical Review ownership (Control Officer vs dedicated role) | Role matrix, RLS policies | Phase 1 |
| OD-03 | Reviewer role specificity (single vs multi-domain) | Role enum definition | Phase 1 |
| OD-04 | Escalated dossier return path (who can de-escalate) | State machine, RLS | Phase 3 |
| OD-05 | Auditor role definition (system vs explicit role) | Role matrix | Phase 1 |
| OD-06 | Raadvoorstel regeneration trigger (Director vs System) | Edge function logic | Phase 4 |
| OD-07 | Document deletion logging (hard vs soft delete) | Audit strategy | Phase 1 |

---

## Risk Register

| Phase | Risk | Likelihood | Impact | Mitigation |
|-------|------|------------|--------|------------|
| 0 | Document versioning confusion | Low | Medium | Canonical numbering + lock |
| 1 | Schema design errors | Medium | High | Validate against Docs 1-9 |
| 2 | Missing service requirements | Medium | Medium | Cross-reference with PRD |
| 3 | RLS policy gaps | High | Critical | Security definer pattern + testing |
| 4 | Edge function failures | Medium | Medium | Comprehensive logging |
| 5 | UI/UX misalignment | Low | Low | Darkone baseline adherence |
| 6 | Integration failures | Medium | High | Staged rollout |

---

## Document References

This master plan is derived from:

1. 01_IMS_v2_Scope_Objectives_Boundaries.md
2. 02_IMS_v2_Services_Module_Decomposition.md
3. 03_IMS_v2_End_to_End_Workflow_Definitions.md
4. 04_IMS_v2_Roles_Departments_Authority_Matrix.md
5. 05_IMS_v2_Dossier_State_Machine_Transition_Rules.md
6. 06_IMS_v2_Dossier_Evidence_Canon.md
7. 07_IMS_v2_Audit_Logging_Legal_Traceability.md
8. 08_IMS_v2_Notifications_Reminders_Escalation_Rules.md
9. 09_IMS_v2_Architecture_Supabase_Translation.md
10. 10_IMS_v2_Product_Requirements_Document_PRD.md
11. 11_IMS_v2_Raadvoorstel_Template.md

---

**Await Further Instructions.**
