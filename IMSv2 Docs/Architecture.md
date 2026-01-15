# IMS v2 – Architecture Document

**Version:** 1.0  
**Status:** Planning  
**Date:** 2026-01-15  
**Source Documents:** Doc 4, Doc 5, Doc 9

---

## Overview

This document describes the **conceptual architecture** of IMS v2. It defines the logical system structure, data flow patterns, service boundaries, and security model. No implementation code is included.

---

## System Context

```
┌─────────────────────────────────────────────────────────────────┐
│                        IMS v2 System                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Admin UI  │  │   Backend   │  │      Database           │  │
│  │  (Darkone)  │◄─┤  Services   │◄─┤  (Supabase Postgres)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│         │                │                      │               │
│         │                │                      │               │
│         ▼                ▼                      ▼               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Auth     │  │   Storage   │  │     Audit Trail         │  │
│  │ (Supabase)  │  │ (Supabase)  │  │   (Append-only)         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ NO external integrations in v2
                              ▼
                    ┌─────────────────┐
                    │  Out of Scope   │
                    │  - Citizen Portal│
                    │  - External APIs │
                    │  - Disbursement  │
                    └─────────────────┘
```

---

## Logical Layers

### Layer 1: Presentation (Admin UI)

**Technology:** React + Darkone Admin Template  
**Responsibility:** User interface for all IMS operations

**Modules:**
- Authentication (login/logout)
- Dashboard (role-specific views)
- Dossier Management (CRUD, state transitions)
- Evidence Management (upload, view, version)
- Workflow Execution (service-specific forms)
- Audit Viewer (read-only, filtered)
- Administration (users, roles)

**Constraints:**
- No business logic in UI layer
- All data access via Supabase client
- Role visibility enforced by RLS, not UI
- Complex operations via edge functions

---

### Layer 2: Application Services (Edge Functions)

**Technology:** Supabase Edge Functions (Deno)  
**Responsibility:** Complex business logic, integrations

**Services:**

| Service | Responsibility |
|---------|----------------|
| Dossier Workflow | State transitions, validation, audit creation |
| Evidence Management | Upload validation, versioning, presence checks |
| Raadvoorstel Generation | Template population, invalidation handling |
| Notification Dispatch | Event-driven notifications, mandatory/optional |
| Reminder Engine | Scheduled checks for 60/120 day triggers |

**Constraints:**
- Must use security definer functions for role checks
- Must create audit entries for all mutations
- No raw SQL execution
- All secrets via Supabase secrets management

---

### Layer 3: Data Access (RLS + Security Definer)

**Technology:** PostgreSQL RLS, Security Definer Functions  
**Responsibility:** Enforce access control at database level

**Patterns:**
- Default deny on all tables
- Role-based policies using `has_role()` function
- State-restricted updates using `can_transition()` function
- Audit triggers on all mutations

**Critical Functions:**
- `has_role(user_id, role)` - Check user's assigned roles
- `can_transition(dossier_id, new_state)` - Validate state transition
- `log_audit_event(...)` - Create immutable audit record

---

### Layer 4: Persistence (Database + Storage)

**Technology:** Supabase PostgreSQL, Supabase Storage  
**Responsibility:** Data persistence, file storage

**Database Domains:**
- Identity (users, roles, departments)
- Persons (persons, households, members)
- Dossiers (dossiers, states, evidence)
- Services (bouwsubsidie, woningregistratie specifics)
- Audit (logs, notifications)

**Storage Buckets:**
- `evidence` - Dossier documents (restricted access)
- `exports` - Generated reports (time-limited access)

---

## Data Flow Patterns

### Pattern 1: Dossier State Transition

```
User Action (UI)
      │
      ▼
┌─────────────────┐
│  Edge Function  │ ◄── Validate role + current state
│  (Workflow)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Security       │ ◄── Check can_transition()
│  Definer Func   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database       │ ◄── Update dossier, create history
│  Transaction    │
└────────┬────────┘
         │
         ├──► Audit Log (append)
         │
         └──► Notification Queue
```

### Pattern 2: Evidence Upload

```
File Upload (UI)
      │
      ▼
┌─────────────────┐
│  Edge Function  │ ◄── Validate file type, size
│  (Evidence)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Storage        │ ◄── Store file with versioning
│  Bucket         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database       │ ◄── Create document metadata record
│  (documents)    │
└────────┬────────┘
         │
         └──► Audit Log (append)
```

### Pattern 3: Raadvoorstel Generation

