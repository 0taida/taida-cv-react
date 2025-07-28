import { useTranslation } from 'react-i18next';

const SoftSkills = ({ skills }) => {
  const { t } = useTranslation();

  // Default skills if not provided
  const defaultSkills = [
    "analytical-skills", "teamwork", "problem-solving", "communication",
    "adaptability", "time-management", "leadership", "creativity",
    "attention-to-detail", "critical-thinking"
  ];

  const skillsList = skills || defaultSkills;

  return (
    <div className="sidebar-section">
      <div className="soft-skills">
        <h3 className="animate-fade-in-up-custom">
          {t('soft-skills')}
        </h3>
        <ul>
          {skillsList.map((skill, index) => (
            <li 
              key={index} 
              className="soft-skills-bullet animate-fade-in-delayed"
            >
              {t(skill)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SoftSkills;