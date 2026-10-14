export interface ChapterConfig {
  id: string;
  chapterNumber: string; // e.g. "CHAPTER 01"
  title: string;         // e.g. "INTRODUCTION"
  subtitle: string;      // e.g. "Where curiosity meets technology."
  spreadIndex: number;   // Spread index in 3D book (0-7)
  pageNumberLeft: number;  // e.g. 4
  pageNumberRight: number; // e.g. 5
}

export interface ProjectEntry {
  title: string;
  subtitle: string;
  overview: string;
  problemStatement?: string;
  technologies: string[];
  keyFeatures: string[];
  implementationDetails?: string;
  githubUrl: string;
  demoUrl?: string | null;
}

export interface SkillGroup {
  groupName: string;
  skills: string[];
}

export interface ResumeData {
  author: {
    label: string;
    name: string;
    tagline: string;
    quote: string;
    pageNumber: number;
  };
  tableOfContents: {
    title: string;
    subtitle: string;
    description: string;
    entries: {
      chapterNum: string;
      title: string;
      pageNumber: number;
      spreadIndex: number;
    }[];
  };
  chapters: {
    introduction: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        professionalSummary: string;
        careerInterests: string[];
        technicalInterests: string[];
        professionalGoals: string[];
      };
    };
    education: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        degree: string;
        institution: string;
        period: string;
        graduationYear: string;
        location: string;
        focusAreas: string[];
        academicHighlights: string[];
      };
    };
    projects: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        items: ProjectEntry[];
      };
    };
    skills: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        groups: SkillGroup[];
      };
    };
    contact: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        email: string;
        linkedin: string;
        linkedinUrl: string;
        github: string;
        githubUrl: string;
        location: string;
        invitation: string;
      };
    };
    coAuthor: {
      left: {
        number: string;
        title: string;
        subtitle: string;
        pageNumber: number;
      };
      right: {
        pageNumber: number;
        heading: string;
        invitation: string;
        opportunities: {
          title: string;
          description: string;
        }[];
        linkedinUrl: string;
        emailUrl: string;
      };
    };
  };
}

