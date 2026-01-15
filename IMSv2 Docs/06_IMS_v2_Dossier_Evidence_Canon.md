# IMS v2 – Dossier & Evidence Canon

## 1. Purpose of this Document
This document defines the **authoritative canon of documents and evidence** for IMS v2.

It specifies:
- Mandatory vs optional documents per service
- Validation rules (presence vs content)
- Versioning and immutability rules
- Reuse of evidence across services

This document is binding for:
- Intake validation
- Workflow gating
- Audit and legal traceability

---

## 2. Core Evidence Principles

1. **Presence-first validation** – the system validates that required evidence exists before advancing states
2. **No content adjudication by the system** – reviewers assess content, not the platform
3. **Append-only versioning** – evidence is never overwritten
4. **Service-aware requirements** – requirements may differ per service
5. **Household reuse** – evidence may be reused across dossiers where legally permitted

---

## 3. Evidence Categories (Canonical)

All documents fall into one of the following categories:

- Identification
- Household composition
- Property / occupancy
- Technical
- Financial
- Administrative
- Correspondence

Each document is tagged with:
- category
- service applicability
- required/optional flag

---

## 4. Construction Subsidy (Bouwsubsidie) – Mandatory Evidence

### 4.1 Identification & Household
- Applicant national ID (mandatory)
- Household composition statement (mandatory)
- Proof of residence (mandatory)

### 4.2 Property & Occupancy
- Property ownership or usage proof (mandatory)
- Site location details (mandatory)

### 4.3 Technical Evidence
- Technical inspection report (mandatory)
- Site visit photos (mandatory)

### 4.4 Financial Evidence
- Budget / cost breakdown (mandatory)
- Income or affordability indicators (mandatory)

### 4.5 Administrative
- Application letter or form (mandatory)
- Prior decision references (if applicable)

---

## 5. Housing Registration (Woningregistratie) – Mandatory Evidence

### 5.1 Identification & Household
- Applicant national ID (mandatory)
- Household composition statement (mandatory)

### 5.2 Occupancy & Status
- Proof of current housing situation (mandatory)
- Declaration of housing need (mandatory)

### 5.3 Administrative
- Registration form (mandatory)

No technical or financial evidence is required for Woningregistratie.

---

## 6. Optional & Conditional Evidence (Both Services)

The following evidence may be attached when applicable:
- Medical or vulnerability statements
- Urgency justification documents
- Legal correspondence
- Appeals or objections

These documents:
- are never mandatory by default
- may influence review outcomes

---

## 7. Validation Rules

### 7.1 Intake Gatekeeping

- A dossier **cannot advance** past Intake unless all mandatory evidence is present
- Presence validation only (file exists)

### 7.2 Review Validation

- Reviewers may flag evidence as insufficient
- This triggers a **return**, not deletion

---

## 8. Versioning & Evidence Integrity

- Evidence files are immutable after upload
- Corrections require **new versions**
- All versions remain accessible
- Deletion is prohibited

---

## 9. Evidence Reuse Across Dossiers

- Evidence may be reused within the same household
- Reuse creates a reference, not a copy
- Original audit trail remains intact

---

## 10. Audit & Export Requirements

- All evidence actions are logged
- Dossier export includes:
  - all evidence
  - all versions
  - linkage metadata

---

## 11. Dependency on Next Document

This evidence canon feeds directly into:

**IMS v2 – PRD (Product Requirements Document)**

The PRD must not introduce evidence requirements not defined here.