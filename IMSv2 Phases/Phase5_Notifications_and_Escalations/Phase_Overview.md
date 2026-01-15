# Phase 5: Notifications and Escalations

## Purpose

Implement the notification dispatch system and escalation rule enforcement. This phase creates the backend services responsible for alerting users about workflow events and managing time-based escalations.

## Scope

- Create `notification-dispatch` Edge Function
- Create `reminder-scheduler` Edge Function
- Implement mandatory notification triggers
- Implement optional notification preferences
- Implement escalation flag logic
- Implement reminder rules (60-day, 14-day thresholds)

## Inputs (Authoritative Documents)

- Doc 08: Notifications, Reminders & Escalation Rules
- `IMSv2_Open_Decisions_Resolution.md` — OD-04 (escalation flag behavior)

## Expected Outputs

### Edge Functions

#### `notification-dispatch`
- Event-driven notification creation
- Channel routing (email, system inbox)
- Template-based message formatting
- Recipient resolution by role
- Mandatory vs optional notification handling

#### `reminder-scheduler`
- Scheduled job execution (cron-based)
- Long-running dossier detection (60+ days)
- Pending action detection (14+ days)
- Reminder notification generation
- Escalation trigger at 120+ days

### Notification Types

#### Mandatory (Non-Configurable)
- Dossier returned for revision
- Dossier approved
- Dossier rejected
- Director decision required
- Minister decision required
- Missing documents flagged
- Escalation triggered

#### Optional (User-Configurable)
- New assignment received
- Upcoming site visit
- New comment added
- Status change notification

### Escalation Logic
- `escalation_flag` set to TRUE at 120+ days
- `escalation_date` recorded
- Management notification triggered
- Dashboard visibility flag enabled
- Escalated dossiers return to normal workflow (per OD-04)

## Out of Scope

- UI development (Phase 6)
- Document management (Phase 4)
- Schema changes (frozen)
- RLS changes (frozen)
- Email service provider integration (uses Supabase built-in or approved external)

---

**Status:** PENDING
**Gate Approval:** Required before execution
