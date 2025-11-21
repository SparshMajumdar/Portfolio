# Sparsh Majumdar - Portfolio

A modern, interactive portfolio website showcasing skills in Cybersecurity and Full Stack Development. Built with Next.js 14, TypeScript, and Three.js.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Database:** [Supabase](https://supabase.com/), [MongoDB](https://www.mongodb.com/)

## 📂 Project Structure

```
c:\Personal Info\Portfolio-1\
├── app\                # Next.js App Router pages and layout
│   ├── layout.tsx      # Root layout with ThemeProvider and custom cursor
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles (Tailwind imports, custom CSS)
├── components\         # Reusable UI components
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About Me section
│   ├── Skills.tsx      # Technical skills display
│   ├── Experience.tsx  # Professional experience timeline
│   ├── Projects.tsx    # Project showcase
│   ├── Contact.tsx     # Contact form and info
│   ├── CyberShield.tsx # Cybersecurity visual element
│   ├── FloatingCube.tsx# 3D interactive element
│   └── ...
├── context\            # React Context providers (e.g., ThemeContext)
├── lib\                # Utility functions and shared logic
└── public\             # Static assets (images, icons, manifest)
```

## ✨ Features

- **Cybersecurity Theme:** Custom "Matrix" background effect and tech-focused design.
- **Interactive 3D Elements:** Integrated Three.js components for a dynamic user experience.
- **Custom Cursor:** JavaScript-based custom cursor with hover effects.
- **Responsive Design:** Fully responsive layout using Tailwind CSS.
- **PWA Ready:** Includes manifest and icons for Progressive Web App support.

## 🛠️ Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 📝 Notes

- The project uses `next/font/google` for typography (Share Tech Mono).
- Ensure all environment variables for Supabase/MongoDB are set up if running locally (check `.env.local` if applicable).
