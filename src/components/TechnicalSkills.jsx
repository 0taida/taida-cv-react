import { useTranslation } from 'react-i18next';

const TechnicalSkills = () => {
  const { t } = useTranslation();

  const frontendSkills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Bootstrap", "Tailwind CSS"];
  const backendSkills = ["Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL"];
  const toolsSkills = ["Git", "Docker", "Firebase", "GitHub", "Postman", "npm", "Ubuntu", "Huly App"];

  return (
    <div className="skills-container">
      <section className="section animate-section-3">
        <h2 className="section-title section-title-underline">
          <i className="fas fa-laptop-code"></i>
          <span>{t('frontend-skills')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {frontendSkills.map((skill, index) => (
            <li 
              key={index} 
              className="skill-chip skill-chip-hover animate-fade-in-more-delayed"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="section animate-section-3">
        <h2 className="section-title section-title-underline">
          <i className="fas fa-server"></i>
          <span>{t('backend-skills')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {backendSkills.map((skill, index) => (
            <li 
              key={index} 
              className="skill-chip skill-chip-hover animate-fade-in-more-delayed"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="section animate-section-3">
        <h2 className="section-title section-title-underline">
          <i className="fas fa-tools"></i>
          <span>{t('tools-technologies')}</span>
        </h2>
        <ul className="flex flex-wrap gap-2 list-none">
          {toolsSkills.map((skill, index) => (
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