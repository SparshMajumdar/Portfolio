import SkillCard from "@/components/SkillCard";
import TrackRow from "@/components/TrackRow";

const skills = [
  {
    icon: "code",
    title: "Next.js & React",
    subtitle: "Full-Stack Architecture",
    gradientFrom: "from-primary/20",
    iconColor: "text-primary",
    url: "https://nextjs.org/",
  },
  {
    icon: "cloud_done",
    title: "Azure & AWS",
    subtitle: "Cloud Infrastructure",
    gradientFrom: "from-secondary/20",
    iconColor: "text-secondary",
    url: "https://azure.microsoft.com/",
  },
  {
    icon: "database",
    title: "MongoDB & Firebase",
    subtitle: "NoSQL Databases",
    gradientFrom: "from-tertiary/20",
    iconColor: "text-tertiary",
    url: "https://www.mongodb.com/",
  },
  {
    icon: "terminal",
    title: "C/C++ & Python",
    subtitle: "Systems Programming",
    gradientFrom: "from-primary-fixed/20",
    iconColor: "text-primary-fixed",
    url: "https://www.python.org/",
  },
  {
    icon: "hub",
    title: "Node.js & Flask",
    subtitle: "Backend Frameworks",
    gradientFrom: "from-secondary-fixed/20",
    iconColor: "text-secondary-fixed",
    url: "https://nodejs.org/",
  },
  {
    icon: "security",
    title: "Docker & Git",
    subtitle: "DevOps Tools",
    gradientFrom: "from-tertiary-fixed/20",
    iconColor: "text-tertiary-fixed",
    url: "https://www.docker.com/",
  },
];

const featuredProjects = [
  {
    title: "Cloud Misconfiguration Scanner",
    description:
      "Event-driven security system to detect Azure misconfigurations",
    stack: "Azure, Python, Functions",
    date: "2026",
    icon: "shield",
    link: null,
    github: "https://github.com/your-username/cloud-misconfig-scanner",
  },
  {
    title: "Electro Buck — IoT Monitor",
    description:
      "End-to-end IoT system for real-time power usage monitoring",
    stack: "Arduino, Next.js, Firebase",
    date: "2024",
    icon: "bolt",
    link: "https://electro-buck.vercel.app/",
    github: "https://github.com/SparshMajumdar/ElectroBuck",
  },
  {
    title: "Smart Hospital System",
    description:
      "RFID-based hospital appointment management platform",
    stack: "Next.js, MongoDB Atlas",
    date: "2023",
    icon: "local_hospital",
    link: "https://smart-hospital-project.vercel.app/",
    github: "https://github.com/SparshMajumdar/SmartHospital",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-8 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-end gap-8">
          {/* Profile Image */}
          <div className="w-56 h-56 rounded-lg shadow-2xl overflow-hidden flex-shrink-0 group bg-gradient-to-br from-primary/30 to-surface-container flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-7xl text-primary/80">
                person
              </span>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">
                Developer
              </span>
            </div>
          </div>

          {/* Hero Text */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
              Featured Portfolio
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-none mb-2">
              Building
              <br />
              The Cloud.
            </h1>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-on-surface">
                  Available for projects
                </span>
              </div>
              <span className="text-on-surface-variant text-sm">•</span>
              <span className="text-sm font-medium text-on-surface-variant">
                3 Major Projects
              </span>
              <span className="text-on-surface-variant text-sm">•</span>
              <span className="text-sm font-medium text-on-surface-variant">
                B.Tech CSE 2022–2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Most Played Skills */}
      <section className="px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">
              Most Played Skills
            </h2>
            <p className="text-sm text-on-surface-variant">
              Based on project activity and technical proficiency
            </p>
          </div>
          <span className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Show all
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-8 mt-16 mb-24">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Featured Projects
        </h2>
        <div className="flex flex-col gap-1">
          {/* Track Header */}
          <div className="flex items-center px-4 py-2 border-b border-outline-variant/10 text-on-surface-variant text-[0.6875rem] uppercase font-bold tracking-[0.1em]">
            <div className="w-10">#</div>
            <div className="flex-1">Title</div>
            <div className="w-1/4">Stack</div>
            <div className="w-24 text-right">Released</div>
            <div className="w-24 text-right">Lyrics</div>
          </div>

          {/* Project Rows */}
          {featuredProjects.map((project, i) => (
            <TrackRow key={project.title} index={i + 1} {...project} />
          ))}
        </div>
      </section>
    </>
  );
}
