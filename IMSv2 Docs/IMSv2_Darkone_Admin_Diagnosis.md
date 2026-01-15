# IMS v2 — Darkone Admin Baseline Diagnosis

**Document Version:** 1.0  
**Created:** 2026-01-15  
**Status:** Documentation Complete  
**Governance:** Darkone Admin 1:1 Compliance

---

## 1. Route Diagnosis

### 1.1 Routes to KEEP

These routes provide core structural patterns required for IMSv2:

| Route Pattern | Purpose | IMSv2 Usage |
|---------------|---------|-------------|
| `/` | Root redirect | Entry point |
| `/dashboards/*` | Dashboard layouts | IMSv2 Dashboard modules |
| `/auth/login` | Login page | Supabase Auth integration |
| `/auth/logout` | Logout handler | Supabase Auth integration |
| `/auth/register` | Registration | User onboarding (if required) |
| `/pages/error-404` | 404 handler | Error handling |
| `/pages/error-500` | 500 handler | Error handling |

### 1.2 Routes to REMOVE

These routes are demo/placeholder content with no IMSv2 relevance:

| Route Pattern | Reason for Removal |
|---------------|-------------------|
| `/apps/calendar` | Demo app - not in IMSv2 scope |
| `/apps/chat` | Demo app - not in IMSv2 scope |
| `/apps/email/*` | Demo app - not in IMSv2 scope |
| `/apps/tasks/*` | Demo app - replaced by IMSv2 workflow |
| `/apps/kanban` | Demo app - not in IMSv2 scope |
| `/apps/file-manager` | Demo app - replaced by Evidence module |
| `/apps/notes` | Demo app - not in IMSv2 scope |
| `/apps/contacts/*` | Demo app - not in IMSv2 scope |
| `/ui/*` | UI component demos |
| `/extended-ui/*` | Extended UI demos |
| `/icons/*` | Icon demos |
| `/charts/*` | Chart demos (patterns kept, pages removed) |
| `/forms/*` | Form demos |
| `/tables/*` | Table demos |
| `/maps/*` | Map demos |
| `/maps/vector` | World/Vector map demo - not in IMSv2 scope |
| `/pages/pricing` | Demo page |
| `/pages/timeline` | Demo page |
| `/pages/invoice` | Demo page |
| `/pages/faqs` | Demo page |
| `/pages/gallery` | Demo page |
| `/pages/maintenance` | Demo page |
| `/pages/coming-soon` | Demo page |
| `/dark-sidenav` | Layout demo - not in IMSv2 scope |
| `/dark-topnav` | Layout demo - not in IMSv2 scope |
| `/small-sidenav` | Layout demo - not in IMSv2 scope |
| `/hidden-sidenav` | Layout demo - not in IMSv2 scope |
| `/dark-mode` | Layout demo - not in IMSv2 scope |

### 1.3 Routes to REPLACE (IMSv2 Modules)

These routes will be replaced with IMSv2-specific implementations:

| Darkone Route | IMSv2 Replacement | Module Reference |
|---------------|-------------------|------------------|
| `/dashboards/analytics` | `/dashboard/dossiers` | Dossier Dashboard |
| `/dashboards/crm` | `/dashboard/workflow` | Workflow Overview |
| `/dashboards/sales` | `/dashboard/reports` | Reporting Dashboard |
| N/A (new) | `/dossiers/*` | Dossier Management |
| N/A (new) | `/evidence/*` | Evidence Management |
| N/A (new) | `/raadvoorstel/*` | Raadvoorstel Generation |
| N/A (new) | `/audit/*` | Audit & Compliance |
| N/A (new) | `/admin/*` | Administration |

---

## 2. Module Analysis

### 2.1 Dashboard Module

**Current State:** Demo data and demo widgets  
**IMSv2 Action:** REPLACE content, KEEP layout patterns

| Component | Status | Notes |
|-----------|--------|-------|
| Dashboard layouts | KEEP | Reuse grid/card patterns |
| Demo widgets | REMOVE | Replace with IMSv2 widgets |
| Demo statistics | REMOVE | Replace with Supabase data |
| Navigation structure | KEEP | Adapt menu items |

### 2.2 Authentication Module

**Current State:** Demo/fake authentication  
**IMSv2 Action:** REPLACE with Supabase Auth

| Component | Status | Notes |
|-----------|--------|-------|
| Login page layout | KEEP | Reuse UI structure |
| Register page layout | KEEP | Reuse UI structure |
| Fake backend auth | REMOVE | Replace with Supabase |
| Auth context | REPLACE | Supabase Auth context |
| Protected routes | KEEP pattern | Update with Supabase session |

