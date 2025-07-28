// Centralized CV data configuration
export const cvData = {
  contact: {
    email: 'taida.dream@gmail.com',
    phone: '+967774126583',
    github: 'https://github.com/0taida',
    location: 'location'
  },
  
  softSkills: [
    "analytical-skills", "teamwork", "problem-solving", "communication",
    "adaptability", "time-management", "leadership", "creativity",
    "attention-to-detail", "critical-thinking"
  ],
  
  languages: [
    { key: 'english', level: 90 },
    { key: 'arabic', level: 100 }
  ],
  
  technicalSkills: {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Bootstrap", "Tailwind CSS"],
    backend: ["Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL"],
    tools: ["Git", "Docker", "Firebase", "GitHub", "Postman", "npm", "Ubuntu", "Huly App"]
  },
  
  projects: [
    {
      title: 'rai-platform',
      description: 'rai-platform-desc',
      link: 'https://raiplatform.net/',
      linkIcon: 'fas fa-external-link-alt',
      techBadges: [
        { name: 'Vue.js', icon: 'fab fa-vuejs' },
        { name: 'Django', icon: 'fab fa-python' }
      ]
    },
    {
      title: 'notification-system',
      description: 'notification-system-desc',
      techBadges: [
        { name: 'Next.js', icon: 'fab fa-react' },
        { name: 'TypeScript', icon: 'fab fa-js' },
        { name: 'Prisma', icon: 'fas fa-database' }
      ]
    },
    {
      title: 'sms-project',
      description: 'sms-project-desc',
      techBadges: [
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Express.js', icon: 'fab fa-node-js' }
      ]
    },
    {
      title: 'docker-explorer',
      description: 'docker-explorer-desc',
      techBadges: [
        { name: 'Remix.js', icon: 'fab fa-react' }
      ]
    },
    {
      title: 'simple-chat-app',
      description: 'developed-chat-app',
      techBadges: [
        { name: 'Flutter', icon: 'fas fa-mobile-alt' }
      ]
    },
    {
      title: 'opencv-project',
      description: 'opencv-desc',
      techBadges: [
        { name: 'Python', icon: 'fab fa-python' }
      ]
    },
    {
      title: 'proxy-project',
      description: 'proxy-desc',
      techBadges: [
        { name: 'Caddy', icon: 'fas fa-server' }
      ]
    }
  ]
}; 