import { useTranslation } from 'react-i18next';

const ProfessionalSummary = () => {
  const { t } = useTranslation();

  return (
    <section className="section section-gradient section-hover-effect animate-section-1">
      <h2 className="section-title section-title-gradient section-title-underline">
        <i className="fas fa-user-tie"></i>
        <span>{t('professional-summary')}</span>
      </h2>
      <p>
        {t('passionate-developer')}
      </p>
    </section>
  );
};

export default ProfessionalSummary;