# Sparsh Majumdar Portfolio (Next.js + TypeScript)

A self-hosted developer portfolio UI built with Next.js 14 App Router, Tailwind CSS, and MongoDB for a contact form. This repository is mostly a single-page, dashboard-style portfolio with navigation, project highlight cards, experience sections, and a contact API backed by MongoDB.

---

## ✅ Project Structure

- `src/app/`
  - `layout.tsx`: Root layout with global styles and layout components (`Sidebar`, `TopNav`, `BottomPlayerBar`).
  - `page.tsx`: Homepage with hero, skills cards, and featured projects.
  - `about/page.tsx`: About section + experience/education.
  - `projects/page.tsx`: Projects list page (UI cards, filters, etc.).
  - `contact/page.tsx`: Contact form. Sends POST to `api/contact/route.ts`.

- `src/components/`
  - `Sidebar.tsx`: fixed side nav across pages.
  - `TopNav.tsx`: header with optional search and nav links.
  - `BottomPlayerBar.tsx`: floating footer UI component.
  - `SkillCard.tsx`: reusable skill tile.
  - `TrackRow.tsx`: reusable list row for experience/project entries.

- `src/lib/mongodb.ts`: Mongoose singleton connection helper using `MONGODB_URI`.
- `src/models/Contact.ts`: Mongoose Contact model with validation and timestamps.
- `src/app/api/contact/route.ts`: API route for contact form POST.

- `src/app/globals.css`: global Tailwind / base CSS.

---

## ⚙️ Features

- Clean, dark-surface dashboard layout with responsive design.
- Client-side routing via Next.js App Router: `/`, `/about`, `/projects`, `/contact`.
- MongoDB contact form (server-side validation and model checks). 
- Centralized Mongoose connection caching for dev hot reload.
- Reusable components with Tailwind utility classes.

---

## 🛠️ Development

1. install

```bash
npm install
```

2. environment

- copy `.env.example` to `.env.local` (create if missing).
- set `MONGODB_URI=your_connection_string`

3. run

```bash
npm run dev
```

4. open

- http://localhost:3000

---

## 🧩 Contact API Contract (POST)

`POST /api/contact`

Request JSON:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

Response success:

```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": "<objectId>"
}
```

Validation returns 400 with `{ success: false, error: "..." }`.
500 on unexpected errors.

---

## 🧪 Recommended Workflow For Code Changes

1. Identify target area (`app` vs `components` vs `api/models/lib`).
2. Update JSX/TS and style classes; run locally to confirm UI.
3. API route changes: add tests or manual Postman call.
4. If model/schema changes, migrate existing MongoDB documents or use new schema transition logic.

Include this README as a reference for route naming, shared components, and expected behavior.

---

## 📦 Scripts

- `npm run dev` — run local dev server.
- `npm run build` — production build.
- `npm run start` — run production build.
- `npm run lint` — lint TypeScript.
- `npm run format` — format code (if configured).

---

## 🧠 Notes

- `layout.tsx` sets `html` class `dark`. If switching theme mode, update CSS variables in Tailwind configuration.
- `Sidebar` and `TopNav` use `usePathname` for active tab logic (client component required).
- `Contact` model uses `unique` email not configured; handle duplicates manually if needed.

---

## 📌 Quick file reference

- Implement new page → `src/app/<name>/page.tsx`
- Add stateful UI/wired forms → prefer components in `src/components`
- Add API endpoint → `src/app/api/<route>/route.ts`
- Add DB collection → model in `src/models` + `lib/mongodb`.

---

## 🚀 Deploy

- Connect repo to Vercel or use `next export` + static host.
- Ensure `MONGODB_URI` and any secret values are set in environment variables.
- Set `NEXT_PUBLIC_` vars if local browser access is needed.

---

## 📚 References

- Next.js App Router: https://nextjs.org/docs/app
- Tailwind CSS: https://tailwindcss.com/docs
- Mongoose: https://mongoosejs.com/docs

