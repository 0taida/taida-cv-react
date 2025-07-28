import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section className="section section-gradient section-hover-effect animate-section-2">
      <h2 className="section-title section-title-gradient section-title-underline">
        <i className="fas fa-briefcase"></i>
        <span>{t('professional-experience')}</span>
      </h2>
      <div>
        <h3>{t('software-developer')}</h3>
        <span className="experience-date">2023 - Present</span>
        <p>{t('doing')}</p>
        <ul>
          <li>{t('collaborated-platform')}</li>
          <li>{t('enhanced-ui')}</li>
          <li>{t('participated-development')}</li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;