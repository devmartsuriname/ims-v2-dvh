# IMS v2 – Tasks Document

**Version:** 1.0  
**Status:** Planning Artifact  
**Date:** 2026-01-15  
**Purpose:** Phase-based task breakdown for implementation planning

---

## Overview

This document breaks down IMS v2 implementation into discrete tasks organized by phase. This is a **planning artifact**, not an execution checklist. All tasks require explicit approval before execution.

---

## Phase 0: Context Lock

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P0-01 | Place source documents | Copy all 11 IMS v2 documents to /IMSv2 Docs/ with canonical naming | None |
| P0-02 | Create validation report | Document cross-document validation findings | P0-01 |
| P0-03 | Create master planning doc | Establish phase-gated implementation plan | P0-01 |
| P0-04 | Create architecture doc | Document conceptual architecture | P0-01 |
| P0-05 | Create backend doc | Document backend responsibilities | P0-01 |
| P0-06 | Create tasks doc | Break down implementation into tasks | P0-01 |
| P0-07 | Resolve open decisions | Get stakeholder input on OD-01 through OD-07 | P0-02 |
| P0-08 | Create restore point | Document baseline before Phase 1 | P0-07 |
| P0-09 | Phase 0 gate approval | Stakeholder sign-off on all planning docs | P0-08 |

---

## Phase 1: Foundation Schema

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P1-01 | Enable Lovable Cloud | Initialize Supabase backend | P0-09 |
| P1-02 | Create role enum | Define app_role enum type | P1-01 |
| P1-03 | Create users table | User profile linked to auth.users | P1-02 |
| P1-04 | Create user_roles table | Junction table for role assignments | P1-02, P1-03 |
| P1-05 | Create departments table | Organizational structure | P1-01 |
| P1-06 | Create persons table | Applicant/citizen records | P1-01 |
| P1-07 | Create households table | Household groupings | P1-01 |
| P1-08 | Create household_members table | Person-to-household junction | P1-06, P1-07 |
| P1-09 | Create dossier_status enum | Define dossier state values | P1-01 |
| P1-10 | Create service_type enum | Define service type values | P1-01 |
| P1-11 | Create dossiers table | Core dossier records | P1-06, P1-09, P1-10 |
| P1-12 | Create dossier_states table | State history (append-only) | P1-11 |
| P1-13 | Create documents table | Evidence metadata | P1-11 |
| P1-14 | Create audit_logs table | Immutable audit trail | P1-01 |
| P1-15 | Create notifications table | Notification records | P1-03 |
| P1-16 | Create has_role function | Security definer for role checks | P1-04 |
| P1-17 | Create audit trigger | Auto-create audit logs on mutations | P1-14 |
| P1-18 | Configure storage bucket | Create evidence bucket | P1-01 |
| P1-19 | Document migrations | Record all schema changes | P1-01 |
| P1-20 | Phase 1 gate validation | Verify all core tables exist | P1-19 |

---

## Phase 2: Service-Specific Schema

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P2-01 | Create review_type enum | Define review type values | P1-20 |
| P2-02 | Create technical_reports table | Technical assessment data | P1-11 |
| P2-03 | Create budgets table | Budget preparation records | P1-11 |
| P2-04 | Create raadvoorstellen table | Council proposal records | P1-11 |
| P2-05 | Create reviews table | Review records with type | P1-11, P2-01 |
| P2-06 | Create urgency_assessments table | Urgency scoring records | P1-11 |
| P2-07 | Create allocations table | Housing assignment records | P1-11 |
| P2-08 | Validate foreign keys | Ensure referential integrity | P2-07 |
| P2-09 | Document migrations | Record service schema changes | P2-08 |
| P2-10 | Phase 2 gate validation | Verify all service tables exist | P2-09 |

---

## Phase 3: Security Layer (RLS)

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P3-01 | Enable RLS on all tables | Set default deny | P2-10 |
| P3-02 | Create users RLS policies | Role-based access | P3-01 |
| P3-03 | Create dossiers RLS policies | State + role based access | P3-01 |
| P3-04 | Create documents RLS policies | Dossier-linked access | P3-01 |
| P3-05 | Create audit_logs RLS policies | Read-only for authorized roles | P3-01 |
| P3-06 | Create service table RLS | Bouwsubsidie + Woningregistratie | P3-01 |
| P3-07 | Create can_transition function | State transition validation | P3-01 |
| P3-08 | Create transition_state function | Execute state change with audit | P3-07 |
| P3-09 | Block DELETE on critical tables | Prevent data loss | P3-01 |
| P3-10 | Security testing | Penetration test RLS policies | P3-09 |
| P3-11 | Document RLS policies | Record all policies | P3-10 |
| P3-12 | Phase 3 gate validation | No privilege escalation possible | P3-11 |

---

## Phase 4: Backend Services

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P4-01 | Create dossier-workflow function | State transition API | P3-12 |
| P4-02 | Create evidence-management function | Upload + versioning API | P3-12 |
| P4-03 | Create raadvoorstel-generator function | Template population | P3-12 |
| P4-04 | Create notification-dispatch function | Event-driven notifications | P3-12 |
| P4-05 | Create reminder-scheduler function | Scheduled reminder checks | P3-12 |
| P4-06 | Configure function secrets | Set up required secrets | P4-01 |
| P4-07 | Integration test: workflow | Test state transitions | P4-01 |
| P4-08 | Integration test: evidence | Test upload/download | P4-02 |
| P4-09 | Integration test: raadvoorstel | Test generation | P4-03 |
| P4-10 | Integration test: notifications | Test dispatch | P4-04 |
| P4-11 | Integration test: reminders | Test scheduler | P4-05 |
| P4-12 | Document edge functions | Record all functions | P4-11 |
| P4-13 | Phase 4 gate validation | All functions deployed and tested | P4-12 |

