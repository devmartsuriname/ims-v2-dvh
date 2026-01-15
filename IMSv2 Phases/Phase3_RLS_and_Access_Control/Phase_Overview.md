# Phase 3: RLS and Access Control

## Purpose

Implement Row Level Security (RLS) policies to enforce role-based access control at the database level. This phase secures all tables created in Phase 1 and Phase 2, ensuring users can only access data appropriate to their assigned roles.

## Scope

- Enable RLS on all tables
- Create `has_role()` security definer function
- Create `can_transition()` state machine enforcement function
- Implement SELECT policies per role matrix
- Implement INSERT policies per workflow rules
- Implement UPDATE policies per state machine
- Implement DELETE blocking (hard block per OD-07)
- Create audit trigger for blocked deletion attempts

## Inputs (Authoritative Documents)

- Doc 04: Roles, Departments & Authority Matrix
- Doc 05: Dossier State Machine & Transition Rules
- Doc 07: Audit, Logging & Legal Traceability
- `IMSv2_Open_Decisions_Resolution.md` — OD-03 (role specificity), OD-07 (deletion blocking)

## Expected Outputs

### Security Functions
- `has_role(role_name)` — Check if current user has specified role
- `can_transition(dossier_id, from_status, to_status)` — Validate state transitions
- `get_user_department()` — Return user's department for scoping

### RLS Policies by Table

#### Core Tables
- `users` — Admin full access, self-read for others
- `user_roles` — Admin only
- `departments` — All authenticated read, admin write
- `dossiers` — Role-scoped per authority matrix
- `documents` — Role-scoped per evidence canon

#### Service Tables
- `technical_reports` — Control officer write, reviewer read
- `reviews` — Assigned reviewer write, workflow participants read
- `raadvoorstellen` — Director/Minister access
- `allocations` — Allocation officer write

### DELETE Blocking
- Hard block DELETE on all tables via RLS
- Audit log entry for any attempted deletion
- No exceptions without explicit migration

## Out of Scope

- Edge Functions (Phase 4/5)
- UI development (Phase 6)
- Schema changes (Phases 1-2 complete)
- Notification logic (Phase 5)
- Authentication setup (uses External Supabase Auth)

---

**Status:** PENDING
**Gate Approval:** Required before execution
