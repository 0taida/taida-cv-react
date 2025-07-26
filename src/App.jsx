import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')

  const translations = {
    en: {
      contact: "Contact",
      location: "Sana'a, Yemen",
      "soft-skills": "Soft Skills",
      "analytical-skills": "Analytical Skills",
      teamwork: "Teamwork",
      "problem-solving": "Problem Solving",
      communication: "Communication",
      adaptability: "Adaptability",
      "time-management": "Time Management",
      leadership: "Leadership",
      creativity: "Creativity",
      "attention-to-detail": "Attention to Detail",
      "critical-thinking": "Critical Thinking",
      languages: "Languages",
      english: "English",
      arabic: "Arabic",
      "professional-summary": "Professional Summary",
      "technical-skills": "Technical Skills",
      experience: "Experience",
      education: "Education",
      projects: "Projects"
    },
    ar: {
      contact: "التواصل",
      location: "صنعاء، اليمن",
      "soft-skills": "المهارات الشخصية",
      "analytical-skills": "المهارات التحليلية",
      teamwork: "العمل الجماعي",
      "problem-solving": "حل المشكلات",
      communication: "التواصل",
      adaptability: "القدرة على التكيف",
      "time-management": "إدارة الوقت",
      leadership: "القيادة",
      creativity: "الإبداع",
      "attention-to-detail": "الانتباه للتفاصيل",
      "critical-thinking": "التفكير النقدي",
      languages: "اللغات",
      english: "الإنجليزية",
      arabic: "العربية",
      "professional-summary": "الملخص المهني",
      "technical-skills": "المهارات التقنية",
      experience: "الخبرة",
      education: "التعليم",
      projects: "المشاريع"
    }
  }

  const t = (key) => translations[language][key] || key

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : ''
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [theme, language])

  const skills = [
    "JavaScript", "React", "Node.js", "Python", "HTML/CSS", "Git",
    "MongoDB", "Express.js", "REST APIs", "Responsive Design"
  ]

  const softSkills = [
    "analytical-skills", "teamwork", "problem-solving", "communication",
    "adaptability", "time-management", "leadership", "creativity",
    "attention-to-detail", "critical-thinking"
  ]

  return (
    <div className="app">
      <div className="theme-language-toggles">
        <button onClick={toggleTheme}>
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button onClick={toggleLanguage}>
          <i className="fas fa-globe"></i>
        </button>
      </div>

      <div className="sidebar">
        <img src="/face.png" alt="Profile Image" className="profile-img" />

        <div className="sidebar-section">
          <div className="contact-info">
            <h3>{t('contact')}</h3>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:taida.dream@gmail.com">taida.dream@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+967774126583" dir="ltr">+967774126583</a>
              </li>
              <li>
                <i className="fab fa-github"></i>
                <a href="https://github.com/0taida" target="_blank">Github</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>{t('location')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="soft-skills">
            <h3>{t('soft-skills')}</h3>
            <ul>
              {softSkills.map((skill, index) => (
                <li key={index}>{t(skill)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="languages">
            <h3>{t('languages')}</h3>
            <ul>
              <li>
                <span>{t('english')}</span>
                <div className="language-bar">
                  <span style={{ width: '90%' }} data-label="90%"></span>
                </div>
              </li>
              <li>
                <span>{t('arabic')}</span>
                <div className="language-bar">
                  <span style={{ width: '100%' }} data-label="100%"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-content">
        <section className="section">
          <h2 className="section-title">
            <i className="fas fa-user-tie"></i>
            <span>{t('professional-summary')}</span>
          </h2>
          <p>
            {language === 'en'
              ? "Passionate Full Stack Developer with expertise in modern web technologies. Experienced in building responsive, user-friendly applications using React, Node.js, and various databases. Strong problem-solving skills and a commitment to writing clean, maintainable code."
              : "مطور ويب متكامل شغوف بخبرة في تقنيات الويب الحديثة. خبرة في بناء تطبيقات متجاوبة وسهلة الاستخدام باستخدام React و Node.js وقواعد البيانات المختلفة. مهارات قوية في حل المشكلات والتزام بكتابة كود نظيف وقابل للصيانة."
            }
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">
            <i className="fas fa-code"></i>
            <span>{t('technical-skills')}</span>
          </h2>
          <div className="skills">
            <ul>
              {skills.map((skill, index) => (
                <li key={index} className="skill-chip">{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <i className="fas fa-briefcase"></i>
            <span>{t('experience')}</span>
          </h2>
          <div className="experience-item">
            <h3>Full Stack Developer</h3>
            <p className="company">Freelance • 2022 - Present</p>
            <ul>
              <li>Developed responsive web applications using React and Node.js</li>
              <li>Implemented RESTful APIs and database integration</li>
              <li>Collaborated with clients to deliver custom solutions</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <i className="fas fa-graduation-cap"></i>
            <span>{t('education')}</span>
          </h2>
          <div className="education-item">
            <h3>Computer Science</h3>
            <p>University of Science and Technology • 2020-2024</p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">
            <i className="fas fa-project-diagram"></i>
            <span>{t('projects')}</span>
          </h2>
          <div className="project-item">
            <div className="project-header">
              <h3>Personal CV Website</h3>
              <a href="https://github.com/0taida" className="project-link-button" target="_blank">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <p>A responsive, bilingual CV website with theme switching capabilities.</p>
            <div className="tech-badges">
              <span className="tech-badge">HTML</span>
              <span className="tech-badge">CSS</span>
              <span className="tech-badge">JavaScript</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
