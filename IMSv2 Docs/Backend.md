# IMS v2 – Backend Document

**Version:** 1.0  
**Status:** Planning  
**Date:** 2026-01-15  
**Source Documents:** Doc 7, Doc 8, Doc 9

---

## Overview

This document defines the **backend responsibilities** for IMS v2. It maps Supabase components to system requirements and establishes responsibility boundaries per service. No implementation code is included.

---

## Supabase Components

### 1. Authentication (Supabase Auth)

**Responsibility:** User identity and session management

**Features Used:**
- Email/password authentication
- Session token management (JWT)
- Password reset flow
- Session expiration handling

**Not Used (v2):**
- Social providers (Google, GitHub, etc.)
- Phone/SMS authentication
- Magic link authentication
- Multi-factor authentication (future consideration)

**Integration Points:**
- `auth.users` table linked to `public.users`
- JWT claims used for RLS policies
- Session validation in edge functions

---

### 2. Database (PostgreSQL)

**Responsibility:** Persistent data storage with row-level security

**Table Domains:**

#### Identity Domain
| Table | Responsibility |
|-------|----------------|
| `users` | User profile data, links to auth.users |
| `roles` | Role definitions (enum values) |
| `user_roles` | User-to-role assignments (junction) |
| `departments` | Organizational structure |

#### Person Domain
| Table | Responsibility |
|-------|----------------|
| `persons` | Applicant/citizen records |
| `households` | Household groupings |
| `household_members` | Person-to-household links |

#### Dossier Domain
| Table | Responsibility |
|-------|----------------|
| `dossiers` | Core dossier records |
| `dossier_states` | State history (append-only) |
| `documents` | Evidence metadata |

#### Bouwsubsidie Domain
| Table | Responsibility |
|-------|----------------|
| `technical_reports` | Technical assessment data |
| `budgets` | Budget preparation records |
| `raadvoorstellen` | Council proposal documents |
| `reviews` | Review records (social/financial/technical) |

#### Woningregistratie Domain
| Table | Responsibility |
|-------|----------------|
| `urgency_assessments` | Urgency scoring records |
| `allocations` | Housing assignment records |

#### Audit Domain
| Table | Responsibility |
|-------|----------------|
| `audit_logs` | Immutable audit trail (append-only) |
| `notifications` | Notification records |

---

### 3. Storage (Supabase Storage)

**Responsibility:** File storage for evidence documents

**Buckets:**

| Bucket | Purpose | Access |
|--------|---------|--------|
| `evidence` | Dossier documents | Role-restricted via RLS |
| `exports` | Generated reports | Time-limited URLs |

**File Operations:**
- Upload: Via edge function with validation
- Download: Via signed URLs with expiration
- Versioning: Metadata tracked in `documents` table
- Deletion: Soft delete only (mark as deleted, retain file)

**Constraints:**
- Maximum file size: TBD (recommend 10MB)
- Allowed types: PDF, images (TBD specific list)
- Naming: System-generated UUIDs, original name in metadata

---

### 4. Edge Functions (Deno Runtime)

**Responsibility:** Complex business logic requiring server-side execution

#### Function: `dossier-workflow`

**Purpose:** Handle state transitions with full validation

**Responsibilities:**
- Validate user role for requested transition
- Check current state allows target state
- Validate evidence requirements met
- Create state history record
- Create audit log entry
- Trigger notifications
- Return success/failure with details

**Triggers:**
- User initiates state change via UI
- Bulk operations (future, out of scope for v2)

---

#### Function: `evidence-management`

**Purpose:** Handle document upload and versioning

**Responsibilities:**
- Validate file type and size
- Generate storage path with UUID
- Upload to storage bucket
- Create document metadata record
- Handle version linking (previous_version_id)
- Create audit log entry

**Triggers:**
- User uploads document via UI

---

#### Function: `raadvoorstel-generator`

**Purpose:** Generate Raadvoorstel documents from template

**Responsibilities:**
- Validate dossier state = approved
- Fetch all required data points
- Populate Doc 11 template variables
- Generate PDF document
- Store in evidence bucket
- Create raadvoorstel record
- Invalidate previous raadvoorstel if exists
- Create audit log entry

**Template Variables (from Doc 11):**
| Variable | Source |
|----------|--------|
| `{{generation_date}}` | System timestamp |
| `{{subsidy_case_number}}` | dossiers.id |
| `{{applicant_full_name}}` | persons.full_name |
| `{{national_id}}` | persons.national_id |
| `{{household_size}}` | COUNT(household_members) |
| `{{district_name}}` | households.district |
| `{{address_full}}` | persons.contact_info |
| `{{application_date}}` | dossiers.created_at |
| `{{application_reason}}` | dossiers.reason |
| `{{requested_amount_srd}}` | budgets.requested_amount |
| `{{social_assessment_summary}}` | reviews (type=social) |
| `{{technical_assessment_summary}}` | technical_reports.summary |
| `{{approved_amount_srd}}` | budgets.approved_amount |
| `{{budget_year}}` | Current fiscal year |

