import { useTranslation } from 'react-i18next';
import PrintButton from './PrintButton';

const ThemeToggle = ({ theme, onThemeToggle, onLanguageToggle }) => {
  const { i18n } = useTranslation();

  return (
    <div className="theme-language-toggles">
      <button 
        onClick={onThemeToggle}
        className="theme-toggle-button"
      >
        <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
      </button>
      <button 
        onClick={onLanguageToggle}
        className="theme-toggle-button"
      >
        <i className="fas fa-globe"></i>
      </button>
      <PrintButton />
    </div>
  );
};

export default ThemeToggle;