export const resumeData: ResumeData = {
  author: {
    label: "AUTHOR",
    name: "SPARSH MAJUMDAR",
    tagline: "Interactive Resume & Portfolio",
    quote: "“Every experience tells a story. This is mine.”",
    pageNumber: 1,
  },
  tableOfContents: {
    title: "CONTENTS",
    subtitle: "A GUIDE TO MY STORY",
    description:
      "A collection of my education, technical skills, projects, and professional journey.",
    entries: [
      { chapterNum: "01", title: "Introduction", pageNumber: 4, spreadIndex: 2 },
      { chapterNum: "02", title: "Education", pageNumber: 6, spreadIndex: 3 },
      { chapterNum: "03", title: "Projects", pageNumber: 8, spreadIndex: 4 },
      { chapterNum: "04", title: "Skills", pageNumber: 10, spreadIndex: 5 },
      { chapterNum: "05", title: "Contact", pageNumber: 12, spreadIndex: 6 },
      { chapterNum: "06", title: "Be a Co-Author", pageNumber: 14, spreadIndex: 7 },
    ],
  },
  chapters: {
    introduction: {
      left: {
        number: "CHAPTER 01",
        title: "INTRODUCTION",
        subtitle: "“Where curiosity meets technology.”",
        pageNumber: 4,
      },
      right: {
        pageNumber: 5,
        professionalSummary:
          "I am a Computer Science and Business Systems graduate interested in cloud computing, DevOps, cybersecurity, and building practical technology solutions.",
        careerInterests: [
          "Cloud Infrastructure Architecture & Reliability",
          "Automated CI/CD Pipelines & Container Orchestration",
          "Observability, Real-Time Telemetry & Systems Monitoring",
        ],
        technicalInterests: [
          "Distributed Systems & Cloud Security Posture",
          "Low-level systems programming (C/C++) & OS primitives",
          "Event-driven cloud services across Microsoft Azure & AWS",
        ],
        professionalGoals: [
          "Engineer highly resilient, automated cloud infrastructure with zero downtime",
          "Develop open-source cloud security compliance & automated audit systems",
          "Contribute to distributed backend systems powering modern software platforms",
        ],
      },
    },
    education: {
      left: {
        number: "CHAPTER 02",
        title: "EDUCATION",
        subtitle: "“Knowledge is the foundation of every journey.”",
        pageNumber: 6,
      },
      right: {
        pageNumber: 7,
        degree: "B.Tech in Computer Science and Business Systems",
        institution: "VIT-AP University",
        period: "2022 – 2026",
        graduationYear: "Graduation: 2026",
        location: "Amravati, Andhra Pradesh",
        focusAreas: [
          "Operating Systems, Kernel Primitives & Memory Management",
          "Computer Networks, TCP/IP, OSI Layers & Cloud Subnets",
          "Data Structures, Algorithm Analysis & Software Architecture",
          "Enterprise Information Systems & Business System Dynamics",
        ],
        academicHighlights: [
          "Smart India Hackathon Finalist — Directed cross-functional IoT engineering team",
          "Technical Member at Be a Nerd Club — Automated workflow verification tools",
          "Certified in Cisco Networking Essentials & Oracle Professional Networking",
        ],
      },
    },
    projects: {
      left: {
        number: "CHAPTER 03",
        title: "PROJECTS",
        subtitle: "“Turning ideas into working systems.”",
        pageNumber: 8,
      },
      right: {
        pageNumber: 9,
        items: [
          {
            title: "A. Cloud Misconfiguration Risk Analyzer",
            subtitle: "Cloud Security & Automated Risk Analytics",
            overview:
              "Automated security auditing engine to evaluate cloud infrastructure against best-practice configurations and detect compliance drift in real time.",
            problemStatement:
              "Manual cloud audits fail to scale across multi-service deployments, leaving exposed storage buckets, permissive IAM roles, and unmonitored endpoints.",
            technologies: ["AWS (IAM, S3, CloudTrail, Config)", "Python", "Boto3", "Security Analytics"],
            keyFeatures: [
              "Automated policy evaluation for exposed storage and IAM over-privileging",
              "Event-driven drift alerts via CloudTrail activity telemetry",
              "Structured audit reporting with severity categorization",
            ],
            implementationDetails:
              "Built serverless event handlers ingesting resource configurations and applying compliance rule engines to score risk levels.",
            githubUrl: "https://github.com/SparshMajumdar/Cloudmisconfiguration",
            demoUrl: null,
          },
          {
            title: "B. SecureReceipt",
            subtitle: "Cryptographic Receipt Verification System",
            overview:
              "A digital receipt issuance and verification system engineered to guarantee transaction integrity and tamper resistance.",
            technologies: ["TypeScript", "Node.js", "SHA-256 Hashing", "Cloud Storage"],
            keyFeatures: [
              "Cryptographic hash chaining to verify receipt authenticity",
              "Tamper-evident audit trail for digital transactions",
              "Lightweight verification API for instant receipt validation",
            ],
            githubUrl: "https://github.com/SparshMajumdar",
            demoUrl: null,
          },
        ],
      },
    },
    skills: {
      left: {
        number: "CHAPTER 04",
        title: "SKILLS",
        subtitle: "“Tools are only as powerful as the ideas behind them.”",
        pageNumber: 10,
      },
      right: {
        pageNumber: 11,
        groups: [
          {
            groupName: "Programming Languages",
            skills: ["Python", "C", "C++", "TypeScript", "JavaScript", "SQL", "Bash"],
          },
          {
            groupName: "Cloud Computing",
            skills: ["AWS (EC2, S3, IAM, CloudTrail)", "Microsoft Azure", "Cloud Architecture"],
          },
          {
            groupName: "DevOps & Infrastructure",
            skills: ["Docker", "Linux Containers", "CI/CD Pipelines", "Git & GitHub Actions"],
          },
          {
            groupName: "Cybersecurity",
            skills: ["Cloud Security Auditing", "IAM Policy Hardening", "Vulnerability Scanning"],
          },
          {
            groupName: "Databases & Backend Development",
            skills: ["PostgreSQL", "MongoDB Atlas", "Node.js", "RESTful API Design"],
          },
          {
            groupName: "Tools & Platforms",
            skills: ["Linux CLI", "VS Code", "Postman", "Terminal Environments", "Vercel"],
          },
        ],
      },
    },
    contact: {
      left: {
        number: "CHAPTER 05",
        title: "CONTACT",
        subtitle: "“Every good story leaves room for a new connection.”",
        pageNumber: 12,
      },
      right: {
        pageNumber: 13,
        email: "sparshmajumdar04@gmail.com",
        linkedin: "linkedin.com/in/sparsh-majumdar-03820b288",
        linkedinUrl: "https://www.linkedin.com/in/sparsh-majumdar-03820b288/",
        github: "github.com/SparshMajumdar",
        githubUrl: "https://github.com/SparshMajumdar",
        location: "India (IST / UTC+5:30)",
        invitation:
          "Whether you would like to discuss cloud infrastructure, share an engineering opportunity, or collaborate on open-source systems, feel free to reach out directly through any of the channels below.",
      },
    },
    coAuthor: {
      left: {
        number: "CHAPTER 06",
        title: "BE A CO-AUTHOR",
        subtitle: "“Some of the best stories are written together.”",
        pageNumber: 14,
      },
      right: {
        pageNumber: 15,
        heading: "Write the Next Chapter With Me",
        invitation:
          "The next chapter of my professional journey is being written right now. I am always open to collaborating with fellow engineers, builders, and mentors to build impactful technology.",
        opportunities: [
          {
            title: "Technical Collaboration",
            description: "Building open-source cloud tooling, systems automation, or security audit pipelines.",
          },
          {
            title: "Project Discussions",
            description: "Brainstorming distributed architectures, low-latency telemetry, or cloud-native infrastructure.",
          },
          {
            title: "Professional Opportunities",
            description: "Full-time roles, engineering internships, and specialized DevOps/Cloud engineering positions.",
          },
        ],
        linkedinUrl: "https://www.linkedin.com/in/sparsh-majumdar-03820b288/",
        emailUrl: "mailto:sparshmajumdar04@gmail.com?subject=Collaboration%20Inquiry%20-%20Sparsh%20Majumdar",
      },
    },
  },
};
