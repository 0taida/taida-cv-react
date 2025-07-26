import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-8 p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-inner opacity-0 transform translate-y-5 animate-fade-in-up border border-white/10 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-inner hover:border-white/20 transition-all duration-500 light:bg-white light:border-gray-300 light:shadow-sm light:hover:shadow-md light:hover:border-gray-400 light:hover:transform-none light:hover:scale-100">
      <h2 className="text-2xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent relative transition-all duration-500 flex items-center gap-2 light:bg-none light:bg-clip-border light:text-black after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-500 hover:after:w-full light:after:bg-black">
        <i className="fas fa-graduation-cap"></i>
        <span>{t('education')}</span>
      </h2>
      <div className="education-item mb-6">
        <h3 className="text-blue-400 mb-2 light:text-black">{t('computer-science')}</h3>
        <p className="text-slate-300 light:text-gray-700">
          {t('university')} • 2020-2024
        </p>
      </div>
    </section>
  );
};

export default Education;