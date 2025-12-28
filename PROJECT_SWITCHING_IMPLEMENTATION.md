# Project Switching Implementation

## Overview

This implementation adds the capability to switch between tenant and project contexts in the application. When a user selects a project, they switch to project-scoped authentication where their subsequent requests use project-specific tokens.

## Key Components

### 1. API Methods (in `src/utils/api/auth.ts`)

#### `useSwitchToProject`

- **Purpose**: Switches user context from tenant to project
- **Endpoint**: `POST /api/v1/tenant/auth/switch-project`
- **Request Body**: `{ "projectId": "project_id_here" }`
- **Response**: Contains new project-scoped access token, refresh token, project details, and user roles
- **Functionality**:
  - Updates JWT tokens (both access and refresh)
  - Updates user context with project information
  - Stores project details in localStorage
  - Navigates to dashboard after successful switch

#### `useSwitchBackToTenant`

- **Purpose**: Switches user context back from project to tenant
- **Functionality**:
  - Uses refresh token to get new tenant-scoped token
  - Clears project information from user context
  - Removes project data from localStorage
  - Navigates back to projects page

### 2. User Context Updates (in `src/types/index.ts`)

Extended the `User` type to include project-related fields:

- `projectId?`: Current project ID
- `projectName?`: Current project name
- `projectSlug?`: Current project slug
- `roleScope?`: "tenant" | "project" - indicates the current context

### 3. Projects Page Enhancement (in `src/pages/ProjectsPage.tsx`)

Added "Switch to Project" button to each project card:

- Button is only active for active projects
- Shows loading state during switching
- Calls the `useSwitchToProject` hook when clicked

### 4. Current Project Hook (in `src/hooks/useCurrentProject.ts`)

A utility hook that:

- Tracks current project state from localStorage
- Provides helper methods to clear project context
- Listens for storage changes to stay synchronized

### 5. Sidebar Enhancements (in `src/common/Sidebar.tsx`)

Added project context section:

- Shows current project information when in project context
- Provides "Back to Tenant" button to switch back to tenant context
- Displays project name and context indicator
- Compact view for collapsed sidebar

## Usage Flow

### Switching to Project Context:

1. User navigates to Projects page
2. User clicks "Switch to Project" button on desired project
3. Frontend sends request to `/api/v1/tenant/auth/switch-project` with `projectId`
4. Backend responds with project-scoped tokens and project details
5. Frontend updates tokens and user context
6. User is navigated to dashboard in project context

### Switching Back to Tenant Context:

1. User clicks "Back to Tenant" button in sidebar
2. Frontend uses refresh token to get new tenant-scoped token
3. Project information is cleared from user context
4. User is navigated back to projects page

## Token Management

- **Project Context**: Access tokens include project_id in JWT payload with project-scoped roles
- **Tenant Context**: Access tokens have tenant-level scope with tenant roles
- **Refresh Tokens**: Used to obtain new tokens when switching contexts

## Backend Integration

The frontend expects these backend endpoints:

- `POST /api/v1/tenant/auth/switch-project` - Switch to project context
- `POST /api/v1/tenant/auth/refresh` - Refresh tokens (existing endpoint)

Expected response from switch-project endpoint:

```json
{
  "status": 200,
  "message": "Switched to project context",
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "project": {
      "id": "project_id",
      "tenantId": "tenant_id",
      "tenantSlug": "tenant_slug",
      "name": "Project Name",
      "slug": "project-slug",
      "isActive": true,
      "createdAt": "2025-12-19T22:05:44.676Z",
      "updatedAt": "2025-12-19T22:05:44.676Z"
    },
    "roles": ["project_admin"]
  }
}
```

## Error Handling

- Failed project switching shows error toast and maintains current context
- Failed token refresh on context switch forces logout
- Network errors are caught and displayed to user
- Invalid project selection is prevented through UI state

## Security Considerations

- Tokens are properly scoped to prevent cross-project access
- Refresh tokens are used to maintain session security
- Project access is validated on the backend
- Token expiration is handled gracefully

## Testing

To test the implementation:

1. Login as a tenant user
2. Navigate to Projects page
3. Click "Switch to Project" on an active project
4. Verify sidebar shows project context
5. Verify new requests use project-scoped tokens
6. Click "Back to Tenant" to return to tenant context
7. Verify tokens are updated and context is cleared
