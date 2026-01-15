# IMS v2 – Architecture & Supabase Translation (Schema + RLS)

## 1. Purpose of this Document
This document translates **IMS v2 governance (Docs 1–9)** into a **concrete system architecture**, including:
- Logical system architecture
- Supabase database schema (conceptual → implementable)
- Role-Based Access Control via Supabase RLS

This document is **implementation-authoritative**. No schema, table, or policy may be created outside this specification.

---

## 2. High-Level System Architecture

### 2.1 Architectural Overview

IMS v2 is a **backend-first internal system** built on:
- Frontend: Darkone Admin (React)
- Backend: Supabase (Postgres + Auth + Storage)
- Access Control: Supabase Auth + Row Level Security (RLS)

There is **no public frontend** and no anonymous access.

```
[ Darkone Admin UI ]
        |
        v
[ Supabase API Layer ]
        |
        v
[ Postgres DB + RLS ]
        |
        v
[ Audit / Storage / Notifications ]
```

---

## 3. Core Data Domains

The system is organized into the following domains:

1. Identity & Access
2. Organizational Structure
3. Dossiers & Workflow
4. Evidence & Documents
5. Decisions & Reviews
6. Audit & Notifications

Each domain maps directly to governance documents.

---

## 4. Supabase Schema – Core Tables

### 4.1 Identity & Access

#### users
- id (uuid, auth.uid)
- email
- full_name
- is_active
- created_at

#### roles
- id
- code (frontdesk, control_officer, reviewer, director, minister, allocation_officer, admin)
- description

#### user_roles
- user_id
- role_id
- assigned_at

**Rules:**
- One active operational role per user
- Conflicting roles are blocked at assignment time

---

### 4.2 Organizational Structure

#### departments
- id
- code (frontdesk, control, review, management, ministerial)
- name

---

### 4.3 Persons & Households

#### persons
- id
- national_id
- full_name
- date_of_birth
- contact_info

#### households
- id
- primary_person_id

#### household_members
- household_id
- person_id
- relation_type

---

### 4.4 Dossiers (Core)

#### dossiers
- id
- service_type (bouwsubsidie | woningregistratie)
- household_id
- current_state
- urgency_score
- is_locked
- created_at

#### dossier_states (history)
- id
- dossier_id
- from_state
- to_state
- actor_user_id
- actor_role
- motivation
- created_at

---

## 5. Service-Specific Tables

### 5.1 Bouwsubsidie

#### technical_reports
- id
- dossier_id
- report_data (jsonb)
- submitted_by
- submitted_at

#### budgets
- id
- dossier_id
- total_amount
- breakdown (jsonb)

#### raadvoorstellen
- id
- dossier_id
- content_snapshot
- status (generated | invalidated | submitted)

---

### 5.2 Woningregistratie

#### urgency_assessments
- id
- dossier_id
- score
- justification
- submitted_by

#### allocations
- id
- dossier_id
- assigned_unit
- assigned_by
- assigned_at

---

## 6. Evidence & Documents

#### documents
- id
- dossier_id
- category
- file_path
- version
- uploaded_by
- uploaded_at

Documents are stored in **Supabase Storage**, metadata only in DB.

---

## 7. Audit & Notifications

#### audit_logs
- id
- dossier_id
- actor_user_id
- actor_role
- action
- metadata (jsonb)
- created_at

#### notifications
- id
- user_id
- event_type
- related_audit_id
- is_mandatory
- sent_at

---

## 8. Row Level Security (RLS) – Core Principles

### 8.1 General Rules
- RLS enabled on **all tables**
- Default deny
- Access granted strictly by role + dossier state

---

### 8.2 Example RLS Policies (Conceptual)

#### Dossiers – Frontdesk
- Can SELECT dossiers they created
- Can UPDATE only when state in (Draft, Intake Returned)

#### Control Officer
- Can SELECT assigned dossiers
- Can INSERT technical_reports

#### Director
- Can SELECT all dossiers within service scope
- Can UPDATE state to Director Returned / Raadvoorstel Generated

#### Minister
- Can SELECT Bouwsubsidie dossiers
- Can UPDATE state only in Minister Review

---

## 9. State Enforcement

- current_state in dossiers is updated **only via controlled function**
- State transitions validated against Doc 5
- Direct updates are blocked

---

## 10. Audit Enforcement

- All INSERT/UPDATE on critical tables trigger audit_logs
- No DELETE allowed on:
  - dossiers
  - documents
  - audit_logs

---

## 11. Non-Goals (Explicit)

- No public schemas
- No anonymous access
- No bypass endpoints
- No soft deletes

---

## 12. Dependency & Next Step

This document enables:
- Physical schema creation
- RLS policy implementation
- Lovable Phase 0–1 execution

Next step requires:
**Explicit instruction to begin Phase 0 – Implementation Context Lock**