import { useTranslation } from 'react-i18next';

const Interests = () => {
  const { t } = useTranslation();

  return (
    <section className="section section-gradient section-hover-effect animate-section-5">
      <h2 className="section-title section-title-gradient section-title-underline">
        <i className="fas fa-star"></i>
        <span>{t('interests')}</span>
      </h2>
      <p>
        {t('enthusiastic-exploring')}
      </p>
    </section>
  );
};

export default Interests; 