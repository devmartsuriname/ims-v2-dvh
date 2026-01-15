# Phase 4: Document and Audit Logic

## Purpose

Create backend logic for document lifecycle management, evidence handling, and audit enforcement. This phase implements the Edge Functions responsible for document operations and ensures complete audit trail compliance.

## Scope

- Create `evidence-management` Edge Function
- Create `dossier-workflow` Edge Function
- Implement document versioning logic
- Implement audit trigger enforcement
- Implement deletion blocking with audit logging
- Create Raadvoorstel generation logic (`raadvoorstel-generator`)

## Inputs (Authoritative Documents)

- Doc 06: Dossier & Evidence Canon
- Doc 07: Audit, Logging & Legal Traceability
- Doc 11: Raadvoorstel Template
- `IMSv2_Open_Decisions_Resolution.md` — OD-06 (Raadvoorstel trigger), OD-07 (deletion logging)

## Expected Outputs

### Edge Functions

#### `evidence-management`
- Upload document with metadata
- Validate document type against evidence canon
- Version control for document updates
- Link documents to dossiers
- Enforce completeness checks

#### `dossier-workflow`
- State transition execution
- Pre-transition validation
- Post-transition side effects
- Assignment management
- Escalation flag management

#### `raadvoorstel-generator`
- Generate DOCX from template
- Populate placeholders from dossier data
- Track generation history
- Support regeneration (Director-triggered per OD-06)

### Audit Enforcement
- Trigger on all INSERT/UPDATE operations
- Capture before/after state
- Log actor (user_id) and timestamp
- Log failed deletion attempts with reason

### Document Versioning
- Immutable document records
- Version chain via `previous_version_id`
- Latest version flagging

## Out of Scope

- Notification dispatch (Phase 5)
- Reminder scheduling (Phase 5)
- UI development (Phase 6)
- Schema changes (frozen after Phase 2)
- RLS changes (frozen after Phase 3)

---

**Status:** PENDING
**Gate Approval:** Required before execution
