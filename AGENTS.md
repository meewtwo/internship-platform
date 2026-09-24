## Project: Smart Internship & Career Matching Platform (uni class project)

### Stack
Next.js App Router + TypeScript + Tailwind, Supabase (auth + Postgres, RLS on), next-intl (en, ru, kk), zod for validation.

### Rules
- Small, focused changes. Do one feature at a time, don't touch unrelated files.
- No new libraries unless I ask.
- Every user-facing string goes in messages/en.json, ru.json, kk.json. Never hardcode text.
- Validate with zod on client AND server.
- Never put secrets in code. Use .env.local. Never commit it.
- Roles: `student` and `employer` (later `admin`). Check the role on every protected page.
- DB tables: profiles, student_profiles, companies. Don't rename columns without asking.
- Keep code simple and readable, this is a student project. Short comments where logic isn't obvious.
- After changes, tell me which files you changed and how to test.