import { useTranslation } from 'react-i18next';

const Languages = () => {
  const { t } = useTranslation();

  const languages = [
    { key: 'english', level: 90 },
    { key: 'arabic', level: 100 }
  ];

  return (
    <div className="mb-8 p-6 rounded-lg sidebar-section-gradient border border-white/10 transition-all duration-500 last:mb-0">
      <div className="languages">
        <h3 className="text-xl mb-4 text-blue-400 animate-fade-in-up-custom">
          {t('languages')}
        </h3>
        <ul className="list-none w-full">
          {languages.map((lang, index) => (
            <li key={index} className="mb-4 w-full">
              <span className="text-slate-400" style={{ fontSize: '0.9rem' }}>{t(lang.key)}</span>
              <div className="language-progress-bar animate-fade-in-most-delayed">
                <span 
                  className="language-progress-fill"
                  style={{ width: `${lang.level}%` }}
                >
                  <span className="language-progress-label">
                    {lang.level}%
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Languages;