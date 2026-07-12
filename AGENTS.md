<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## General

- Follow the existing architecture and coding style exactly.
- Make the smallest possible change to satisfy the request.
- Do not refactor unrelated code.
- If asked give opinions.
- Do not introduce new patterns unless explicitly requested.
- Prefer consistency and optimization, but ask before optimizing the code.

## Code Style

- Do not add comments unless explicitly requested - add only sectionwise comments.
- Match existing formatting, spacing, and naming conventions.
- Do not rename variables, functions, or files unless asked.
- Reuse existing utilities in lib/utilitys.ts before creating new ones.
- Keep code simple and readable.

## TypeScript

- Maintain strict type safety.
- use types folder to create any new type group and use existing type file if it has same name.
- Avoid `any` unless already used in the surrounding code.
- Preserve existing types.

## Prisma

- Do not modify the schema unless explicitly requested.
- give options and solutions related to schema if asked schema related question.

## API Controllers

- Match the existing controller structure.
- Preserve response formats and status codes.
- Do not change business logic outside the requested task - if you want outside change then state that in conversation and ask for approval.

## Before Finishing

- Verify no unrelated files were modified.
- Verify existing behavior is preserved.
- Do not make stylistic changes.
<!-- END:nextjs-agent-rules -->
