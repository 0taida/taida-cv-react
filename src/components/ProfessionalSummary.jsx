import { useTranslation } from 'react-i18next';

const ProfessionalSummary = () => {
  const { t } = useTranslation();

  return (
    <section className="section">
      <h2 className="section-title">
        <i className="fas fa-user-tie"></i>
        <span>{t('professional-summary')}</span>
      </h2>
      <p className="text-slate-300 leading-relaxed">
        {t('professional-summary-text')}
      </p>
    </section>
  );
};

export default ProfessionalSummary;