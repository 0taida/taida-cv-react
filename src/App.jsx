import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import './custom.css'

// Components
import ThemeToggle from './components/ThemeToggle'
import ProfileImage from './components/ProfileImage'
import ContactInfo from './components/ContactInfo'
import SoftSkills from './components/SoftSkills'
import Languages from './components/Languages'
import ProfessionalSummary from './components/ProfessionalSummary'
import TechnicalSkills from './components/TechnicalSkills'
import Projects from './components/Projects'

function App() {
  const [theme, setTheme] = useState('dark')
  const { t, i18n } = useTranslation()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    // Use body class approach for theme management
    document.body.className = theme === 'light' ? 'light-theme' : ''
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [theme, i18n.language])

  return (
    <div className="min-h-screen cv-body-gradient text-gray-200 flex flex-wrap font-poppins animate-fade-in-custom">
      <ThemeToggle
        theme={theme}
        onThemeToggle={toggleTheme}
        onLanguageToggle={toggleLanguage}
      />

      {/* Sidebar */}
      <div className="w-[300px] p-2 flex flex-col shadow-inner animate-slide-in-sidebar-custom relative rounded-2xl md:w-full md:max-w-full md:p-2 md:mb-4 md:border-none md:shadow-none md:transform-none md:animate-none">
        <ProfileImage />
        <ContactInfo />
        <SoftSkills />
        <Languages />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 mt-6 md:p-4 md:w-full md:mt-1">
        <ProfessionalSummary />

        {/* Experience Section */}
        <section className="section animate-section-2">
          <h2 className="section-title">
            <i className="fas fa-briefcase"></i>
            <span>{t('experience')}</span>
          </h2>
          <div className="mb-6">
            <h3 className="text-blue-400 mb-2">{t('software-developer')}</h3>
            <span className="text-slate-400">2023 - {t('present')}</span>
            <p className="text-slate-400 mb-2">{t('doing')}</p>
            <ul className="list-none pl-0 space-y-1">
              <li className="text-slate-300">• {t('collaborated-platform')}</li>
              <li className="text-slate-300">• {t('enhanced-ui')}</li>
              <li className="text-slate-300">• {t('participated-development')}</li>
            </ul>
          </div>
        </section>

        <TechnicalSkills />

        <Projects />

        {/* Education Section */}
        <section className="section animate-section-5">
          <h2 className="section-title">
            <i className="fas fa-graduation-cap"></i>
            <span>{t('education')}</span>
          </h2>
          <div>
            <h3 className="text-blue-400 mb-2">{t('university-name')}</h3>
            <p className="text-slate-300">{t('name-of-university')}</p>
            <span className="text-slate-400">{t('graduated')}</span>
            <p className="text-slate-300 mt-2">{t('focused-software')}</p>
          </div>
        </section>

        {/* Interests Section */}
        <section className="section animate-section-5">
          <h2 className="section-title">
            <i className="fas fa-star"></i>
            <span>{t('interests')}</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            {t('enthusiastic-exploring')}
          </p>
        </section>
      </div>
    </div>
  )
}

export default App