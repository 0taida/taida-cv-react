import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cvData } from '../data/cvData';

const PrintButton = () => {
  const { t, i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function truncateText(text, maxChars = 160) {
    if (!text) return '';
    const normalized = String(text).replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxChars) return normalized;
    const slice = normalized.slice(0, maxChars);
    const lastBreak = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf(' '));
    const cut = lastBreak > 60 ? slice.slice(0, lastBreak) : slice;
    return cut.replace(/[\s.,;:]+$/, '') + '…';
  }

  function tExists(key) {
    if (!key) return false;
    const v = t(key);
    return Boolean(v) && v !== key;
  }

  function getShortDescription(keyOrText, fallbackMax = 160) {
    if (!keyOrText) return '';
    const shortKey = `${keyOrText}-short`;
    if (tExists(shortKey)) return t(shortKey);
    if (tExists(keyOrText)) return truncateText(t(keyOrText), fallbackMax);
    return truncateText(String(keyOrText), fallbackMax);
  }

  function buildPrintHTML() {
    const isArabic = i18n.language && i18n.language.toLowerCase().startsWith('ar');
    const dir = isArabic ? 'rtl' : 'ltr';
    const lang = isArabic ? 'ar' : 'en';
    const contentWidth = isArabic ? '180mm' : '186mm';

    const githubDisplay = (cvData.contact.github || '').replace(/^https?:\/\//, '');
    const languagesText = (cvData.languages || [])
      .map(l => `${escapeHTML(t(l.key))} (${l.level}%)`)
      .join(', ');
    const softSkillsText = (cvData.softSkills || [])
      .slice(0, 8)
      .map(key => escapeHTML(t(key)))
      .join(', ');

    const projects = (cvData.projects || []).slice(0, 3);
    const projectsHTML = projects.map(project => {
      const title = escapeHTML(t(project.title) || project.title);
      const techNames = (project.techBadges || []).map(tb => tb.name).join(', ');
      const tech = escapeHTML(techNames);
      const desc = escapeHTML(getShortDescription(project.description, 170) || '');
      return `
        <div class="project-entry">
          <div class="project-header">
            <div class="project-title"><strong>${title}</strong></div>
            ${tech ? `<div class="project-tech">${tech}</div>` : ''}
          </div>
          <div class="project-desc">${desc}</div>
        </div>
      `;
    }).join('');

    const summaryText = escapeHTML(
      t('passionate-developer') || 'Passionate developer with expertise in modern web technologies.'
    );

    const eduTitle = escapeHTML(t('university-name') || "Bachelor's in Information Technology");
    const eduUniversity = escapeHTML(t('name-of-university') || 'University of Yemen');
    const eduGraduated = escapeHTML(t('graduated') || 'Graduated: 2023');
    const eduFocus = escapeHTML(
      t('focused-software') || 'Focused on information technology and application development.'
    );

    const experienceLines = [
      t('doing') || 'Currently working as a software developer',
      t('collaborated-platform') || 'Collaborated on a Laravel-based platform enabling online store creation',
      t('enhanced-ui') || 'Enhanced UI using Vue.js, Bootstrap and Tailwind CSS',
      t('participated-development') || 'Participated in feature development, debugging, and code reviews'
    ].map(escapeHTML);

    const skillCategories = [
      { labelKey: 'frontend-development', fallback: 'Frontend Development', skills: cvData.technicalSkills.frontend },
      { labelKey: 'backend-development', fallback: 'Backend Development', skills: cvData.technicalSkills.backend },
      { labelKey: 'tools-development', fallback: 'Tools', skills: cvData.technicalSkills.tools }
    ];
    const skillsHTML = skillCategories.map(category => {
      const labelText = t(category.labelKey) || category.fallback;
      const label = escapeHTML(`${labelText}:`);
      const list = escapeHTML((category.skills || []).join(', '));
      return `<li><strong>${label}</strong> ${list}</li>`;
    }).join('');

    const styles = `
      @page { size: A4; margin: 0; }
      html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      * { box-sizing: border-box; }
      .page { width: 210mm; min-height: 297mm; background: #ffffff; color: #000; }
      .container {
        width: ${contentWidth};
        margin-left: auto; margin-right: auto;
        padding: 16mm 12mm;
        font-family: ${isArabic ? "'Noto Naskh Arabic', 'Amiri', 'Scheherazade', 'Times New Roman', Times, serif" : 'Times, "Times New Roman", serif'};
        font-size: 11pt; line-height: 1.35;
      }
      .header { text-align: center; margin-bottom: 10pt; border-bottom: 1pt solid #000; padding-bottom: 8pt; }
      .name { font-size: 20pt; font-weight: 700; margin: 0 0 6pt 0; letter-spacing: 0.5pt; }
      .contact { font-size: 10pt; }

      .section { margin: 12pt 0 14pt; }
      .section-title { text-align: center; font-size: 12pt; font-weight: 700; margin-bottom: 8pt; font-style: italic; }
      .section p, .section li, .project-desc { text-align: justify; }

      .skills ul { list-style: disc; padding-${isArabic ? 'right' : 'left'}: 18pt; margin: 0; }
      .skills li { margin-bottom: 5pt; }

      .experience .job-header, .project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
      .job-title { font-size: 11pt; font-weight: 700; }
      .job-date { font-size: 10pt; font-style: italic; }
      .project-tech { font-size: 9pt; font-style: italic; color: #666; }

      .education .edu-line { margin-bottom: 3pt; }

      [dir='rtl'] .skills ul { padding-right: 18pt; padding-left: 0; }
      [dir='rtl'] .experience .job-header, [dir='rtl'] .project-header { direction: rtl; }
    `;

    return `<!doctype html>
      <html lang="${lang}" dir="${dir}">
      <head>
        <meta charset="utf-8" />
        <title>Taida Alshahrani CV</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="page">
          <div class="container">
            <div class="header">
              <h1 class="name">Taida Alshahrani</h1>
              <div class="contact">
                <div style="margin-bottom:3pt;">${escapeHTML(t('location') || '')} • <span dir="ltr">${escapeHTML(cvData.contact.phone)}</span></div>
                <div><a href="mailto:${escapeHTML(cvData.contact.email)}" style="color:#000;text-decoration:none;">${escapeHTML(cvData.contact.email)}</a> • ${escapeHTML(githubDisplay)}</div>
              </div>
            </div>

            <div class="section summary">
              <div class="section-title">${escapeHTML(t('professional-summary') || 'Professional Summary')}</div>
              <p>${summaryText}</p>
            </div>

            <div class="section skills">
              <div class="section-title">${escapeHTML(t('top-skills') || 'Top Skills')}</div>
              <ul>${skillsHTML}</ul>
            </div>

            <div class="section experience">
              <div class="section-title">${escapeHTML(t('professional-experience') || 'Work Experience')}</div>
              <div class="job">
                <div class="job-header">
                  <div class="job-title">${escapeHTML(t('software-developer') || 'Software Developer')}</div>
                  <div class="job-date">2023 - Present</div>
                </div>
                <p>${experienceLines.join('. ')}.</p>
              </div>
            </div>

            <div class="section projects">
              <div class="section-title">${escapeHTML(t('projects') || 'Key Projects')}</div>
              ${projectsHTML}
            </div>

            <div class="section education">
              <div class="section-title">${escapeHTML(t('education') || 'Education')}</div>
              <div class="edu">
                <div class="edu-line"><strong>${eduTitle}</strong></div>
                <div class="edu-line">${eduUniversity}</div>
                <div class="edu-line">${eduGraduated}</div>
                <div class="edu-line">${eduFocus}</div>
              </div>
            </div>

            <div class="section additional">
              <div class="section-title">${escapeHTML(t('additional-qualifications') || 'Additional Qualifications')}</div>
              <div><strong>${escapeHTML(t('languages') || 'Languages')}:</strong> ${languagesText}</div>
              <div><strong>${escapeHTML(t('core-competencies') || 'Core Competencies')}:</strong> ${softSkillsText}</div>
            </div>
          </div>
        </div>
      </body>
      </html>`;
  }

  const handlePrint = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const html = buildPrintHTML();

      const iframe = document.createElement('iframe');
      iframe.setAttribute('title', 'cv-print-frame');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.style.zIndex = '-1';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();

      await new Promise(resolve => setTimeout(resolve, 150));

      const iframeWin = iframe.contentWindow;
      const cleanup = () => {
        try { document.body.removeChild(iframe); } catch (_) {}
        setIsGenerating(false);
      };

      // Attempt reliable cleanup after printing
      let cleanupDone = false;
      const doCleanupOnce = () => {
        if (cleanupDone) return; cleanupDone = true; cleanup();
      };
      iframeWin.onafterprint = doCleanupOnce;

      // Some browsers need a small delay before print
      setTimeout(() => {
        try {
          iframeWin.focus();
          iframeWin.print();
        } catch (_) {
          doCleanupOnce();
        }
      }, 50);

      // Fallback cleanup if afterprint does not fire
      setTimeout(doCleanupOnce, 3000);
    } catch (error) {
      console.error('Print failed:', error);
      setIsGenerating(false);
      alert(t('pdf-error', 'Failed to generate PDF. Please try again.'));
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={`print-button theme-toggle-button ${isGenerating ? 'generating' : ''}`}
      title={t('print-cv', 'Print CV')}
      disabled={isGenerating}
    >
      <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-print'}`}></i>
    </button>
  );
};

export default PrintButton;


