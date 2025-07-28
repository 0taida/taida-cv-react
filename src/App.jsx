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
import Experience from './components/Experience'
import TechnicalSkills from './components/TechnicalSkills'
import Projects from './components/Projects'
import Education from './components/Education'
import Interests from './components/Interests'

// Data
import { cvData } from './data/cvData'

function App() {
  const [theme, setTheme] = useState('dark')
  const { t, i18n } = useTranslation()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  // Initialize theme and language from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedLanguage = localStorage.getItem('language')
    
    if (storedTheme) {
      setTheme(storedTheme)
    }
    
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
    }
  }, [i18n])

  useEffect(() => {
    // Use body class approach for theme management - exact HTML match
    document.body.className = theme === 'light' ? 'light-theme' : ''
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [theme, i18n.language])

  return (
    <div className="cv-body-gradient font-poppins">
      <ThemeToggle
        theme={theme}
        onThemeToggle={toggleTheme}
        onLanguageToggle={toggleLanguage}
      />

      {/* Sidebar */}
      <div className={`sidebar ${
        i18n.language === 'ar' ? 'animate-slide-in-sidebar-rtl-custom' : 'animate-slide-in-sidebar-custom'
      }`}>
        <ProfileImage />
        <ContactInfo contactData={cvData.contact} />
        <SoftSkills skills={cvData.softSkills} />
        <Languages languages={cvData.languages} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <ProfessionalSummary />
        <Experience />
        <TechnicalSkills skillsData={cvData.technicalSkills} />
        <Projects projects={cvData.projects} />
        <Education />
        <Interests />
      </div>
    </div>
  )
}

export default App