import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();

  return (
    <section className="section section-gradient section-hover-effect animate-section-5">
      <h2 className="section-title section-title-gradient section-title-underline">
        <i className="fas fa-graduation-cap"></i>
        <span>{t('education')}</span>
      </h2>
      <div>
        <h3>{t('university-name')}</h3>
        <p>{t('name-of-university')}</p>
        <span className="experience-date">{t('graduated')}</span>
        <p>{t('focused-software')}</p>
      </div>
    </section>
  );
};

export default Education;