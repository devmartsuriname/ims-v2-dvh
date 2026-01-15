# IMS v2 — Darkone Admin

## Governance & Execution Instruction Block

**Decision: PROCEED CONFIRMED ✅**

*(Project is now under full Devmart Governance)*

---

## GOVERNANCE FOUNDATION (NON-NEGOTIABLE)

This project is governed by:

- **Devmart Darkone Admin Standard** (1:1 compliance)
- **IMS v2 Canonical Documentation Set**
- **Phase-Gated, Documentation-First execution model**

At no point may you:

- Introduce your own layout system
- Add custom Bootstrap components
- Add spinners, loaders, skeletons outside Darkone
- Introduce new UI patterns
- Introduce new dependencies or libraries
- Deviate from Darkone Admin 1:1 behavior

**ALL UI, UX, layout, forms, modals, tables, alerts, and states MUST be reused from Darkone Admin as-is.**

---

## VALIDATION SCOPE (PER TASK)

Each task you perform MUST clearly state:

- **Validation scope** (what is being changed and why)
- **Files touched** (explicit file paths)
- **Constraints respected**
- **Restore point reference**
- **Checklist report** (Implemented / Skipped / Partial)

You may ONLY work within the explicitly approved scope.

**Anything outside scope = HARD STOP.**

---

## CONSTRAINTS (ABSOLUTE)

The following are **STRICTLY FORBIDDEN** unless explicitly approved:

- Schema changes (Supabase)
- RLS policy changes
- Auth or role changes
- Edge Function changes
- Backend logic expansion
- UX redesign
- Refactors outside the approved phase
- Public/frontend work
- Wizard or citizen portal work

**If you encounter a requirement that would violate any of the above: STOP and REPORT — do not implement.**

---

## ERROR HANDLING & SAFE FAILURE STATES

*(Preview scope — execution still gated per phase)*

When error handling is approved, it must follow:

- Darkone-standard error boundaries only
- User-safe messaging (no raw stack traces)
- Graceful fallback UI for:
  - Network failures
  - 4xx responses
  - 5xx responses
- Inline validation for forms
- Toasts ONLY for backend / API errors

**No UX redesign. No new UI components. No visual experiments.**

---

## RESTORE POINT DISCIPLINE (MANDATORY)

**Before ANY work:**

1. Create a restore point
   - Name it clearly
   - Reference the phase and task

**After work:**

2. Confirm restore point integrity
3. Report changes explicitly

**Skipping restore points = INVALID WORK.**

---

## REQUIRED END OUTPUT (MANDATORY FORMAT)

Your completion message MUST include a checklist report with:

### 1) Implemented
- Explicit list of what was done
- File paths included

### 2) Skipped
- Explicit list
- Clear reason (scope, risk, dependency)

### 3) Partial
- What is incomplete
- Why it remains incomplete
- What blocks completion

### 4) Verification steps performed
- What you checked
- How regressions were avoided

### 5) Explicit confirmation:
- No schema changes
- No RLS changes
- No auth changes
- No new dependencies
- Darkone Admin 1:1 preserved

---

## HARD STOP RULE

After completing the approved task and checklist report:

- **STOP**
- Do NOT proceed with new features
- Do NOT continue implementation
- Await explicit next instruction

---

**Await Further Instructions:**

Do not proceed with additional features unless the user provides explicit instructions on the next priority.
