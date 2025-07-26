import { useTranslation } from 'react-i18next';

const SoftSkills = () => {
  const { t } = useTranslation();

  const softSkills = [
    "analytical-skills", "teamwork", "problem-solving", "communication",
    "adaptability", "time-management", "leadership", "creativity",
    "attention-to-detail", "critical-thinking"
  ];

  return (
    <div className="mb-8 p-6 rounded-lg sidebar-section-gradient border border-white/10 transition-all duration-500 last:mb-0">
      <div className="soft-skills mt-4">
        <h3 className="text-xl mb-4 text-blue-400 animate-fade-in-up-custom">
          {t('soft-skills')}
        </h3>
        <ul className="list-none pl-0">
          {softSkills.map((skill, index) => (
            <li 
              key={index} 
              className="text-sm text-slate-400 soft-skills-bullet animate-fade-in-delayed"
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