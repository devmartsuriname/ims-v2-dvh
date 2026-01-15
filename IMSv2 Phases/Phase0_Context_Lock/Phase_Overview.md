# Phase 0: Context Lock

## Purpose

Establish the immutable documentation baseline before any code, schema, or implementation work begins. This phase ensures all stakeholders operate from the same authoritative source of truth.

## Scope

- Placement of all 11 canonical IMS v2 documents
- Cross-document validation and consistency checks
- Creation of planning documents (Master Planning, Architecture, Backend, Tasks)
- Resolution of open decisions
- Establishment of governance rules
- Phase 0 gate approval

## Inputs (Authoritative Documents)

1. Doc 01: IMS v2 Scope, Objectives & Boundaries
2. Doc 02: IMS v2 Services & Module Decomposition
3. Doc 03: IMS v2 End-to-End Workflow Definitions
4. Doc 04: IMS v2 Roles, Departments & Authority Matrix
5. Doc 05: IMS v2 Dossier State Machine & Transition Rules
6. Doc 06: IMS v2 Dossier & Evidence Canon
7. Doc 07: IMS v2 Audit, Logging & Legal Traceability
8. Doc 08: IMS v2 Notifications, Reminders & Escalation Rules
9. Doc 09: IMS v2 Architecture & Supabase Translation
10. Doc 10: IMS v2 Product Requirements Document (PRD)
11. Doc 11: IMS v2 Raadvoorstel Template

## Expected Outputs

- `/IMSv2 Docs/` folder with all 11 canonical documents
- `IMSv2_Master_Planning.md` — Phase-gate structure and dependencies
- `Architecture.md` — Conceptual architecture and data flows
- `Backend.md` — Backend service responsibilities
- `Tasks.md` — Task breakdown by phase
- `IMSv2_Darkone_Admin_Governance.md` — Binding governance rules
- `IMSv2_Open_Decisions_Resolution.md` — Resolved open decisions
- `IMSv2_Phase_0_Completion_Report.md` — Gate approval documentation

## Out of Scope

- Any code changes
- Any schema creation or modification
- Any RLS policy work
- Any Supabase setup or configuration
- Any UI development
- Any Edge Function work
- Any authentication implementation
- Any refactoring of existing code

---

**Status:** COMPLETE
**Gate Approval:** APPROVED (see IMSv2_Phase_0_Completion_Report.md)
