# IMS v2 – Audit, Logging & Legal Traceability

## 1. Purpose of this Document
This document defines the **audit, logging, and legal traceability framework** for IMS v2.

It ensures that every action taken within the system is:
- attributable
- immutable
- reviewable
- legally defensible

This document is authoritative for compliance, oversight, and external audit readiness.

---

## 2. Core Audit Principles

1. **Full Traceability** – every meaningful action must be traceable to a person, role, and time
2. **Immutability** – audit records cannot be edited or deleted
3. **Non-Repudiation** – actors cannot deny actions taken
4. **Separation of Evidence and Decision** – documents are evidence; decisions reference evidence
5. **Read-Only Audit Access** – audit viewers can never alter operational data

---

## 3. What Must Always Be Logged (Mandatory Events)

The following events are **always logged**, regardless of user role or preferences:

### 3.1 Dossier Lifecycle Events
- Dossier creation
- State transitions (all)
- Dossier merges
- Dossier locking / closure

### 3.2 Decision Events
- Review approvals and rejections
- Director decisions
- Minister decisions
- Raadvoorstel generation, invalidation, submission

### 3.3 Return & Correction Events
- Dossier returned (any step)
- Mandatory motivation text
- Target state of return

### 3.4 Document Events
- Document upload
- Document version append
- Document deletion attempt (blocked + logged)

### 3.5 Administrative Events
- Role assignments and changes
- Permission changes
- Configuration changes impacting workflow

---

## 4. Audit Record Structure (Conceptual)

Each audit record must include at minimum:
- Unique audit ID
- Dossier ID (if applicable)
- Actor user ID
- Actor role at time of action
- Action type
- Previous state
- New state
- Timestamp (system-generated)
- Justification or comment (if required)

Audit records are **append-only**.

---

## 5. Visibility & Access Control

### 5.1 Who May View Audit Logs

| Role | Audit Visibility |
|-----|-----------------|
| Frontdesk Officer | Limited (own dossiers only) |
| Control Officer | Limited (assigned dossiers) |
| Reviewer | Limited |
| Director | Full (service scope) |
| Minister | Full (Bouwsubsidie only) |
| Auditor / Oversight | Full (read-only) |
| System Administrator | System-level (read-only) |

### 5.2 Who May Not
- No role may edit or delete audit records
- No operational role may disable logging

---

## 6. Legal Traceability Guarantees

IMS v2 must be able to answer the following questions at any time:

- Who made this decision?
- Under which role and authority?
- Based on which evidence?
- When was the decision made?
- What was the previous state?
- Was the decision ever returned or corrected?

If any question cannot be answered, the system is considered **non-compliant**.

---

## 7. Long-Running Dossiers & Oversight

- Any dossier inactive for more than **60 days** triggers:
  - mandatory reminder log
  - visibility flag for management

These reminders are logged as audit events.

---

## 8. Evidence Preservation

- Documents attached to a dossier are preserved indefinitely
- New versions may be appended
- Historical versions remain accessible for audit

---

## 9. Export & External Audit Support

IMS v2 must support:
- Full dossier audit export
- Chronological audit trail export
- Evidence bundle export (documents + decisions)

Exports are read-only and watermarked.

---

## 10. Dependency on Next Document

This audit framework feeds directly into:

**IMS v2 – Notifications, Reminders & Escalation Rules**

All notifications must reference logged events.