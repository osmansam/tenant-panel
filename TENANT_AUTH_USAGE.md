# Tenant Authentication API Usage

This guide shows how to use the new tenant authentication hooks in your React components.

## Available Hooks

### 1. `useTenantLogin`

For tenant login with email and password.

```tsx
import { useTenantLogin } from "../utils/api/auth";

const { tenantLogin } = useTenantLogin();

// Usage
tenantLogin({
  email: "owner@acme.com",
  password: "Pass123!",
});
```

### 2. `useTenantRegister`

For creating a new tenant account.

```tsx
import { useTenantRegister } from "../utils/api/auth";

const { tenantRegister } = useTenantRegister();

// Usage
tenantRegister({
  email: "owner@acme.com",
  password: "Pass123!",
  name: "Owner",
  tenantName: "Acme Corp",
  tenantSlug: "acme",
});
```

### 3. `useGoogleLogin`

For initiating Google OAuth login.

```tsx
import { useGoogleLogin } from "../utils/api/auth";

const { initiateGoogleLogin } = useGoogleLogin();

// Usage - redirects to Google OAuth
initiateGoogleLogin();
```

### 4. `useGoogleCallback`

For handling Google OAuth callback.

```tsx
import { useGoogleCallback } from "../utils/api/auth";

const { handleGoogleCallback } = useGoogleCallback();

// Usage - call with authorization code from Google
handleGoogleCallback(authorizationCode);
```

### 5. `useTenantLogout`

For logging out from tenant session.

```tsx
import { useTenantLogout } from "../utils/api/auth";

const { tenantLogout } = useTenantLogout();

// Usage
tenantLogout();
```

### 6. `useRefreshToken`

For refreshing expired access tokens.

```tsx
import { useRefreshToken } from "../utils/api/auth";

const { refreshToken } = useRefreshToken();

// Usage (usually handled automatically by axios interceptor)
refreshToken();
```

## Pre-built Components

### TenantLoginForm

Ready-to-use login form with email/password and Google login.

```tsx
import { TenantLoginForm } from "../components/auth";

<TenantLoginForm onError={(error) => console.error(error)} />;
```

### TenantRegisterForm

Ready-to-use registration form with auto-generated tenant slug.

```tsx
import { TenantRegisterForm } from "../components/auth";

<TenantRegisterForm onError={(error) => console.error(error)} />;
```

### GoogleCallbackHandler

Component to handle Google OAuth callback in your routes.

```tsx
import { GoogleCallbackHandler } from "../components/auth";

// In your router
<Route path="/auth/google/callback" element={<GoogleCallbackHandler />} />;
```

## API Endpoints

The hooks will make requests to these endpoints:

- `POST /api/v1/tenant/auth/login` - Login
- `POST /api/v1/tenant/auth/register` - Register
- `GET /api/v1/tenant/auth/google` - Get Google OAuth URL
- `POST /api/v1/tenant/auth/google/callback` - Handle Google callback
- `POST /api/v1/tenant/auth/logout` - Logout
- `POST /api/v1/tenant/auth/refresh` - Refresh token

## Token Management

The system automatically handles:

- ✅ Storing JWT and refresh tokens in cookies and localStorage
- ✅ Adding Authorization header to requests
- ✅ Automatic token refresh on 401 errors
- ✅ Clearing tokens on logout
- ✅ Redirecting to login when refresh fails

## Error Handling

All hooks accept an optional `onError` callback for custom error handling:

```tsx
const { tenantLogin } = useTenantLogin(undefined, (error) => {
  console.error("Login failed:", error);
  // Handle error (show toast, etc.)
});
```