---

## Phase 5: Admin UI Modules

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P5-01 | Create auth module | Login/logout pages | P4-13 |
| P5-02 | Create dashboard module | Role-based landing pages | P5-01 |
| P5-03 | Create dossier list component | Filtered dossier table | P5-02 |
| P5-04 | Create dossier detail component | Full dossier view | P5-03 |
| P5-05 | Create state transition UI | Action buttons per role | P5-04 |
| P5-06 | Create evidence upload UI | File upload with validation | P5-04 |
| P5-07 | Create evidence viewer UI | Document preview | P5-04 |
| P5-08 | Create technical report form | Bouwsubsidie specific | P5-04 |
| P5-09 | Create budget form | Bouwsubsidie specific | P5-04 |
| P5-10 | Create review forms | Social/financial/technical | P5-04 |
| P5-11 | Create decision UI | Director/Minister actions | P5-04 |
| P5-12 | Create raadvoorstel viewer | Generated document display | P5-04 |
| P5-13 | Create urgency form | Woningregistratie specific | P5-04 |
| P5-14 | Create allocation UI | Housing assignment | P5-04 |
| P5-15 | Create audit viewer | Read-only log display | P5-02 |
| P5-16 | Create admin: users | User management | P5-02 |
| P5-17 | Create admin: roles | Role assignment | P5-16 |
| P5-18 | Create notification display | In-app notifications | P5-02 |
| P5-19 | Responsive testing | Verify mobile/tablet views | P5-18 |
| P5-20 | Document UI components | Record all modules | P5-19 |
| P5-21 | Phase 5 gate validation | All modules functional | P5-20 |

---

## Phase 6: Integration & UAT

| Task ID | Task | Description | Dependencies |
|---------|------|-------------|--------------|
| P6-01 | E2E: Bouwsubsidie workflow | Full workflow test | P5-21 |
| P6-02 | E2E: Woningregistratie workflow | Full workflow test | P5-21 |
| P6-03 | Role boundary testing | Test all 8 roles | P5-21 |
| P6-04 | Audit completeness test | Verify all actions logged | P5-21 |
| P6-05 | Notification delivery test | Verify all notifications work | P5-21 |
| P6-06 | Escalation trigger test | Test 60/120 day triggers | P5-21 |
| P6-07 | Security audit | Penetration testing | P5-21 |
| P6-08 | Performance testing | Load testing critical paths | P5-21 |
| P6-09 | UAT: Frontdesk scenarios | User acceptance | P6-08 |
| P6-10 | UAT: Control Officer scenarios | User acceptance | P6-08 |
| P6-11 | UAT: Reviewer scenarios | User acceptance | P6-08 |
| P6-12 | UAT: Director scenarios | User acceptance | P6-08 |
| P6-13 | UAT: Minister scenarios | User acceptance | P6-08 |
| P6-14 | UAT: Admin scenarios | User acceptance | P6-08 |
| P6-15 | Fix identified issues | Resolve UAT findings | P6-14 |
| P6-16 | Final security review | Post-fix verification | P6-15 |
| P6-17 | Production deployment approval | Stakeholder sign-off | P6-16 |
| P6-18 | Production deployment | Deploy to production | P6-17 |
| P6-19 | Post-deployment verification | Smoke tests | P6-18 |
| P6-20 | Project closure | Documentation handoff | P6-19 |

---

## Task Summary

| Phase | Task Count | Risk Level |
|-------|------------|------------|
| Phase 0 | 9 | LOW |
| Phase 1 | 20 | MEDIUM |
| Phase 2 | 10 | MEDIUM |
| Phase 3 | 12 | HIGH |
| Phase 4 | 13 | MEDIUM |
| Phase 5 | 21 | LOW |
| Phase 6 | 20 | HIGH |
| **Total** | **105** | - |

---

## Dependencies Visualization

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6
  │           │           │           │           │           │           │
  │           │           │           │           │           │           │
  ▼           ▼           ▼           ▼           ▼           ▼           ▼
Planning    Schema      Schema      Security    Backend     Frontend    Testing
Docs        Core        Service     RLS         Functions   Modules     UAT
```

---

## Open Decisions Impact on Tasks

| Open Decision | Affected Tasks |
|---------------|----------------|
| OD-01: PRD numbering | P0-01 |
| OD-02: Technical Review ownership | P1-02, P3-06 |
| OD-03: Reviewer role specificity | P1-02, P3-02 |
| OD-04: Escalated dossier return | P3-07, P4-01 |
| OD-05: Auditor role | P1-02, P3-05, P5-15 |
| OD-06: Raadvoorstel regeneration | P4-03 |
| OD-07: Document deletion logging | P1-14, P4-02 |

---

## Document References

All tasks derive from:
- 01_IMS_v2_Scope_Objectives_Boundaries.md
- 02_IMS_v2_Services_Module_Decomposition.md
- 03_IMS_v2_End_to_End_Workflow_Definitions.md
- 04_IMS_v2_Roles_Departments_Authority_Matrix.md
- 05_IMS_v2_Dossier_State_Machine_Transition_Rules.md
- 06_IMS_v2_Dossier_Evidence_Canon.md
- 07_IMS_v2_Audit_Logging_Legal_Traceability.md
- 08_IMS_v2_Notifications_Reminders_Escalation_Rules.md
- 09_IMS_v2_Architecture_Supabase_Translation.md
- 10_IMS_v2_Product_Requirements_Document_PRD.md
- 11_IMS_v2_Raadvoorstel_Template.md

---

**Await Further Instructions.**
