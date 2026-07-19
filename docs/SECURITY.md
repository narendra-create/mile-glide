# Security Practices

TrackLancer incorporates multiple security layers, from Edge middleware guards to database-level constraints.

## Authentication & Authorization

- **Authentication Setup**: Powered by `better-auth`. Employs passwordless-style email OTP verification to prevent unauthorized account creation. Passwords are securely hashed by the `better-auth` adapter before database insertion.
- **OTP Security**: One-Time Passwords have a strict 10-minute expiry window, are limited to 5 verification attempts to prevent brute-forcing, and are stored as hashed strings in the database.
- **Authorization**: Protected routes utilize dual-layer guarding:
  1. `proxy.ts` Edge Middleware prevents unauthorized page loads.
  2. The `requireRole()` utility enforces role checks (`FREELANCER` vs `CLIENT`) directly inside server controllers, ensuring API and Server Action integrity even if middleware is bypassed.

## Data Validation & Input Sanitization

- **Strict Validation**: All data mutation payloads (whether via REST API or Next.js Server Actions) are aggressively validated against rigorous **Zod** schemas (located in `app/lib/validations/`) before reaching business logic.
- **SQL Injection Prevention**: TrackLancer exclusively uses Prisma ORM. Prisma automatically parameterizes all queries, neutralizing SQL injection vectors.
- **XSS Protection**: React's native string interpolation automatically escapes HTML entities, neutralizing most Cross-Site Scripting (XSS) vectors. (Note: Email templates are generated as raw HTML, but this generation happens entirely server-side using trusted data).
- **CSRF Protection**: Handled automatically by `better-auth` endpoints. The `BETTER_AUTH_TRUSTED_ORIGINS` environment variable must be strictly configured to prevent Cross-Site Request Forgery.

## Session & Secrets Management

- **Secrets Handling**: All sensitive keys (Database URLs, Auth secrets, API keys) are strictly managed via environment variables. The `.env` file is heavily `.gitignore`d.
- **Session Revocation**: User sessions track originating IP addresses and User-Agent strings. Users have full visibility into their active sessions via the Settings page and can instantly revoke compromised sessions.
- **Cron Protection**: The `POST /api/cron/cleanup` endpoint, which executes destructive data pruning, is protected via a required Bearer token matching the `CRON_SECRET` environment variable.

## Known Security Considerations & Limitations

> [!WARNING]
> While architecturally sound, the current implementation has several areas requiring attention prior to a large-scale public rollout.

1. **Rate Limiting**: Public endpoints, specifically `/api/user/check-email` and login routes, lack application-level rate limiting, making them potentially susceptible to enumeration attacks.
2. **Security Headers**: No Content Security Policy (CSP) or strict transport security (HSTS) headers are currently explicitly configured in `next.config.ts`.
3. **Database Connection Instance**: The `/api/user/check-email` route currently instantiates its own `PrismaClient` rather than utilizing the shared singleton located in `app/lib/prisma.ts`. Under heavy load, this could exhaust database connections and cause a denial of service.
4. **Hardcoded IP Addresses**: The `next.config.ts` file contains hardcoded internal IP addresses inside `allowedDevOrigins`. While not a security risk in production, it is poor practice and should be migrated to environment variables.

## Best Practices for Deployment

- Always enforce `HTTPS` in production.
- Rotate `BETTER_AUTH_SECRET` and `CRON_SECRET` periodically.
- Monitor Vercel logs for repeated failed login or OTP attempts indicating automated abuse.
