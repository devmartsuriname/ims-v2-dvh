# Phase 1: Foundation Schema

## Purpose

Create the core database tables in External Supabase without RLS policies. This phase establishes the identity layer, audit infrastructure, and foundational data structures required by all subsequent phases.

## Scope

- Connect External Supabase project (project-owned, NOT Lovable Cloud)
- Create `app_role` enum with 8 defined roles
- Create core identity tables: `users`, `user_roles`, `departments`
- Create person/household tables: `persons`, `households`, `household_members`
- Create dossier foundation: `dossiers` table with state machine support
- Create document management: `documents` table
- Create audit infrastructure: `audit_logs` table
- Establish foreign key relationships
- NO RLS policies (Phase 3)

## Inputs (Authoritative Documents)

- Doc 04: Roles, Departments & Authority Matrix
- Doc 05: Dossier State Machine & Transition Rules
- Doc 06: Dossier & Evidence Canon
- Doc 07: Audit, Logging & Legal Traceability
- Doc 09: Architecture & Supabase Translation
- `IMSv2_Open_Decisions_Resolution.md` — Binding role definitions

## Expected Outputs

### Enums
- `app_role` enum: frontdesk, control_officer, social_reviewer, financial_reviewer, director, minister, allocation_officer, admin
- `dossier_status` enum: per Doc 05 state machine
- `document_type` enum: per Doc 06 evidence canon

### Tables
- `users` — System user accounts
- `user_roles` — Role assignments (many-to-many)
- `departments` — Organizational units
- `persons` — Individual applicants
- `households` — Household units
- `household_members` — Person-household relationships
- `dossiers` — Core dossier records with status tracking
- `documents` — Evidence and document storage metadata
- `audit_logs` — Immutable audit trail

### Constraints
- All foreign key relationships established
- Escalation flag columns: `escalation_flag` (boolean), `escalation_date` (timestamp)
- Soft delete support where required
- Created/updated timestamps on all tables

## Out of Scope

- RLS policies (Phase 3)
- Edge Functions (Phase 4/5)
- Service-specific tables like `technical_reports`, `budgets` (Phase 2)
- UI development (Phase 6)
- Lovable Cloud (forbidden — External Supabase only)

---

**Status:** PENDING
**Gate Approval:** Required before execution
