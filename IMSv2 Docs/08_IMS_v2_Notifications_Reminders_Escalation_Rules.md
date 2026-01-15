# IMS v2 – Notifications, Reminders & Escalation Rules

## 1. Purpose of this Document
This document defines the **notification, reminder, and escalation framework** for IMS v2.

It specifies:
- Which system events trigger notifications
- Which notifications are mandatory vs optional
- Who receives which notification
- How reminders and escalations are handled

This document is authoritative for user communication behavior and compliance signaling.

---

## 2. Core Notification Principles

1. Notifications are **event-driven**, never manual
2. Mandatory notifications **cannot be disabled** by users
3. Optional notifications respect user preferences
4. All notifications reference a logged audit event
5. Notifications never alter dossier state

---

## 3. Mandatory Notifications (Non-Configurable)

The following notifications are **always sent**, regardless of user preferences:

### 3.1 Dossier Workflow Events
- Dossier returned (any step)
- Dossier approved
- Dossier rejected
- Dossier locked / closed

### 3.2 Decision Authority Events
- Director decision completed
- Minister decision completed
- Raadvoorstel generated or invalidated

### 3.3 Compliance & Governance Events
- Missing mandatory documents
- Unauthorized action attempt (blocked)
- Long-running dossier escalation

---

## 4. Optional Notifications (User-Configurable)

The following notifications may be enabled or disabled per user role:

- Assignment to dossier
- Upcoming scheduled control visit
- New comment added
- Status changed (non-decision)

User preferences may never suppress mandatory notifications.

---

## 5. Reminder Rules

### 5.1 Long-Running Dossiers

- If a dossier remains in a non-terminal state for **60 days**:
  - Reminder is sent to responsible role
  - Reminder is logged as audit event

- Repeats every 60 days until resolved

### 5.2 Pending Actions

- Pending review or decision > 14 days:
  - Reminder to assigned role

---

## 6. Escalation Rules

### 6.1 Automatic Escalation

- Dossier pending > 120 days:
  - Escalation notification to management
  - Visibility flag raised

### 6.2 Ministerial Visibility

- All escalated Bouwsubsidie dossiers are visible to Minister

---

## 7. Notification Recipients (By Role)

| Event | Recipient(s) |
|-----|--------------|
| Dossier Returned | Frontdesk + Previous Actor |
| Review Required | Assigned Reviewer |
| Director Review Ready | Director |
| Minister Review Ready | Minister |
| Allocation Ready | Allocation Officer |
| Dossier Closed | Frontdesk + Management |

---

## 8. Communication Channels

IMS v2 supports internal communication via:
- Email notifications
- System inbox
- Template-based messages (email / letter / WhatsApp-style)

No public or citizen-facing communication is included.

---

## 9. Audit Linkage

Every notification must:
- Reference a unique audit event ID
- Be traceable to a system action

---

## 10. Dependency on Next Document

This notification framework feeds directly into:

**IMS v2 – Dossier & Evidence Canon**

Notifications may reference required or missing documents.