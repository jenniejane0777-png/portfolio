import { Project, Service, Skill, Milestone, Testimonial } from './types';

export const portfolioData = {
  personalInfo: {
    name: "Nuzhat Kaunain",
    title: "Full Stack Web Developer & Freelancer",
    headline: "Crafting Modern Digital Experiences",
    subheadline: "Full Stack Developer building fast, scalable, and beautiful web applications with professional polish.",
    email: "jenniejane0777@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    stats: [
      { id: "projects", label: "Projects Completed", value: "24+", target: 24 },
      { id: "clients", label: "Happy Clients", value: "15+", target: 15 },
      { id: "skills", label: "Technologies Mastered", value: "12+", target: 12 },
      { id: "experience", label: "Years Experience", value: "2+", target: 2 }
    ]
  },
  
  projects: [
    {
      id: "proj-1",
      title: "SaaS Analytics Command Center",
      description: "A high-performance analytics platform featuring real-time data streaming, customizable bento widget dashboards, and complex database aggregation schemas.",
      category: "Full Stack",
      tags: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Recharts", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      size: "large",
      metrics: "99.8% Uptime • 250ms Load"
    },
    {
      id: "proj-2",
      title: "Aetherial - Interactive E-Commerce Studio",
      description: "A luxury lifestyle shopping experience featuring 2.5D immersive visual cards, micro-interactions, dynamic cart state machines, and a streamlined custom checkout.",
      category: "E-Commerce",
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      size: "medium",
      metrics: "+42% Conversion Rate"
    },
    {
      id: "proj-3",
      title: "Synthetix - Collaborative AI Editor",
      description: "A real-time collaborative document and code editor integrated with custom Gemini LLM assistants, live cursors, and state synchronization.",
      category: "Web App",
      tags: ["TypeScript", "React", "Node.js", "Socket.io", "Gemini API", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      size: "medium",
      metrics: "Real-time • <50ms Latency"
    },
    {
      id: "proj-4",
      title: "Quantum - Web3 Trading Dashboard",
      description: "An immersive financial trading terminal for digital assets with automated pricing engines, real-time WebSocket charts, and localized wallet integration.",
      category: "Interactive",
      tags: ["React", "Tailwind CSS", "D3.js", "Web3.js", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      size: "small",
      metrics: "$1.2M Vol Tracked"
    }
  ] as Project[],

  services: [
    {
      id: "srv-1",
      title: "Full Stack Development",
      description: "Architecting secure, scalable databases and cloud backends combined with fluid, pixel-perfect user interfaces.",
      iconName: "Cpu",
      features: ["Custom API Design & Development", "Relational & NoSQL Architecture", "Performance Profiling & Bottleneck Resolution"]
    },
    {
      id: "srv-2",
      title: "High-Converting Landing Pages",
      description: "Building fast, high-impact landing pages structured to capture user attention and maximize lead conversions.",
      iconName: "Layers",
      features: ["Awwwards-quality Layout Transitions", "A/B Test Optimized Structures", "Instant Load (95+ Lighthouse Scores)"]
    },
    {
      id: "srv-3",
      title: "Bespoke Business Websites",
      description: "Elevating corporate identities into high-end immersive experiences that foster strong brand trust and client retention.",
      iconName: "Globe",
      features: ["Advanced Interactive Storytelling", "Custom CMS Integrations", "Optimized Search Engine Visibility (SEO)"]
    },
    {
      id: "srv-4",
      title: "Premium E-Commerce Systems",
      description: "Creating frictionless buyer journeys, customized stock management dashboards, and fluid checkout gateways.",
      iconName: "ShoppingBag",
      features: ["Multi-step Optimized Checkout Rails", "Real-time Inventory Tracking System", "Automated Invoice & Email Flow"]
    },
    {
      id: "srv-5",
      title: "State-Driven Web Applications",
      description: "Developing complex dashboard portals, analytics suites, and collaborative cloud apps with rich localized states.",
      iconName: "Monitor",
      features: ["Real-time WebSockets Integration", "Custom Client-Side State Engines", "Fine-Grained Role-Based Authentication"]
    },
    {
      id: "srv-6",
      title: "Third-Party API Integrations",
      description: "Connecting external SaaS services, payment pathways, delivery providers, and custom automation webhooks.",
      iconName: "Link2",
      features: ["Secure OAuth Authorization Flows", "Robust Rate-Limit Recovery Handling", "Real-time CRM & Database Synchronization"]
    }
  ] as Service[],

  skills: [
    // Frontend
    { name: "React / React 19", category: "Frontend", proficiency: 98, color: "#00E5FF" },
    { name: "Next.js / Gatsby", category: "Frontend", proficiency: 95, color: "#22D3EE" },
    { name: "TypeScript", category: "Frontend", proficiency: 94, color: "#3B82F6" },
    { name: "Tailwind CSS v4", category: "Frontend", proficiency: 100, color: "#06B6D4" },
    { name: "Framer Motion", category: "Frontend", proficiency: 96, color: "#D946EF" },
    { name: "HTML5 & CSS3 Art", category: "Frontend", proficiency: 98, color: "#F97316" },
    
    // Backend
    { name: "Node.js & Express", category: "Backend", proficiency: 92, color: "#10B981" },
    { name: "MongoDB & Mongoose", category: "Backend", proficiency: 90, color: "#059669" },
    { name: "PostgreSQL / MySQL", category: "Backend", proficiency: 88, color: "#2563EB" },
    { name: "REST & GraphQL APIs", category: "Backend", proficiency: 95, color: "#EC4899" },
    { name: "Serverless (Vercel/AWS)", category: "Backend", proficiency: 86, color: "#7C3AED" },
    { name: "WebSockets & SSE", category: "Backend", proficiency: 91, color: "#6366F1" },
    
    // Tools
    { name: "Git & Advanced CI/CD", category: "Tools", proficiency: 94, color: "#F05032" },
    { name: "GitHub & Actions", category: "Tools", proficiency: 92, color: "#24292F" },
    { name: "VS Code Customization", category: "Tools", proficiency: 98, color: "#007ACC" },
    { name: "Figma (UI/UX Export)", category: "Tools", proficiency: 88, color: "#A259FF" },
    { name: "Docker Containerization", category: "Tools", proficiency: 82, color: "#2496ED" },
    { name: "Postman API Testing", category: "Tools", proficiency: 90, color: "#FF6C37" }
  ] as Skill[],

  milestones: [
    {
      id: "mile-1",
      year: "2025 - Present",
      title: "Full Stack Developer & Freelancer",
      company: "Independent Contracts",
      description: "Design and deployment of premium client portals, responsive e-commerce websites, and custom SaaS dashboards. Integrate web APIs, optimize Node.js applications, and establish responsive micro-interaction frameworks.",
      tags: ["React", "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "Framer Motion"]
    },
    {
      id: "mile-2",
      year: "2024 - 2025",
      title: "Full Stack Web Developer",
      company: "WebCraft Agency",
      description: "Engineered ultra-responsive web solutions featuring rich client-side state engines. Spearheaded migration of client repositories to modern Vite/TypeScript environments, resulting in improved performance metrics and streamlined workflows.",
      tags: ["React", "TypeScript", "Vite", "Express", "Redux Toolkit", "Sass"]
    }
  ] as Milestone[],

  testimonials: [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      role: "Chief Technology Officer",
      company: "InnovateX Corp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      comment: "Nuzhat is a rare breed in development—someone with absolute visual mastery who also engineers robust, bulletproof server APIs. Our command center platform is beautiful, fast, and a huge success with investors.",
      rating: 5
    },
    {
      id: "test-2",
      name: "David Chen",
      role: "Founder & Creative Director",
      company: "Bloom E-Commerce",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      comment: "The luxury retail storefront Nuzhat designed and developed increased our sales conversion rate by 42%. The smooth 2.5D layer animations and instantaneous screen navigation feel unbelievably futuristic and satisfying.",
      rating: 5
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      role: "VP of Product Management",
      company: "CoreSystems Cloud",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      comment: "Extremely communicative, highly professional, and delivers pristine software design. Nuzhat completed our entire customized SaaS user-portal dashboard two weeks ahead of schedule, with perfect automated test coverage.",
      rating: 5
    },
    {
      id: "test-4",
      name: "Marcus Aurelius",
      role: "Design Lead & Principal Architect",
      company: "Aura UX Lab",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      comment: "The level of visual detail is incredible. From micro-interactive spring loops to precise mouse-parallax glows, Nuzhat executes premium frontend animation perfectly. Clients are absolutely blown away on their first visit.",
      rating: 5
    }
  ] as Testimonial[]
};
