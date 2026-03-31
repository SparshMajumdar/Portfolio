const projects = [
  {
    title: "Cloud Misconfiguration Scanner",
    description:
      "Event-driven cloud security system to detect misconfigurations using Azure Activity Logs",
    stack: "Azure, Python, Functions",
    date: "2026",
    duration: "200h+",
    icon: "shield",
  },
  {
    title: "Electro Buck — IoT Monitor",
    description:
      "End-to-end IoT system to monitor real-time power usage across appliances",
    stack: "Arduino, Next.js, Firebase",
    date: "2024",
    duration: "160h",
    icon: "bolt",
  },
  {
    title: "Smart Hospital System",
    description:
      "RFID-based hospital appointment management with role-based access control",
    stack: "Next.js, MongoDB Atlas",
    date: "2023",
    duration: "240h",
    icon: "local_hospital",
  },
  {
    title: "Smart India Hackathon",
    description:
      "Led team of 5 to build secure RFID-based appointment system for 50+ patients",
    stack: "Next.js, Node.js, MongoDB",
    date: "2023",
    duration: "48h",
    icon: "emoji_events",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-8 pt-24 pb-8 flex items-end gap-8 bg-gradient-to-b from-primary-container/20 to-surface">
        <div className="w-64 h-64 shadow-2xl rounded-lg overflow-hidden flex-shrink-0 group relative bg-gradient-to-br from-primary/30 via-surface-container to-surface-container-lowest flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-8xl text-primary/60">
              folder_special
            </span>
            <span className="text-xs text-on-surface-variant uppercase tracking-widest">
              Collection
            </span>
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface">
            Public Playlist
          </span>
          <h2 className="text-7xl font-extrabold tracking-tighter text-on-surface mb-2">
            Selected Works
          </h2>
          <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
            <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-[0.5rem] font-bold">
              SM
            </div>
            <span className="text-on-surface font-bold">Sparsh Majumdar</span>
            <span className="w-1 h-1 rounded-full bg-on-surface-variant"></span>
            <span>{projects.length} Projects</span>
            <span className="w-1 h-1 rounded-full bg-on-surface-variant"></span>
            <span>4 Years of Curation</span>
          </div>
        </div>
      </section>

      {/* Project Controls */}
      <section className="px-8 py-6 flex items-center justify-between sticky top-16 bg-surface/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-8">
          <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg hover:scale-105 transition-transform active:scale-95">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
          <button className="material-symbols-outlined text-on-surface-variant text-3xl hover:text-on-surface transition-colors">
            favorite
          </button>
          <button className="material-symbols-outlined text-on-surface-variant text-3xl hover:text-on-surface transition-colors">
            download_for_offline
          </button>
          <button className="material-symbols-outlined text-on-surface-variant text-3xl hover:text-on-surface transition-colors">
            more_horiz
          </button>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">search</span>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>Custom order</span>
            <span className="material-symbols-outlined text-sm">
              arrow_drop_down
            </span>
          </div>
        </div>
      </section>

      {/* Project Track List */}
      <section className="px-8 mt-4 mb-24">
        {/* Table Header */}
        <div className="grid grid-cols-[48px_2fr_1.5fr_1fr_80px] gap-4 px-4 py-3 border-b border-outline-variant/10 text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-widest">
          <span className="flex justify-center">#</span>
          <span>Title</span>
          <span>Stack / Album</span>
          <span>Date Added</span>
          <span className="flex justify-end pr-4">
            <span className="material-symbols-outlined text-sm">schedule</span>
          </span>
        </div>

        {/* Tracks */}
        <div className="flex flex-col mt-2">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="track-row grid grid-cols-[48px_2fr_1.5fr_1fr_80px] gap-4 px-4 py-2 items-center rounded-md hover:bg-surface-container-high group transition-colors duration-300"
            >
              {/* Index / Play */}
              <div className="flex justify-center items-center text-on-surface-variant">
                <span className="track-index text-sm font-medium">
                  {i + 1}
                </span>
                <span className="track-play hidden material-symbols-outlined text-on-surface text-xl">
                  play_arrow
                </span>
              </div>

              {/* Title + Desc */}
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-10 h-10 rounded shadow-sm bg-surface-container-low flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">
                    {project.icon}
                  </span>
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                    {project.title}
                  </span>
                  <span className="text-on-surface-variant text-xs truncate">
                    {project.description}
                  </span>
                </div>
              </div>

              {/* Stack */}
              <div className="text-on-surface-variant text-sm truncate">
                {project.stack}
              </div>

              {/* Date */}
              <div className="text-on-surface-variant text-sm">
                {project.date}
              </div>

              {/* Duration */}
              <div className="flex items-center justify-end gap-4 pr-4">
                <button className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  lyrics
                </button>
                <span className="text-on-surface-variant text-sm tabular-nums">
                  {project.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
