import { useTranslation } from 'react-i18next';

const Languages = ({ languages }) => {
  const { t } = useTranslation();

  // Default languages if not provided
  const defaultLanguages = [
    { key: 'english', level: 90 },
    { key: 'arabic', level: 100 }
  ];

  const languagesList = languages || defaultLanguages;

  return (
    <div className="sidebar-section">
      <div className="languages">
        <h3 className="animate-fade-in-up-custom">
          {t('languages')}
        </h3>
        <ul>
          {languagesList.map((lang, index) => (
            <li key={index}>
              <span>{t(lang.key)}</span>
              <div className="language-progress-bar">
                <span 
                  className="language-progress-fill"
                  style={{ width: `${lang.level}%` }}
                  data-label={`${lang.level}%`}
                ></span>
                <span className="language-progress-label">{lang.level}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Languages;