import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import html2pdf from 'html2pdf.js';

const PrintButton = () => {
  const { t, i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    if (isGenerating) return;

    setIsGenerating(true);

    try {
      // Get the original CV data
      const originalContainer = document.querySelector('.cv-body-gradient');

      if (!originalContainer) {
        console.error('CV container not found');
        setIsGenerating(false);
        return;
      }

      // Create a completely new classic CV document
      const cvDocument = document.createElement('div');
      cvDocument.style.width = '210mm';
      cvDocument.style.maxHeight = '297mm';
      cvDocument.style.backgroundColor = '#ffffff';
      cvDocument.style.fontFamily = 'Times, "Times New Roman", serif';
      cvDocument.style.color = '#000000';
      cvDocument.style.fontSize = '11pt';
      cvDocument.style.lineHeight = '1.3';
      cvDocument.style.padding = '20mm 18mm';
      cvDocument.style.boxSizing = 'border-box';
      cvDocument.style.margin = '0';
      cvDocument.style.overflow = 'hidden';

      // Create header section
      const header = document.createElement('div');
      header.style.textAlign = 'center';
      header.style.marginBottom = '12pt';
      header.style.borderBottom = '1pt solid #000000';
      header.style.paddingBottom = '10pt';

      // Name
      const name = document.createElement('h1');
      name.textContent = 'Taida Alshahrani';
      name.style.fontSize = '20pt';
      name.style.fontWeight = 'bold';
      name.style.margin = '0 0 8pt 0';
      name.style.color = '#000000';
      name.style.letterSpacing = '1pt';

      // Contact info line
      const contactLine = document.createElement('div');
      contactLine.style.fontSize = '10pt';
      contactLine.style.color = '#000000';
      contactLine.style.lineHeight = '1.3';
      contactLine.innerHTML = `
        <div style="margin-bottom: 3pt;">${t('location') || 'Riyadh, Saudi Arabia'} • (+967) 774-126-583</div>
        <div>taida.dream@gmail.com • github.com/0taida</div>
      `;

      header.appendChild(name);
      header.appendChild(contactLine);

      // Professional Summary Section - Extract from actual component
      const summarySection = document.createElement('div');
      summarySection.style.marginBottom = '15pt';

      const summaryTitle = document.createElement('div');
      summaryTitle.textContent = t('professional-summary') || 'Professional Summary';
      summaryTitle.style.fontSize = '12pt';
      summaryTitle.style.fontWeight = 'bold';
      summaryTitle.style.color = '#000000';
      summaryTitle.style.marginBottom = '8pt';
      summaryTitle.style.textAlign = 'center';
      summaryTitle.style.fontStyle = 'italic';

      const summaryContent = document.createElement('div');
      const originalSummary = originalContainer.querySelector('.professional-summary, [class*="summary"]');
      let summaryText = '';
      if (originalSummary) {
        // Extract the actual paragraph content
        const summaryParagraph = originalSummary.querySelector('p');
        if (summaryParagraph) {
          summaryText = summaryParagraph.textContent || summaryParagraph.innerText || '';
          summaryText = summaryText.replace(/\s+/g, ' ').trim();
        }
      }
      if (!summaryText) {
        // Use the translation key from ProfessionalSummary.jsx
        summaryText = t('passionate-developer') || 'Passionate developer with expertise in modern web technologies.';
      }
      summaryContent.textContent = summaryText;
      summaryContent.style.fontSize = '11pt';
      summaryContent.style.lineHeight = '1.4';
      summaryContent.style.textAlign = 'justify';
      summaryContent.style.color = '#000000';

      summarySection.appendChild(summaryTitle);
      summarySection.appendChild(summaryContent);

      // Top Skills Section - Extract from actual data
      const skillsSection = document.createElement('div');
      skillsSection.style.marginBottom = '12pt';

      const skillsTitle = document.createElement('div');
      skillsTitle.textContent = 'Top Skills';
      skillsTitle.style.fontSize = '12pt';
      skillsTitle.style.fontWeight = 'bold';
      skillsTitle.style.color = '#000000';
      skillsTitle.style.marginBottom = '6pt';
      skillsTitle.style.textAlign = 'center';
      skillsTitle.style.fontStyle = 'italic';

      const skillsList = document.createElement('ul');
      skillsList.style.listStyle = 'disc';
      skillsList.style.paddingLeft = '20pt';
      skillsList.style.margin = '0';
      skillsList.style.lineHeight = '1.3';

      // Extract technical skills from actual data
      const originalTechSkills = originalContainer.querySelector('.technical-skills, [class*="technical"]');
      const skillChips = originalTechSkills ? originalTechSkills.querySelectorAll('.skill-chip, .tech-badge') : [];

      if (skillChips.length > 0) {
        // Group skills from actual data
        const frontendSkills = [];
        const backendSkills = [];
        const otherSkills = [];

        Array.from(skillChips).forEach(chip => {
          const skill = chip.textContent.trim();
          if (skill.toLowerCase().includes('react') || skill.toLowerCase().includes('vue') ||
            skill.toLowerCase().includes('angular') || skill.toLowerCase().includes('css') ||
            skill.toLowerCase().includes('html') || skill.toLowerCase().includes('javascript') ||
            skill.toLowerCase().includes('typescript') || skill.toLowerCase().includes('bootstrap') ||
            skill.toLowerCase().includes('tailwind')) {
            frontendSkills.push(skill);
          } else if (skill.toLowerCase().includes('node') || skill.toLowerCase().includes('php') ||
            skill.toLowerCase().includes('laravel') || skill.toLowerCase().includes('mysql') ||
            skill.toLowerCase().includes('postgresql') || skill.toLowerCase().includes('database')) {
            backendSkills.push(skill);
          } else {
            otherSkills.push(skill);
          }
        });

        // Add detailed skill descriptions
        if (frontendSkills.length > 0) {
          const frontendItem = document.createElement('li');
          frontendItem.innerHTML = `<strong>Frontend Development:</strong> Proficient in ${frontendSkills.join(', ')} with extensive experience building responsive, user-friendly web applications. Expertise in modern JavaScript ES6+, component-based architecture, state management solutions, and CSS frameworks for creating pixel-perfect, accessible user interfaces.`;
          frontendItem.style.marginBottom = '6pt';
          frontendItem.style.fontSize = '11pt';
          frontendItem.style.textAlign = 'justify';
          skillsList.appendChild(frontendItem);
        }

        if (backendSkills.length > 0) {
          const backendItem = document.createElement('li');
          backendItem.innerHTML = `<strong>Backend Development:</strong> Strong experience with ${backendSkills.join(', ')}, RESTful API design, microservices architecture, and database optimization. Skilled in server-side development, authentication systems, and cloud deployment strategies for scalable applications.`;
          backendItem.style.marginBottom = '6pt';
          backendItem.style.fontSize = '11pt';
          backendItem.style.textAlign = 'justify';
          skillsList.appendChild(backendItem);
        }

        if (otherSkills.length > 0) {
          const otherItem = document.createElement('li');
          otherItem.innerHTML = `<strong>Development Tools & Methodologies:</strong> ${otherSkills.join(', ')}, version control with Git, CI/CD pipelines, Agile/Scrum methodologies, test-driven development, and code review processes. Experience with containerization and modern development workflows.`;
          otherItem.style.marginBottom = '6pt';
          otherItem.style.fontSize = '11pt';
          otherItem.style.textAlign = 'justify';
          skillsList.appendChild(otherItem);
        }
      } else {
        // Use actual cvData as fallback
        const skillCategories = [
          { name: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Bootstrap', 'Tailwind CSS'] },
          { name: 'Backend', skills: ['Node.js', 'PHP', 'Laravel', 'MySQL', 'PostgreSQL'] },
          { name: 'Tools', skills: ['Git', 'Docker', 'Firebase', 'GitHub', 'Postman', 'npm', 'Ubuntu'] }
        ];

        skillCategories.forEach(category => {
          const skillItem = document.createElement('li');
          skillItem.innerHTML = `<strong>${category.name} Development:</strong> ${category.skills.join(', ')}`;
          skillItem.style.marginBottom = '4pt';
          skillItem.style.fontSize = '11pt';
          skillsList.appendChild(skillItem);
        });
      }

      skillsSection.appendChild(skillsTitle);
      skillsSection.appendChild(skillsList);

      // Work Experience Section - Extract from actual Experience.jsx component
      const experienceSection = document.createElement('div');
      experienceSection.style.marginBottom = '15pt';

      const experienceTitle = document.createElement('div');
      experienceTitle.textContent = t('professional-experience') || 'Work Experience';
      experienceTitle.style.fontSize = '12pt';
      experienceTitle.style.fontWeight = 'bold';
      experienceTitle.style.color = '#000000';
      experienceTitle.style.marginBottom = '10pt';
      experienceTitle.style.textAlign = 'center';
      experienceTitle.style.fontStyle = 'italic';

      experienceSection.appendChild(experienceTitle);

      // Extract from actual Experience component
      const originalExperience = originalContainer.querySelector('.experience, [class*="experience"]');
      if (originalExperience) {
        const jobEntry = document.createElement('div');
        jobEntry.style.marginBottom = '12pt';

        const jobHeader = document.createElement('div');
        jobHeader.style.display = 'flex';
        jobHeader.style.justifyContent = 'space-between';
        jobHeader.style.alignItems = 'baseline';
        jobHeader.style.marginBottom = '4pt';

        // Extract job title from h3
        const jobTitleElement = originalExperience.querySelector('h3');
        const jobTitle = jobTitleElement ? (t('software-developer') || jobTitleElement.textContent.trim()) : 'Software Developer';

        // Extract date from .experience-date
        const dateElement = originalExperience.querySelector('.experience-date');
        const jobDate = dateElement ? dateElement.textContent.trim() : '2023 - Present';

        const jobInfo = document.createElement('div');
        jobInfo.innerHTML = `<strong>${jobTitle}</strong>`;
        jobInfo.style.fontSize = '11pt';

        const jobDateEl = document.createElement('div');
        jobDateEl.textContent = jobDate;
        jobDateEl.style.fontSize = '10pt';
        jobDateEl.style.fontStyle = 'italic';

        jobHeader.appendChild(jobInfo);
        jobHeader.appendChild(jobDateEl);

        // Extract job description from paragraph and list items
        const jobDescription = document.createElement('div');
        let descriptionText = '';
        
        // Get the paragraph description
        const paragraph = originalExperience.querySelector('p');
        if (paragraph) {
          descriptionText += (t('doing') || paragraph.textContent.trim()) + ' ';
        }

        // Get the list items
        const listItems = originalExperience.querySelectorAll('ul li');
        if (listItems.length > 0) {
          const listTexts = Array.from(listItems).map(li => {
            const key = li.textContent.trim();
            return t('collaborated-platform') || t('enhanced-ui') || t('participated-development') || key;
          });
          descriptionText += listTexts.join('. ') + '.';
        }

        jobDescription.textContent = descriptionText || 'Developed and maintained web applications using modern technologies and frameworks.';
        jobDescription.style.fontSize = '11pt';
        jobDescription.style.lineHeight = '1.4';
        jobDescription.style.textAlign = 'justify';
        jobDescription.style.marginTop = '4pt';

        jobEntry.appendChild(jobHeader);
        jobEntry.appendChild(jobDescription);
        experienceSection.appendChild(jobEntry);
      } else {
        // Fallback using translation keys from Experience.jsx
        const jobEntry = document.createElement('div');
        jobEntry.style.marginBottom = '12pt';

        const jobHeader = document.createElement('div');
        jobHeader.style.display = 'flex';
        jobHeader.style.justifyContent = 'space-between';
        jobHeader.style.alignItems = 'baseline';
        jobHeader.style.marginBottom = '4pt';

        const jobInfo = document.createElement('div');
        jobInfo.innerHTML = `<strong>${t('software-developer') || 'Software Developer'}</strong>`;
        jobInfo.style.fontSize = '11pt';

        const jobDateEl = document.createElement('div');
        jobDateEl.textContent = '2023 - Present';
        jobDateEl.style.fontSize = '10pt';
        jobDateEl.style.fontStyle = 'italic';

        jobHeader.appendChild(jobInfo);
        jobHeader.appendChild(jobDateEl);

        const jobDescription = document.createElement('div');
        const descriptionParts = [
          t('doing') || 'Currently working as a software developer',
          t('collaborated-platform') || 'Collaborated on platform development',
          t('enhanced-ui') || 'Enhanced user interface components',
          t('participated-development') || 'Participated in development processes'
        ];
        jobDescription.textContent = descriptionParts.join('. ') + '.';
        jobDescription.style.fontSize = '11pt';
        jobDescription.style.lineHeight = '1.4';
        jobDescription.style.textAlign = 'justify';
        jobDescription.style.marginTop = '4pt';

        jobEntry.appendChild(jobHeader);
        jobEntry.appendChild(jobDescription);
        experienceSection.appendChild(jobEntry);
      }

      // Projects Section - Extract from actual Projects.jsx component
      const projectsSection = document.createElement('div');
      projectsSection.style.marginBottom = '15pt';

      const projectsTitle = document.createElement('div');
      projectsTitle.textContent = t('projects') || 'Key Projects';
      projectsTitle.style.fontSize = '12pt';
      projectsTitle.style.fontWeight = 'bold';
      projectsTitle.style.color = '#000000';
      projectsTitle.style.marginBottom = '10pt';
      projectsTitle.style.textAlign = 'center';
      projectsTitle.style.fontStyle = 'italic';

      projectsSection.appendChild(projectsTitle);

      // Extract projects from actual Projects component
      const originalProjects = originalContainer.querySelector('.projects, [class*="project"]');
      if (originalProjects) {
        const projectElements = originalProjects.querySelectorAll('.project-header, h3');
        let projectCount = 0;
        
        Array.from(projectElements).slice(0, 4).forEach(projectEl => {
          if (projectCount >= 4) return; // Limit to 4 projects for space
          
          const projectEntry = document.createElement('div');
          projectEntry.style.marginBottom = '10pt';

          const projectHeader = document.createElement('div');
          projectHeader.style.display = 'flex';
          projectHeader.style.justifyContent = 'space-between';
          projectHeader.style.alignItems = 'baseline';
          projectHeader.style.marginBottom = '3pt';

          // Extract project title
          const titleElement = projectEl.querySelector('h3') || projectEl;
          const projectTitle = titleElement ? titleElement.textContent.trim() : '';
          
          if (!projectTitle || projectTitle.toLowerCase().includes('project')) return;

          const projectTitleEl = document.createElement('div');
          projectTitleEl.innerHTML = `<strong>${t(projectTitle) || projectTitle}</strong>`;
          projectTitleEl.style.fontSize = '11pt';

          // Extract tech badges
          const techBadges = projectEl.querySelectorAll('.tech-badge');
          const techStack = Array.from(techBadges).map(badge => badge.textContent.trim()).join(', ');
          
          const projectTech = document.createElement('div');
          projectTech.textContent = techStack;
          projectTech.style.fontSize = '9pt';
          projectTech.style.fontStyle = 'italic';
          projectTech.style.color = '#666666';

          projectHeader.appendChild(projectTitleEl);
          if (techStack) {
            projectHeader.appendChild(projectTech);
          }

          // Extract project description
          const projectContainer = projectEl.closest('div');
          const descElement = projectContainer ? projectContainer.querySelector('p') : null;
          const projectDesc = document.createElement('div');
          
          if (descElement) {
            const descKey = descElement.textContent.trim();
            projectDesc.textContent = t(descKey) || descKey;
          } else {
            projectDesc.textContent = t(`${projectTitle.toLowerCase().replace(/\s+/g, '-')}-desc`) || 'Project description not available.';
          }
          
          projectDesc.style.fontSize = '11pt';
          projectDesc.style.lineHeight = '1.4';
          projectDesc.style.textAlign = 'justify';

          projectEntry.appendChild(projectHeader);
          projectEntry.appendChild(projectDesc);
          projectsSection.appendChild(projectEntry);
          projectCount++;
        });
      } else {
        // Fallback using actual cvData projects with translation keys
        const realProjects = [
          { title: 'rai-platform', desc: 'rai-platform-desc', tech: 'Vue.js, Django' },
          { title: 'notification-system', desc: 'notification-system-desc', tech: 'Next.js, TypeScript, Prisma' },
          { title: 'sms-project', desc: 'sms-project-desc', tech: 'React, Express.js' },
          { title: 'docker-explorer', desc: 'docker-explorer-desc', tech: 'Remix.js' }
        ];

        realProjects.forEach(project => {
          const projectEntry = document.createElement('div');
          projectEntry.style.marginBottom = '10pt';

          const projectHeader = document.createElement('div');
          projectHeader.style.display = 'flex';
          projectHeader.style.justifyContent = 'space-between';
          projectHeader.style.alignItems = 'baseline';
          projectHeader.style.marginBottom = '3pt';

          const projectTitleEl = document.createElement('div');
          projectTitleEl.innerHTML = `<strong>${t(project.title) || project.title}</strong>`;
          projectTitleEl.style.fontSize = '11pt';

          const projectTech = document.createElement('div');
          projectTech.textContent = project.tech;
          projectTech.style.fontSize = '9pt';
          projectTech.style.fontStyle = 'italic';
          projectTech.style.color = '#666666';

          projectHeader.appendChild(projectTitleEl);
          projectHeader.appendChild(projectTech);

          const projectDesc = document.createElement('div');
          projectDesc.textContent = t(project.desc) || 'Project description not available.';
          projectDesc.style.fontSize = '11pt';
          projectDesc.style.lineHeight = '1.4';
          projectDesc.style.textAlign = 'justify';

          projectEntry.appendChild(projectHeader);
          projectEntry.appendChild(projectDesc);
          projectsSection.appendChild(projectEntry);
        });
      }

      // Education Section
      const educationSection = document.createElement('div');
      educationSection.style.marginBottom = '18pt';

      const educationTitle = document.createElement('div');
      educationTitle.textContent = t('education') || 'Education';
      educationTitle.style.fontSize = '12pt';
      educationTitle.style.fontWeight = 'bold';
      educationTitle.style.color = '#000000';
      educationTitle.style.marginBottom = '8pt';
      educationTitle.style.textAlign = 'center';
      educationTitle.style.fontStyle = 'italic';

      const educationContent = document.createElement('div');
      const originalEducation = originalContainer.querySelector('.education, [class*="education"]');
      if (originalEducation) {
        const educationText = originalEducation.textContent || originalEducation.innerText || '';
        educationContent.textContent = educationText.replace(/\s+/g, ' ').trim();
      } else {
        educationContent.textContent = 'Bachelor\'s Degree in Computer Science, University Name, Graduation Year (YYYY)';
      }
      educationContent.style.fontSize = '11pt';
      educationContent.style.lineHeight = '1.4';
      educationContent.style.color = '#000000';

      educationSection.appendChild(educationTitle);
      educationSection.appendChild(educationContent);

      // Additional Skills Section (Languages + Soft Skills)
      const additionalSection = document.createElement('div');
      additionalSection.style.marginBottom = '18pt';

      const additionalTitle = document.createElement('div');
      additionalTitle.textContent = 'Additional Qualifications';
      additionalTitle.style.fontSize = '12pt';
      additionalTitle.style.fontWeight = 'bold';
      additionalTitle.style.color = '#000000';
      additionalTitle.style.marginBottom = '8pt';
      additionalTitle.style.textAlign = 'center';
      additionalTitle.style.fontStyle = 'italic';

      const additionalContent = document.createElement('div');

      // Languages
      const originalLanguages = originalContainer.querySelector('.languages');
      let languagesText = '';
      if (originalLanguages) {
        const languageItems = originalLanguages.querySelectorAll('li, span');
        const languages = Array.from(languageItems).map(item => item.textContent.trim()).filter(text => text && text.length > 1);
        languagesText = languages.join(', ');
      }
      if (!languagesText) {
        languagesText = 'Arabic (Native), English (Fluent)';
      }

      // Soft Skills
      const originalSoftSkills = originalContainer.querySelector('.soft-skills');
      let softSkillsText = '';
      if (originalSoftSkills) {
        const softSkillItems = originalSoftSkills.querySelectorAll('li, span');
        const softSkills = Array.from(softSkillItems).map(item => item.textContent.trim()).filter(text => text && text.length > 1);
        softSkillsText = softSkills.slice(0, 6).join(', ');
      }
      if (!softSkillsText) {
        softSkillsText = 'Problem Solving, Team Collaboration, Communication, Leadership, Adaptability, Critical Thinking';
      }

      additionalContent.innerHTML = `
        <div style="margin-bottom: 8pt;"><strong>Languages:</strong> ${languagesText}</div>
        <div><strong>Core Competencies:</strong> ${softSkillsText}</div>
      `;
      additionalContent.style.fontSize = '11pt';
      additionalContent.style.lineHeight = '1.4';
      additionalContent.style.color = '#000000';

      additionalSection.appendChild(additionalTitle);
      additionalSection.appendChild(additionalContent);

      // Assemble the document
      cvDocument.appendChild(header);
      cvDocument.appendChild(summarySection);
      cvDocument.appendChild(skillsSection);
      cvDocument.appendChild(experienceSection);
      cvDocument.appendChild(projectsSection);
      cvDocument.appendChild(educationSection);
      cvDocument.appendChild(additionalSection);

      // Create temporary wrapper
      const tempWrapper = document.createElement('div');
      tempWrapper.style.position = 'absolute';
      tempWrapper.style.left = '-9999px';
      tempWrapper.style.top = '0';
      tempWrapper.appendChild(cvDocument);
      document.body.appendChild(tempWrapper);

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 300));

      // Configure html2pdf options
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `Taida_Alshahrani_CV_${i18n.language === 'ar' ? 'Arabic' : 'English'}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          width: 794,
          height: Math.max(cvDocument.scrollHeight + 50, 1123)
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        }
      };

      // Generate PDF
      await html2pdf().set(opt).from(cvDocument).save();

      // Clean up
      document.body.removeChild(tempWrapper);

      console.log('Classic professional CV generated successfully');

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert(t('pdf-error', 'Failed to generate PDF. Please try again.'));
    } finally {
      setIsGenerating(false);
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