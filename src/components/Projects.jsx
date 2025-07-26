import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
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
  ];

  return (
    <section className="section section-gradient section-hover-effect animate-section-4">
      <h2 className="section-title section-title-gradient section-title-underline">
        <i className="fas fa-code-branch"></i>
        <span>{t('projects')}</span>
      </h2>

      {projects.map((project, index) => (
        <div key={index}>
          <div>
            <div className="project-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-button"
                >
                  <i className={project.linkIcon}></i>
                </a>
              )}
              <h3 style={{ color: '#00aaff', margin: 0 }}>{t(project.title)}</h3>
              {project.techBadges.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">
                  <i className={tech.icon}></i>
                  {tech.name}
                </span>
              ))}
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{t(project.description)}</p>
          </div>
          
          {index < projects.length - 1 && (
            <div className="project-divider"></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Projects;