```
Director Request (UI)
      │
      ▼
┌─────────────────┐
│  Edge Function  │ ◄── Validate dossier state = approved
│  (Raadvoorstel) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Template       │ ◄── Populate from Doc 11 template
│  Engine         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database       │ ◄── Create raadvoorstel record
│  (raadvoorstellen)│    (invalidates previous if exists)
└────────┬────────┘
         │
         └──► Audit Log (append)
```

---

## Service Boundaries

### Bouwsubsidie Service

**Owns:**
- Technical reports
- Budgets
- Raadvoorstellen
- Reviews (social, financial, technical)

**States (from Doc 5):**
```
Intake → Screening → Social Review → Financial Review → 
Technical Review → Director Review → Minister Approval → 
Council Decision → Disbursement Pending → Closed
```

**Decision Points:**
- Director: Approve/Reject/Return
- Minister: Approve/Reject/Return
- Council: Approve/Reject/Return (Raadvoorstel)

---

### Woningregistratie Service

**Owns:**
- Urgency assessments
- Allocations
- Waiting list position

**States (from Doc 5):**
```
Intake → Screening → Urgency Assessment → Waiting List → 
Allocation → Accepted/Declined → Closed
```

**Decision Points:**
- Control Officer: Approve/Reject registration
- Allocation Officer: Assign housing
- Applicant: Accept/Decline allocation

---

## Security & Trust Model

### Trust Boundaries

```
┌─────────────────────────────────────────────────────┐
│                 UNTRUSTED ZONE                      │
│  ┌─────────────────────────────────────────────┐    │
│  │           Browser / Client                   │    │
│  │  - Can be manipulated                        │    │
│  │  - Never trust for authorization             │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
                         │
                         │ JWT Token
                         ▼
┌─────────────────────────────────────────────────────┐
│                 TRUSTED ZONE                        │
│  ┌─────────────────────────────────────────────┐    │
│  │         Supabase Edge Functions              │    │
│  │  - Validate JWT                              │    │
│  │  - Check roles via security definer          │    │
│  └─────────────────────────────────────────────┘    │
│                         │                           │
│                         ▼                           │
│  ┌─────────────────────────────────────────────┐    │
│  │         PostgreSQL + RLS                     │    │
│  │  - Final enforcement layer                   │    │
│  │  - Cannot be bypassed                        │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Role Hierarchy (from Doc 4)

| Role | Trust Level | Scope |
|------|-------------|-------|
| Admin | System | User management, configuration |
| Minister | Executive | Final approval authority (Bouwsubsidie) |
| Director | Management | Approval authority, escalation target |
| Control Officer | Operational | Dossier processing, state transitions |
| Social Reviewer | Specialist | Social assessment only |
| Financial Reviewer | Specialist | Financial assessment only |
| Allocation Officer | Operational | Housing assignment (Woningregistratie) |
| Frontdesk | Entry | Intake, basic screening only |

### Role Storage (Critical)

**MUST:** Store roles in separate `user_roles` table  
**MUST NOT:** Store roles in `users` or `profiles` table  
**REASON:** Security definer functions require isolated role queries

---

## State Machine Integration (from Doc 5)

### Transition Rules

All state transitions must:
1. Be initiated by authorized role
2. Pass validation for current state → target state
3. Create audit log entry
4. Trigger required notifications
5. Check evidence requirements (gate criteria)

### Blocked Transitions

- No backward transitions without explicit return
- No skipping states
- No silent expiration
- Rejected states are terminal (require new dossier)

---

## Notification Flow (from Doc 8)

```
State Transition
      │
      ▼
┌─────────────────┐
│  Notification   │ ◄── Check notification rules
│  Service        │
└────────┬────────┘
         │
         ├──► Mandatory: Always create
         │
         └──► Optional: Check user preferences
                  │
                  ▼
         ┌─────────────────┐
         │  Notification   │ ◄── Store for retrieval
         │  Queue          │
         └─────────────────┘
```

### Escalation Triggers

- 60 days in `pending_*` state → Reminder to assigned user
- 120 days in `pending_*` state → Escalate to Director
- 14 days after reminder → Second reminder

---

## Open Decisions (Architecture Impact)

| ID | Decision | Architecture Impact |
|----|----------|---------------------|
| OD-02 | Technical Review ownership | Role enum, RLS policies |
| OD-04 | Escalated dossier return path | State machine edges |
| OD-06 | Raadvoorstel regeneration trigger | Edge function logic |

---

## Document References

- Doc 4: Roles, Departments & Authority Matrix
- Doc 5: Dossier State Machine & Transition Rules
- Doc 9: Architecture & Supabase Translation

---

**Await Further Instructions.**
