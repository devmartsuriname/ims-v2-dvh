# Phase 6: UI Module Wiring

## Purpose

Build all frontend modules using the Darkone Admin template as the immutable UI baseline. This phase creates the user-facing application while maintaining strict 1:1 compliance with Darkone Admin patterns.

## Scope

- Authentication module (login, logout, session management)
- Dashboard module (role-based views)
- Dossier management module (CRUD, state transitions)
- Evidence management module (upload, view, download)
- Workflow module (task queues, assignments)
- Review module (social, financial, technical reviews)
- Raadvoorstel module (generation, approval)
- Audit trail module (read-only log viewing)
- Admin module (user management, role assignment)
- All modules use Darkone Admin components 1:1

## Inputs (Authoritative Documents)

- Doc 10: Product Requirements Document (PRD)
- `IMSv2_Darkone_Admin_Governance.md` — Binding UI rules

## Expected Outputs

### Modules per PRD

#### Authentication
- Login page (Darkone pattern)
- Session management
- Role-based redirect

#### Dashboard
- Role-specific widgets
- Quick action cards
- Dossier status summary
- Pending tasks list

#### Dossier Management
- Dossier list (filterable, sortable)
- Dossier detail view
- State transition actions
- Assignment display

#### Evidence Management
- Document upload (Darkone file input)
- Document list per dossier
- Document preview/download
- Version history display

#### Workflow
- Task queue per role
- Assignment acceptance
- Handoff actions

#### Reviews
- Social review form
- Financial review form
- Technical review form (Control Officer)
- Review history display

#### Raadvoorstel
- Generation trigger (Director only)
- Preview display
- Approval workflow
- Minister decision capture

#### Audit Trail
- Log viewer (read-only)
- Filter by dossier, user, action
- Export capability

#### Admin
- User list management
- Role assignment modal
- Department management

### UI Constraints (NON-NEGOTIABLE)
- Darkone Admin layout only
- Darkone Admin components only
- No custom Bootstrap
- No custom spinners/loaders
- No new UI patterns
- Modals preferred over new pages

## Out of Scope

- Backend changes
- Schema changes
- RLS changes
- Edge Function changes
- New dependencies
- Public citizen portal
- Mobile-native patterns

---

**Status:** PENDING
**Gate Approval:** Required before execution
