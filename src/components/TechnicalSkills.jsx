import { useTranslation } from 'react-i18next';

const TechnicalSkills = ({ skillsData }) => {
  const { t } = useTranslation();

  // Default skills if not provided
  const defaultSkillsData = {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Bootstrap", "Tailwind CSS"],
    backend: ["Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL"],
    tools: ["Git", "Docker", "Firebase", "GitHub", "Postman", "npm", "Ubuntu", "Huly App"]
  };

  const skills = skillsData || defaultSkillsData;

  return (
    <div className="skills-container">
      <section className="section section-gradient section-hover-effect animate-section-3">
        <h2 className="section-title section-title-gradient section-title-underline">
          <i className="fas fa-laptop-code"></i>
          <span>{t('frontend-skills')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {skills.frontend.map((skill, index) => (
            <li 
              key={index} 
              className="skill-chip skill-chip-hover animate-fade-in-more-delayed"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-gradient section-hover-effect animate-section-3">
        <h2 className="section-title section-title-gradient section-title-underline">
          <i className="fas fa-server"></i>
          <span>{t('backend-skills')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {skills.backend.map((skill, index) => (
            <li 
              key={index} 
              className="skill-chip skill-chip-hover animate-fade-in-more-delayed"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-gradient section-hover-effect animate-section-3">
        <h2 className="section-title section-title-gradient section-title-underline">
          <i className="fas fa-tools"></i>
          <span>{t('tools-technologies')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {skills.tools.map((skill, index) => (
            <li 
              key={index} 
              className="skill-chip skill-chip-hover animate-fade-in-more-delayed"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TechnicalSkills;