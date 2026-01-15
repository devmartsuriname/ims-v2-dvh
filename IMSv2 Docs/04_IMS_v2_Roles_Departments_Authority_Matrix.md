# IMS v2 – Roles, Departments & Authority Matrix

## 1. Purpose of this Document
This document defines **all roles, departments, and authorities** within IMS v2 and maps them explicitly to the workflow steps defined in **IMS v2 – End-to-End Workflow Definitions**.

This document is **authoritative** for:
- Role-Based Access Control (RBAC / RLS)
- Separation of duties
- Legal accountability
- Audit enforcement

No role, permission, or authority may be implemented unless it is defined here.

---

## 2. Core Governance Principles

1. **One role per action** – no role may approve its own previous work
2. **Strict separation of duties** – especially between control, review, and decision
3. **Explicit authority only** – absence of permission means denial
4. **Ministerial authority is final** where applicable
5. **All role actions are auditable**

---

## 3. Departments (Organizational Units)

### 3.1 Frontdesk Department
Responsible for intake, applicant interaction, and dossier completeness.

### 3.2 Control Department (Technical Team)
Responsible for technical inspections, reports, and budget preparation.

### 3.3 Review Department
Responsible for social and consolidated reviews (non-technical).

### 3.4 Management Department
Responsible for administrative oversight and director-level review.

### 3.5 Ministerial Office
Responsible for final decisions in Bouwsubsidie cases.

### 3.6 System Administration
Responsible for system configuration and user management.

---

## 4. Defined Roles

### 4.1 Frontdesk Officer

**Primary responsibilities:**
- Create dossiers
- Upload documents
- Communicate with applicants

**Permissions:**
- Create dossiers
- Upload and replace documents (before lock)
- View dossier status
- Return dossiers to applicant after rejection

**Restrictions:**
- Cannot approve reviews
- Cannot modify urgency
- Cannot decide or lock dossiers

---

### 4.2 Control Officer (Technical)

**Primary responsibilities:**
- Conduct site visits (Bouwsubsidie)
- Upload technical reports
- Prepare budgets

**Permissions:**
- Access assigned dossiers
- Upload technical evidence
- Submit technical reports
- Create budget entries

**Restrictions:**
- Cannot approve own reports
- Cannot make final decisions

---

### 4.3 Social Reviewer

**Primary responsibilities:**
- Assess household and social context

**Permissions:**
- Submit social review
- View dossier history

**Restrictions:**
- Cannot edit technical or financial data
- Cannot decide or lock dossiers

---

### 4.4 Financial Reviewer

**Primary responsibilities:**
- Review prepared budgets
- Validate financial consistency

**Permissions:**
- Approve or return budget reviews

**Restrictions:**
- Cannot prepare budgets
- Cannot decide final outcomes

---

### 4.5 Director

**Primary responsibilities:**
- Consolidated review
- Managerial oversight

**Permissions:**
- View full dossier
- Approve or return dossiers
- Reject dossiers

**Restrictions:**
- Cannot override ministerial authority

---

### 4.6 Minister

**Primary responsibilities:**
- Final decision authority (Bouwsubsidie only)

**Permissions:**
- View all Bouwsubsidie dossiers
- Approve or reject
- Return dossiers for correction

**Restrictions:**
- No direct document editing
- No budget creation

---

### 4.7 Allocation Officer

**Primary responsibilities:**
- Manual housing allocation (Woningregistratie)

**Permissions:**
- Assign housing
- Finalize allocation

**Restrictions:**
- Cannot modify urgency scores
- Cannot edit applicant data

---

### 4.8 System Administrator

**Primary responsibilities:**
- User management
- Role assignment
- System configuration

**Permissions:**
- Create and manage users
- Assign roles
- Configure notification rules

**Restrictions:**
- No dossier decisions
- No content modification

---

## 5. Role-to-Workflow Mapping (Summary)

| Workflow Step | Authorized Roles |
|--------------|------------------|
| Intake | Frontdesk Officer |
| Controle | Control Officer |
| Technical Review | Control Officer (submit) |
| Social Review | Social Reviewer |
| Financial Review | Financial Reviewer |
| Director Review | Director |
| Raadvoorstel | System-generated (Director initiates) |
| Minister Decision | Minister |
| Allocation | Allocation Officer |
| Dossier Lock | Director / Minister (service-dependent) |

---

## 6. Separation of Duties Enforcement

- No user may hold:
  - Control Officer and Director simultaneously
  - Reviewer and Minister simultaneously
- Role conflicts are prevented at assignment level

---

## 7. Audit & Accountability

For every role action, IMS must record:
- User identity
- Role at time of action
- Timestamp
- Action performed
- Previous and resulting state

---

## 8. Dependency on Next Document

This authority matrix feeds directly into:

**IMS v2 – Dossier State Machine & Transition Rules**

No state transition may be defined without a corresponding authorized role.