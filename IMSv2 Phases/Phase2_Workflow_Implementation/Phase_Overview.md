# Phase 2: Workflow Implementation

## Purpose

Extend the foundation schema with service-specific tables for Bouwsubsidie and Woningregistratie workflows. This phase adds the domain-specific data structures required to support complete dossier processing.

## Scope

- Create service-specific enums
- Create Bouwsubsidie service tables
- Create Woningregistratie service tables
- Create review and assessment tables
- Create Raadvoorstel tables
- Establish service-specific foreign key relationships
- NO RLS policies (Phase 3)
- NO Edge Functions (Phase 4/5)

## Inputs (Authoritative Documents)

- Doc 02: Services & Module Decomposition
- Doc 03: End-to-End Workflow Definitions
- Doc 05: Dossier State Machine & Transition Rules
- Doc 06: Dossier & Evidence Canon
- Doc 09: Architecture & Supabase Translation
- Doc 11: Raadvoorstel Template

## Expected Outputs

### Service-Specific Enums
- `service_type` enum: bouwsubsidie, woningregistratie
- `review_type` enum: social, financial, technical
- `urgency_level` enum: per Doc 03 definitions

### Bouwsubsidie Tables
- `technical_reports` — Technical review deliverables
- `budgets` — Financial assessments
- `raadvoorstellen` — Council proposal records

### Woningregistratie Tables
- `urgency_assessments` — Urgency scoring
- `allocations` — Housing allocation records

### Shared Tables
- `reviews` — Social and financial review records
- `dossier_history` — State transition log
- `comments` — Internal notes and annotations

### Constraints
- Service-type partitioning where applicable
- Workflow state validation hooks (prepare for RLS)
- Proper indexing for query performance

## Out of Scope

- RLS policies (Phase 3)
- Edge Functions (Phase 4/5)
- Core table modifications (Phase 1 tables are frozen)
- UI development (Phase 6)
- Notification logic (Phase 5)

---

**Status:** PENDING
**Gate Approval:** Required before execution
