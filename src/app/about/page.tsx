export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/8 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-10">
          {/* Profile Card */}
          <div className="w-56 h-56 rounded-lg shadow-2xl flex-shrink-0 bg-gradient-to-br from-primary/20 via-surface-container to-surface-container-lowest flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-7xl text-primary/80">
                person
              </span>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">
                Profile
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
              Artist Bio
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
              Sparsh Majumdar
            </h1>
            <p className="text-on-surface-variant leading-relaxed text-base">
              Cloud and systems-focused developer with proficiency in C/C++ and
              knowledge of operating systems and computer networks. Experienced
              in building and managing cloud-based applications using platforms
              like Azure and AWS, with exposure to backend and full-stack
              development using Node.js and React. Interested in developing
              efficient and secure systems, with a focus on cloud infrastructure
              and low-level programming.
            </p>

            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-on-surface">
                  Available for projects
                </span>
              </div>
              <span className="text-on-surface-variant text-sm">•</span>
              <span className="text-sm text-on-surface-variant">
                VIT-AP University
              </span>
              <span className="text-on-surface-variant text-sm">•</span>
              <span className="text-sm text-on-surface-variant">
                B.Tech CSE (2022–2026)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-8 mt-12">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Experience — The Setlist
        </h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center px-4 py-2 border-b border-outline-variant/10 text-on-surface-variant text-[0.6875rem] uppercase font-bold tracking-[0.1em]">
            <div className="w-10">#</div>
            <div className="flex-1">Role</div>
            <div className="w-1/4">Organization</div>
            <div className="w-24 text-right">Year</div>
          </div>

          {/* Experience 1 */}
          <div className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer">
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">01</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  emoji_events
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Team Lead — Smart Hospital System
                </span>
                <span className="text-xs text-on-surface-variant">
                  Led team of 5 to build secure RFID-based appointment system
                  for 50+ patients
                </span>
              </div>
            </div>
            <div className="w-1/4 text-on-surface-variant text-sm">
              Smart India Hackathon, VIT-AP
            </div>
            <div className="w-24 text-right text-on-surface-variant text-sm font-label">
              2023
            </div>
          </div>

          {/* Experience 2 */}
          <div className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer">
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">02</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-xl">
                  groups
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Technical Team Member
                </span>
                <span className="text-xs text-on-surface-variant">
                  Created automation scripts, web tools for 100+ participants,
                  improved testing by 30%
                </span>
              </div>
            </div>
            <div className="w-1/4 text-on-surface-variant text-sm">
              Be a Nerd Club, VIT-AP
            </div>
            <div className="w-24 text-right text-on-surface-variant text-sm font-label">
              2025
            </div>
          </div>

          {/* Experience 3 */}
          <div className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer">
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">03</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-xl">
                  code
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Frontend Developer
                </span>
                <span className="text-xs text-on-surface-variant">
                  Built IoT-based electricity tracker with React &amp; Firebase,
                  1-second sync latency
                </span>
              </div>
            </div>
            <div className="w-1/4 text-on-surface-variant text-sm">
              Engineering Clinics, VIT-AP
            </div>
            <div className="w-24 text-right text-on-surface-variant text-sm font-label">
              2024
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-8 mt-16">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Education — The Discography
        </h2>
        <div className="flex flex-col gap-4">
          {/* VIT-AP */}
          <div className="bg-surface-container-low p-6 rounded-xl hover:bg-surface-container-high transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    school
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">
                    VIT-AP University
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    B.Tech. in Computer Science with Business Systems
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Amravati, Andhra Pradesh
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">
                2022 – 2026
              </span>
            </div>
          </div>

          {/* 12th Grade */}
          <div className="bg-surface-container-low p-6 rounded-xl hover:bg-surface-container-high transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    menu_book
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">
                    Global Public School
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    12th Grade — 86%
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Kota, Rajasthan
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-secondary">2022</span>
            </div>
          </div>

          {/* 10th Grade */}
          <div className="bg-surface-container-low p-6 rounded-xl hover:bg-surface-container-high transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tertiary/20 to-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    auto_stories
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">
                    Global Public School
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    10th Grade — 84%
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Kota, Rajasthan
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-tertiary">2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-8 mt-16 mb-24">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Certifications — The Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-5 rounded-xl hover:bg-surface-container-high transition-all duration-300 flex items-center gap-4 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-surface-container-highest flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                Cisco Networking Essentials
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Cisco Systems
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl hover:bg-surface-container-high transition-all duration-300 flex items-center gap-4 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-surface-container-highest flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">
                verified
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                Oracle Professional Networking
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Oracle Corporation
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