### 2.3 Charts Module

**Current State:** ApexCharts demos  
**IMSv2 Action:** KEEP patterns, REPLACE data

| Chart Type | IMSv2 Usage | Notes |
|------------|-------------|-------|
| Line charts | Dossier trends | Timeline visualizations |
| Bar charts | Status distributions | State machine metrics |
| Pie/Donut charts | Category breakdowns | Department distributions |
| Area charts | Volume over time | Workflow throughput |
| Sparklines | REUSE | Inline metrics / quick status indicators |
| Mixed charts | REMOVE | Demo only |
| Radial charts | REMOVE | Demo only |
| Polar charts | REMOVE | Demo only |
| Radar charts | REMOVE | Demo only |
| World/Vector maps | REMOVE | Demo only - reference: `/maps/vector` |

**Retained Chart Patterns:**
- ApexCharts configuration structure
- Responsive chart containers
- Theme-aware color schemes
- Data formatting utilities

---

## 3. Naming & Branding

### 3.1 Text Replacements Required

| Current | Replacement |
|---------|-------------|
| Darkone | DVH IMSv2 |
| Darkone Admin | DVH IMSv2 |
| Darkone Dashboard | IMSv2 Dashboard |
| Welcome to Darkone | Welcome to DVH IMSv2 |

### 3.2 Logo Assets

**Status:** Placeholder acknowledged  
**Action Required:** DVH logo assets to be provided  
**Locations to Update:**
- `/public/` - favicon and app icons
- `/src/assets/images/logo/` - logo variants
- Navbar logo component
- Login/Register page logos
- Email templates (if applicable)

### 3.3 Meta Information

| Element | Current | Target |
|---------|---------|--------|
| Page titles | Darkone | DVH IMSv2 |
| Meta description | Darkone Admin | DVH Internal Management System |
| OG tags | Darkone | DVH IMSv2 |

### 3.4 Session Storage Keys

| Current Key Pattern | Target Pattern |
|---------------------|----------------|
| `darkone_*` | `dvh_ims_*` |
| `DARKONE_*` | `DVH_IMS_*` |

**Action:** All session/localStorage keys will be renamed during the branding phase. No renaming action at this stage.

---

## 4. Stability Fixes Status

### 4.1 Blank Screen Protection (FIX 1)

**Status:** ✅ ALREADY IMPLEMENTED

| Component | Location | Status |
|-----------|----------|--------|
| ErrorBoundary | `src/components/ErrorBoundary.tsx` | Present |
| Suspense (Router) | `src/routes/router.tsx` | Present |
| Suspense (AdminLayout) | `src/layouts/AdminLayout.tsx` | Present |
| Suspense (AuthLayout) | `src/layouts/AuthLayout.tsx` | Present |
| LoadingFallback | `src/components/LoadingFallback.tsx` | Present |

**Verification:** No modifications required.

### 4.2 Toast / Success Message Bug (FIX 2)

**Status:** ✅ IMPLEMENTED

| Action | File | Status |
|--------|------|--------|
| Import ReactToastify.css | `src/components/wrapper/AppProvidersWrapper.tsx` | Applied |

**Fix Applied:**
```typescript
import 'react-toastify/dist/ReactToastify.css'
```

**Result:** Toast notifications now display with proper styling, preventing SVG overflow and viewport takeover.

---

## 5. Summary Matrix

### Keep–Remove–Replace Overview

| Category | KEEP | REMOVE | REPLACE |
|----------|------|--------|---------|
| Routes | 7 | 25+ | 3 → 7 |
| Dashboard layouts | ✓ | - | Data only |
| Auth pages | UI only | Logic | Supabase |
| Charts | 4 types | 4 types | Data only |
| Navigation | Structure | Demo items | IMSv2 items |
| Branding | - | All | DVH IMSv2 |

---

## 6. Governance Compliance

| Constraint | Status |
|------------|--------|
| Darkone Admin 1:1 | COMPLIANT |
| No new features | COMPLIANT |
| No schema changes | COMPLIANT |
| No Supabase changes | COMPLIANT |
| No RLS | COMPLIANT |
| No auth logic changes | COMPLIANT |
| No UI redesign | COMPLIANT |
| Generic for reuse | COMPLIANT |

---

**Document Status:** COMPLETE  
**Next Phase:** Await explicit instruction for implementation phases
