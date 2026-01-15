# Architecture Documentation

## Overview

This document describes the architecture and folder structure for IMS v2 – Volks Huisvesting.

## Repository Structure

```
/
├── IMSv2 Docs/           # NEW: Authoritative IMS v2 documents
│   └── .gitkeep
├── IMSv2 Phases/         # NEW: Phase-based execution planning
│   └── .gitkeep
├── archive/              # Archived Darkone template (immutable baseline)
│   └── Darkone-React_v1.0/
├── docs/                 # Project documentation
│   ├── architecture.md   # This file
│   └── backend.md        # Backend configuration docs
├── docs-standard/        # Standardization documentation
│   ├── CLONE_WORKFLOW.md
│   ├── DARKONE_STANDARDIZATION_PLAN.md
│   ├── DARKONE_STANDARDIZATION_TASKS.md
│   ├── NEW_PROJECT_KICKOFF.md
│   ├── RELEASE_TAG_GUIDE.md
│   └── RESTORE_POINT_IMSv2_Doc_Folders_Setup.md
├── public/               # Static assets
├── src/                  # Application source code
│   ├── app/              # Page components
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── helpers/          # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   ├── routes/           # Route definitions
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── [config files]        # Vite, TypeScript, Tailwind, etc.
```

## Documentation Folders (Added 2026-01-15)

### IMSv2 Docs
- **Path**: `/IMSv2 Docs/`
- **Purpose**: Central repository for all authoritative IMS v2 documentation
- **Expected Contents**: Docs 1-9 (to be provided via chat interface)

### IMSv2 Phases
- **Path**: `/IMSv2 Phases/`
- **Purpose**: Phase-based execution planning and tracking
- **Expected Contents**: Subfolders for each implementation phase

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, SASS
- **UI Components**: Radix UI, shadcn/ui, React Bootstrap
- **Routing**: React Router DOM
- **State Management**: React Context, TanStack Query
- **Backend**: Lovable Cloud (pending implementation)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-15 | Added IMSv2 Docs and IMSv2 Phases to architecture | Lovable AI |