---

#### Function: `notification-dispatch`

**Purpose:** Send notifications based on events

**Responsibilities:**
- Receive event trigger (state change, reminder, etc.)
- Determine notification type (mandatory/optional)
- Check user preferences (for optional)
- Create notification record
- Mark as pending delivery

**Notification Types (from Doc 8):**
| Type | Trigger | Mandatory |
|------|---------|-----------|
| State Change | Any transition | Yes |
| Assignment | Dossier assigned to user | Yes |
| Reminder | 60-day pending threshold | Yes |
| Escalation | 120-day pending threshold | Yes |
| Decision | Director/Minister decision | Yes |

---

#### Function: `reminder-scheduler`

**Purpose:** Check for pending dossiers requiring reminders

**Responsibilities:**
- Run on schedule (daily recommended)
- Query dossiers in pending states > 60 days
- Create reminder notifications
- Query dossiers in pending states > 120 days
- Create escalation records
- Notify Director of escalated items

**Schedule:**
- Run daily at 06:00 (configurable)
- Process all pending dossiers
- Idempotent (safe to re-run)

---

## Responsibility Boundaries

### What Runs Where

| Responsibility | Location | Reason |
|----------------|----------|--------|
| Authentication | Supabase Auth | Built-in, secure |
| Role checking | Security Definer Functions | Cannot be bypassed |
| Data access | RLS Policies | Enforced at DB level |
| State transitions | Edge Function | Complex validation |
| File upload | Edge Function | Validation required |
| Document generation | Edge Function | Template processing |
| Notifications | Edge Function | Event handling |
| Scheduled tasks | Edge Function (cron) | Reminder engine |
| UI rendering | Frontend (React) | User interaction |
| Form validation | Frontend + Backend | Defense in depth |

### What Does NOT Run in Frontend

- Role assignment changes
- State transition logic
- Audit log creation
- File storage operations
- Notification dispatch
- Any operation requiring secrets

---

## Event & Notification Flow

### Event Sources

```
┌─────────────────────────────────────────────────────────────┐
│                      EVENT SOURCES                          │
├─────────────────────────────────────────────────────────────┤
│  State Transition    │  Creates: state_changed event        │
│  Document Upload     │  Creates: document_added event       │
│  Review Submitted    │  Creates: review_completed event     │
│  Decision Made       │  Creates: decision_made event        │
│  Reminder Triggered  │  Creates: reminder_due event         │
│  Escalation Triggered│  Creates: escalation_required event  │
└─────────────────────────────────────────────────────────────┘
```

### Notification Processing

```
Event Created
      │
      ▼
┌─────────────────┐
│  Determine      │
│  Recipients     │ ◄── Based on role, assignment, escalation
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check          │
│  Preferences    │ ◄── Only for optional notifications
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create         │
│  Notification   │ ◄── Store in notifications table
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Mark           │
│  Pending        │ ◄── For async delivery
└─────────────────┘
```

### Notification Delivery

**In-App (v2):**
- Notifications stored in database
- Frontend polls or subscribes for new notifications
- User marks as read

**Email (Future):**
- Out of scope for v2
- Would require email service integration

---

## Audit Trail Integration (from Doc 7)

### Audit Log Structure

Every mutation creates an audit record with:
- `timestamp` - When it happened
- `actor_id` - Who did it (user_id)
- `action` - What was done (enum)
- `entity_type` - What was affected (table name)
- `entity_id` - Which record (UUID)
- `old_value` - Previous state (JSONB)
- `new_value` - New state (JSONB)
- `ip_address` - Client IP (if available)
- `session_id` - Session identifier

### Audit Rules

- Append-only: No updates or deletes allowed
- Immutable: Triggers prevent modification
- Complete: All state changes logged
- Timestamped: Server time, not client time

---

## Security Considerations

### Secrets Management

| Secret | Purpose | Storage |
|--------|---------|---------|
| JWT_SECRET | Token signing | Supabase managed |
| SERVICE_ROLE_KEY | Admin operations | Supabase managed |
| API keys (future) | External integrations | Supabase Secrets |

### Edge Function Security

- All edge functions verify JWT
- No direct database access without RLS
- Secrets accessed via `Deno.env.get()`
- CORS headers configured for allowed origins

### Storage Security

- Bucket policies enforce RLS
- Signed URLs with expiration
- No public bucket access
- File type validation before storage

---

## Open Decisions (Backend Impact)

| ID | Decision | Backend Impact |
|----|----------|----------------|
| OD-06 | Raadvoorstel regeneration trigger | Generator function logic |
| OD-07 | Document deletion logging | Storage delete handling |

---

## Document References

- Doc 7: Audit, Logging & Legal Traceability
- Doc 8: Notifications, Reminders & Escalation Rules
- Doc 9: Architecture & Supabase Translation

---

**Await Further Instructions.**
