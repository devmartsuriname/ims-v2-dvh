# IMS v2 – Dossier State Machine & Transition Rules

## 1. Purpose of this Document
This document defines the **authoritative dossier state machines** for IMS v2.

It specifies:
- All valid dossier states per service
- Allowed state transitions
- Authorized roles per transition
- Return paths and locking behavior

This document is binding for:
- Backend state enforcement
- RLS policies
- Audit logging
- SLA and notification triggers

---

## 2. Global State Machine Rules (All Services)

1. Every dossier has **exactly one active state** at any time
2. State transitions are **explicit and role-bound**
3. No state may be skipped
4. All transitions are logged (actor, role, timestamp, justification)
5. Returned states require mandatory motivation
6. Locked states are immutable

---

## 3. Bouwsubsidie – State Machine

### 3.1 Allowed States

1. Draft (Created)
2. Intake Submitted
3. Intake Returned
4. Control Assigned
5. Control Completed
6. Reviews Pending
7. Reviews Returned
8. Director Review
9. Director Returned
10. Raadvoorstel Generated
11. Minister Review
12. Minister Returned
13. Approved (Granted)
14. Rejected (Denied)
15. Closed (Locked)

---

### 3.2 State Transitions & Authority

| From State | To State | Authorized Role | Notes |
|----------|---------|----------------|------|
| Draft | Intake Submitted | Frontdesk Officer | Completeness required |
| Intake Submitted | Intake Returned | Frontdesk Officer | Motivation required |
| Intake Submitted | Control Assigned | Frontdesk Officer | Assignment only |
| Control Assigned | Control Completed | Control Officer | Technical report attached |
| Control Completed | Reviews Pending | System | Auto-transition |
| Reviews Pending | Reviews Returned | Reviewer | Any failed review |
| Reviews Pending | Director Review | System | All reviews approved |
| Reviews Returned | Control Assigned | Director | Correction cycle |
| Director Review | Director Returned | Director | Motivation required |
| Director Review | Raadvoorstel Generated | Director | Approval |
| Raadvoorstel Generated | Minister Review | System | Auto-transition |
| Minister Review | Minister Returned | Minister | Motivation required |
| Minister Review | Approved (Granted) | Minister | Final decision |
| Minister Review | Rejected (Denied) | Minister | Final decision |
| Approved (Granted) | Closed (Locked) | System | Finalization |
| Rejected (Denied) | Closed (Locked) | System | Finalization |

---

## 4. Woningregistratie – State Machine

### 4.1 Allowed States

1. Draft (Created)
2. Intake Submitted
3. Intake Returned
4. Validation Pending
5. Validation Returned
6. Urgency Scored
7. Administrative Review
8. Approved (Registered)
9. Rejected (Denied)
10. Closed (Locked)

---

### 4.2 State Transitions & Authority

| From State | To State | Authorized Role | Notes |
|----------|---------|----------------|------|
| Draft | Intake Submitted | Frontdesk Officer | Completeness required |
| Intake Submitted | Intake Returned | Frontdesk Officer | Motivation required |
| Intake Submitted | Validation Pending | Frontdesk Officer | |
| Validation Pending | Validation Returned | Reviewer | |
| Validation Pending | Urgency Scored | Reviewer | Score locked |
| Urgency Scored | Administrative Review | System | Auto-transition |
| Administrative Review | Approved (Registered) | Director | |
| Administrative Review | Rejected (Denied) | Director | |
| Approved (Registered) | Closed (Locked) | System | Eligible for allocation |
| Rejected (Denied) | Closed (Locked) | System | Final |

---

## 5. Return & Correction Rules

- Every return transition:
  - requires mandatory motivation
  - triggers notification
  - is visible in audit logs

Returned dossiers resume at the **last valid operational state**.

---

## 6. Locking Rules

- Closed (Locked) is terminal
- No modifications allowed after lock
- Read-only access remains

---

## 7. Long-Running Dossier Handling

- If a dossier remains in any non-terminal state > 60 days:
  - Mandatory reminder is issued
  - Escalation visible to management

---

## 8. Dependency on Next Document

This state machine definition feeds directly into:

**IMS v2 – Notifications, Reminders & Escalation Rules**

State transitions define mandatory notification triggers.