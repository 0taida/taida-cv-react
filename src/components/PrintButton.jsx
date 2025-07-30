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
      // Get the actual CV container
      const originalContainer = document.querySelector('.cv-body-gradient');
      
      if (!originalContainer) {
        console.error('CV container not found');
        setIsGenerating(false);
        return;
      }

      // Create a clone of the container for PDF generation
      const clonedContainer = originalContainer.cloneNode(true);
      
      // Create a temporary wrapper with print-optimized styles
      const tempWrapper = document.createElement('div');
      tempWrapper.style.position = 'absolute';
      tempWrapper.style.left = '-9999px';
      tempWrapper.style.top = '0';
      tempWrapper.style.width = '210mm';
      tempWrapper.style.minHeight = '297mm';
      tempWrapper.style.backgroundColor = '#ffffff';
      tempWrapper.style.fontFamily = 'Arial, sans-serif';
      tempWrapper.style.color = '#333333';
      tempWrapper.style.fontSize = '12px';
      tempWrapper.style.lineHeight = '1.4';
      tempWrapper.style.padding = '15mm';
      tempWrapper.style.boxSizing = 'border-box';
      
      // Apply print-friendly styles to the cloned container
      clonedContainer.style.background = '#ffffff';
      clonedContainer.style.color = '#333333';
      clonedContainer.style.display = 'block';
      clonedContainer.style.minHeight = 'auto';
      clonedContainer.style.flexWrap = 'nowrap';
      clonedContainer.style.opacity = '1';
      clonedContainer.style.animation = 'none';
      clonedContainer.style.transform = 'none';
      clonedContainer.style.maxWidth = '100%';
      clonedContainer.style.overflow = 'visible';
      
      // Handle RTL layout for Arabic
      if (i18n.language === 'ar') {
        clonedContainer.style.direction = 'rtl';
        clonedContainer.style.textAlign = 'right';
      } else {
        clonedContainer.style.direction = 'ltr';
        clonedContainer.style.textAlign = 'left';
      }

      // Remove interactive elements from the clone
      const interactiveElements = clonedContainer.querySelectorAll('.theme-language-toggles, .print-button');
      interactiveElements.forEach(el => el.remove());

      // Debug: Log what we found in the sidebar
      console.log('Sidebar sections found:', clonedContainer.querySelectorAll('.sidebar-section').length);
      console.log('Contact info found:', clonedContainer.querySelector('.contact-info') ? 'Yes' : 'No');
      console.log('Soft skills found:', clonedContainer.querySelector('.soft-skills') ? 'Yes' : 'No');
      console.log('Languages found:', clonedContainer.querySelector('.languages') ? 'Yes' : 'No');

      // Force all sidebar content to be visible by recreating it from scratch
      const sidebar = clonedContainer.querySelector('.sidebar');
      if (sidebar) {
        // Clear existing content and rebuild
        sidebar.innerHTML = '';
        
        // Add profile image
        const originalProfileImg = originalContainer.querySelector('.profile-img');
        if (originalProfileImg) {
          const profileImg = originalProfileImg.cloneNode(true);
          sidebar.appendChild(profileImg);
        }
        
        // Add contact info section with manual content creation
        const originalContactInfo = originalContainer.querySelector('.contact-info');
        if (originalContactInfo) {
          const contactSection = document.createElement('div');
          contactSection.className = 'sidebar-section';
          contactSection.style.background = '#f8f9fa';
          contactSection.style.border = '1px solid #dee2e6';
          contactSection.style.borderRadius = '6px';
          contactSection.style.padding = '15px';
          contactSection.style.marginBottom = '20px';
          contactSection.style.display = 'block !important';
          contactSection.style.visibility = 'visible';
          contactSection.style.opacity = '1';
          contactSection.style.height = 'auto';
          contactSection.style.overflow = 'visible';
          
          // Create contact info content manually
          const contactDiv = document.createElement('div');
          contactDiv.className = 'contact-info';
          contactDiv.style.display = 'block';
          contactDiv.style.color = '#333333';
          
          const contactHeader = document.createElement('h3');
          contactHeader.textContent = t('contact');
          contactHeader.style.color = '#007bff';
          contactHeader.style.fontSize = '14px';
          contactHeader.style.marginBottom = '10px';
          contactHeader.style.fontWeight = '600';
          contactHeader.style.borderBottom = '2px solid #007bff';
          contactHeader.style.paddingBottom = '4px';
          
          const contactList = document.createElement('ul');
          contactList.style.listStyle = 'none';
          contactList.style.padding = '0';
          contactList.style.margin = '0';
          contactList.style.lineHeight = '1.8';
          
          // Add contact items manually
          const contactItems = [
            { icon: 'fas fa-envelope', text: 'taida.dream@gmail.com', isLink: true, href: 'mailto:taida.dream@gmail.com' },
            { icon: 'fas fa-phone', text: '+967774126583', isLink: true, href: 'tel:+967774126583' },
            { icon: 'fab fa-github', text: 'Github', isLink: true, href: 'https://github.com/0taida' },
            { icon: 'fas fa-map-marker-alt', text: t('location'), isLink: false }
          ];
          
          contactItems.forEach(item => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.gap = '8px';
            li.style.marginBottom = '6px';
            li.style.fontSize = '11px';
            li.style.color = '#333333';
            
            const icon = document.createElement('i');
            icon.className = item.icon;
            icon.style.color = '#007bff';
            icon.style.minWidth = '16px';
            icon.style.textAlign = 'center';
            icon.style.fontSize = '11px';
            
            if (item.isLink) {
              const link = document.createElement('a');
              link.href = item.href;
              link.textContent = item.text;
              link.style.color = '#333333';
              link.style.textDecoration = 'none';
              li.appendChild(icon);
              li.appendChild(link);
            } else {
              const span = document.createElement('span');
              span.textContent = item.text;
              span.style.color = '#333333';
              li.appendChild(icon);
              li.appendChild(span);
            }
            
            contactList.appendChild(li);
          });
          
          contactDiv.appendChild(contactHeader);
          contactDiv.appendChild(contactList);
          contactSection.appendChild(contactDiv);
          sidebar.appendChild(contactSection);
        }
        
        // Add soft skills section with manual content creation
        const originalSoftSkills = originalContainer.querySelector('.soft-skills');
        if (originalSoftSkills) {
          const softSkillsSection = document.createElement('div');
          softSkillsSection.className = 'sidebar-section';
          softSkillsSection.style.background = '#f8f9fa';
          softSkillsSection.style.border = '1px solid #dee2e6';
          softSkillsSection.style.borderRadius = '6px';
          softSkillsSection.style.padding = '15px';
          softSkillsSection.style.marginBottom = '20px';
          softSkillsSection.style.display = 'block !important';
          softSkillsSection.style.visibility = 'visible';
          softSkillsSection.style.opacity = '1';
          softSkillsSection.style.height = 'auto';
          softSkillsSection.style.overflow = 'visible';
          
          // Create soft skills content manually
          const softSkillsDiv = document.createElement('div');
          softSkillsDiv.className = 'soft-skills';
          softSkillsDiv.style.display = 'block';
          softSkillsDiv.style.color = '#333333';
          
          const softSkillsHeader = document.createElement('h3');
          softSkillsHeader.textContent = t('soft-skills');
          softSkillsHeader.style.color = '#007bff';
          softSkillsHeader.style.fontSize = '14px';
          softSkillsHeader.style.marginBottom = '10px';
          softSkillsHeader.style.fontWeight = '600';
          softSkillsHeader.style.borderBottom = '2px solid #007bff';
          softSkillsHeader.style.paddingBottom = '4px';
          
          const softSkillsList = document.createElement('ul');
          softSkillsList.style.listStyle = 'none';
          softSkillsList.style.padding = '0';
          softSkillsList.style.margin = '0';
          softSkillsList.style.lineHeight = '1.6';
          
          // Add soft skills items manually
          const softSkillsItems = [
            'analytical-skills', 'teamwork', 'problem-solving', 'communication',
            'adaptability', 'time-management', 'leadership', 'creativity',
            'attention-to-detail', 'critical-thinking'
          ];
          
          softSkillsItems.forEach(skillKey => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.marginBottom = '4px';
            li.style.fontSize = '11px';
            li.style.color = '#333333';
            li.style.paddingLeft = '12px';
            li.style.position = 'relative';
            
            // Add bullet point
            const bullet = document.createElement('span');
            bullet.textContent = '•';
            bullet.style.position = 'absolute';
            bullet.style.left = '0';
            bullet.style.color = '#007bff';
            bullet.style.fontWeight = 'bold';
            
            const skillText = document.createElement('span');
            skillText.textContent = t(skillKey);
            skillText.style.color = '#333333';
            
            li.appendChild(bullet);
            li.appendChild(skillText);
            softSkillsList.appendChild(li);
          });
          
          softSkillsDiv.appendChild(softSkillsHeader);
          softSkillsDiv.appendChild(softSkillsList);
          softSkillsSection.appendChild(softSkillsDiv);
          sidebar.appendChild(softSkillsSection);
        }
        
        // Add languages section
        const originalLanguages = originalContainer.querySelector('.languages');
        if (originalLanguages) {
          const languagesSection = document.createElement('div');
          languagesSection.className = 'sidebar-section';
          languagesSection.style.background = '#f8f9fa';
          languagesSection.style.border = '1px solid #dee2e6';
          languagesSection.style.borderRadius = '6px';
          languagesSection.style.padding = '15px';
          languagesSection.style.marginBottom = '20px';
          languagesSection.style.display = 'block';
          languagesSection.style.visibility = 'visible';
          languagesSection.style.opacity = '1';
          
          const languages = originalLanguages.cloneNode(true);
          // Force dark text color for languages
          languages.style.color = '#333333';
          languagesSection.appendChild(languages);
          sidebar.appendChild(languagesSection);
        }

        // Apply print styles to sidebar
        sidebar.style.width = '100%';
        sidebar.style.maxWidth = '280px';
        sidebar.style.float = i18n.language === 'ar' ? 'right' : 'left';
        sidebar.style.marginRight = i18n.language === 'ar' ? '0' : '20px';
        sidebar.style.marginLeft = i18n.language === 'ar' ? '20px' : '0';
        sidebar.style.marginBottom = '20px';
        sidebar.style.transform = 'none';
        sidebar.style.animation = 'none';
        sidebar.style.boxShadow = 'none';
        sidebar.style.borderRadius = '8px';
        sidebar.style.padding = '15px';
        sidebar.style.background = '#f8f9fa';
        sidebar.style.border = '1px solid #dee2e6';
        sidebar.style.display = 'block';
        sidebar.style.visibility = 'visible';
        sidebar.style.opacity = '1';
      }

      // Apply print styles to main content
      const mainContent = clonedContainer.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.overflow = 'hidden';
        mainContent.style.padding = '15px';
        mainContent.style.marginTop = '0';
        mainContent.style.background = '#ffffff';
      }

      // Apply print styles to all sections
      const sections = clonedContainer.querySelectorAll('.section, .sidebar-section');
      sections.forEach(section => {
        section.style.background = '#ffffff';
        section.style.border = '1px solid #dee2e6';
        section.style.boxShadow = 'none';
        section.style.borderRadius = '6px';
        section.style.marginBottom = '15px';
        section.style.padding = '12px';
        section.style.opacity = '1';
        section.style.transform = 'none';
        section.style.animation = 'none';
        section.style.pageBreakInside = 'avoid';
      });

      // Apply print styles to sidebar sections
      const sidebarSections = clonedContainer.querySelectorAll('.sidebar-section');
      sidebarSections.forEach(section => {
        section.style.background = '#f8f9fa';
        section.style.border = '1px solid #dee2e6';
        section.style.borderRadius = '6px';
        section.style.padding = '15px';
        section.style.marginBottom = '20px';
        section.style.display = 'block !important';
        section.style.width = '100%';
        section.style.boxSizing = 'border-box';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
        section.style.height = 'auto';
        section.style.overflow = 'visible';
      });

      // Apply print styles to section titles
      const sectionTitles = clonedContainer.querySelectorAll('.section-title');
      sectionTitles.forEach(title => {
        title.style.color = '#007bff';
        title.style.background = 'none';
        title.style.webkitBackgroundClip = 'initial';
        title.style.webkitTextFillColor = 'initial';
        title.style.fontSize = '16px';
        title.style.marginBottom = '12px';
        title.style.fontWeight = '600';
        title.style.borderBottom = '2px solid #007bff';
        title.style.paddingBottom = '5px';
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.gap = '8px';
      });

      // Apply print styles to profile image
      const profileImg = clonedContainer.querySelector('.profile-img');
      if (profileImg) {
        profileImg.style.width = '120px';
        profileImg.style.height = '120px';
        profileImg.style.margin = '15px auto 20px auto';
        profileImg.style.border = '3px solid #007bff';
        profileImg.style.boxShadow = 'none';
        profileImg.style.display = 'block';
        profileImg.style.borderRadius = '50%';
        profileImg.style.objectFit = 'cover';
      }

      // Apply print styles to contact info, soft skills, and languages headers
      const headers = clonedContainer.querySelectorAll('.contact-info h3, .soft-skills h3, .languages h3');
      headers.forEach(header => {
        header.style.color = '#007bff';
        header.style.fontSize = '14px';
        header.style.marginBottom = '10px';
        header.style.fontWeight = '600';
        header.style.borderBottom = '2px solid #007bff';
        header.style.paddingBottom = '4px';
        header.style.display = 'block';
      });

      // Apply print styles to contact info container
      const contactInfo = clonedContainer.querySelector('.contact-info');
      if (contactInfo) {
        contactInfo.style.display = 'block !important';
        contactInfo.style.width = '100%';
        contactInfo.style.marginBottom = '15px';
        contactInfo.style.visibility = 'visible';
        contactInfo.style.opacity = '1';
        contactInfo.style.height = 'auto';
        contactInfo.style.overflow = 'visible';
      }

      // Apply print styles to contact info list
      const contactList = clonedContainer.querySelector('.contact-info ul');
      if (contactList) {
        contactList.style.listStyle = 'none';
        contactList.style.padding = '0';
        contactList.style.margin = '0';
        contactList.style.lineHeight = '1.8';
      }

      // Apply print styles to contact info items
      const contactItems = clonedContainer.querySelectorAll('.contact-info ul li');
      contactItems.forEach(item => {
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '8px';
        item.style.marginBottom = '6px';
        item.style.fontSize = '11px';
        item.style.color = '#333333';
      });

      // Apply print styles to contact info icons
      const contactIcons = clonedContainer.querySelectorAll('.contact-info ul li i');
      contactIcons.forEach(icon => {
        icon.style.color = '#007bff';
        icon.style.minWidth = '16px';
        icon.style.textAlign = 'center';
        icon.style.fontSize = '11px';
      });

      // Apply print styles to contact info links
      const contactLinks = clonedContainer.querySelectorAll('.contact-info ul li a');
      contactLinks.forEach(link => {
        link.style.color = '#333333';
        link.style.textDecoration = 'none';
      });

      // Apply print styles to soft skills container
      const softSkills = clonedContainer.querySelector('.soft-skills');
      if (softSkills) {
        softSkills.style.display = 'block !important';
        softSkills.style.width = '100%';
        softSkills.style.marginBottom = '15px';
        softSkills.style.visibility = 'visible';
        softSkills.style.opacity = '1';
        softSkills.style.height = 'auto';
        softSkills.style.overflow = 'visible';
      }

      // Apply print styles to soft skills list
      const softSkillsList = clonedContainer.querySelector('.soft-skills ul');
      if (softSkillsList) {
        softSkillsList.style.listStyle = 'none';
        softSkillsList.style.padding = '0';
        softSkillsList.style.margin = '0';
        softSkillsList.style.lineHeight = '1.6';
      }

      // Apply print styles to soft skills items
      const softSkillsItems = clonedContainer.querySelectorAll('.soft-skills ul li');
      softSkillsItems.forEach(item => {
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.marginBottom = '4px';
        item.style.fontSize = '11px';
        item.style.color = '#333333';
        item.style.paddingLeft = '12px';
        item.style.position = 'relative';
      });

      // Apply print styles to languages container
      const languages = clonedContainer.querySelector('.languages');
      if (languages) {
        languages.style.display = 'block';
        languages.style.width = '100%';
        languages.style.marginBottom = '15px';
      }

      // Apply print styles to languages list
      const languagesList = clonedContainer.querySelector('.languages ul');
      if (languagesList) {
        languagesList.style.listStyle = 'none';
        languagesList.style.padding = '0';
        languagesList.style.margin = '0';
        languagesList.style.width = '100%';
      }

      // Apply print styles to language items
      const languageItems = clonedContainer.querySelectorAll('.languages ul li');
      languageItems.forEach(item => {
        item.style.marginBottom = '12px';
        item.style.width = '100%';
        item.style.display = 'block';
      });

      // Apply print styles to language names
      const languageNames = clonedContainer.querySelectorAll('.languages ul li span');
      languageNames.forEach(name => {
        name.style.color = '#333333';
        name.style.fontSize = '11px';
        name.style.fontWeight = '500';
        name.style.display = 'block';
        name.style.marginBottom = '4px';
      });

      // Apply print styles to text elements
      const textElements = clonedContainer.querySelectorAll('p, li:not(.contact-info li):not(.soft-skills li):not(.languages li), span:not(.skill-chip):not(.tech-badge):not(.contact-info span):not(.languages span)');
      textElements.forEach(el => {
        el.style.color = '#333333';
        el.style.fontSize = '11px';
        el.style.lineHeight = '1.5';
        el.style.marginBottom = '8px';
      });

      // Apply print styles to skills container
      const skillsContainer = clonedContainer.querySelector('.skills-container');
      if (skillsContainer) {
        skillsContainer.style.display = 'block';
        skillsContainer.style.width = '100%';
      }

      // Apply print styles to skill chips
      const skillChips = clonedContainer.querySelectorAll('.skill-chip');
      skillChips.forEach(chip => {
        chip.style.background = '#e9ecef';
        chip.style.color = '#495057';
        chip.style.border = '1px solid #dee2e6';
        chip.style.opacity = '1';
        chip.style.animation = 'none';
        chip.style.fontSize = '10px';
        chip.style.padding = '2px 6px'; // Reduced padding
        chip.style.margin = '2px 4px 2px 0'; // Better margins
        chip.style.display = 'inline-flex'; // Better centering
        chip.style.alignItems = 'center'; // Center content vertically
        chip.style.justifyContent = 'center'; // Center content horizontally
        chip.style.borderRadius = '12px';
        chip.style.whiteSpace = 'nowrap';
        chip.style.textAlign = 'center';
        chip.style.lineHeight = '1.2';
      });

      // Apply print styles to skill chip containers
      const skillChipContainers = clonedContainer.querySelectorAll('.section ul[style*="flex"], .skills-container ul');
      skillChipContainers.forEach(container => {
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '6px';
        container.style.listStyle = 'none';
        container.style.padding = '0';
        container.style.margin = '8px 0';
        container.style.alignItems = 'flex-start';
        container.style.justifyContent = 'flex-start';
      });

      // Apply print styles to tech badges
      const techBadges = clonedContainer.querySelectorAll('.tech-badge');
      techBadges.forEach(badge => {
        badge.style.background = '#e3f2fd';
        badge.style.color = '#1976d2';
        badge.style.border = '1px solid #bbdefb';
        badge.style.fontSize = '9px';
        badge.style.padding = '2px 5px'; // Reduced padding
        badge.style.margin = '2px 3px 2px 0'; // Better margins
        badge.style.display = 'inline-flex'; // Better centering
        badge.style.alignItems = 'center'; // Center content vertically
        badge.style.justifyContent = 'center'; // Center content horizontally
        badge.style.borderRadius = '10px';
        badge.style.whiteSpace = 'nowrap';
        badge.style.textAlign = 'center';
        badge.style.lineHeight = '1.2';
      });

      // Apply print styles to language progress bars
      const languageBars = clonedContainer.querySelectorAll('.language-progress-bar');
      languageBars.forEach(bar => {
        bar.style.background = '#e9ecef';
        bar.style.border = '1px solid #dee2e6';
        bar.style.opacity = '1';
        bar.style.animation = 'none';
        bar.style.height = '8px';
      });

      const languageFills = clonedContainer.querySelectorAll('.language-progress-fill');
      languageFills.forEach(fill => {
        fill.style.background = '#007bff';
        fill.style.boxShadow = 'none';
      });

      // Apply print styles to soft skills bullets
      const softSkillsBullets = clonedContainer.querySelectorAll('.soft-skills-bullet');
      softSkillsBullets.forEach(bullet => {
        bullet.style.color = '#333333';
        const beforeElement = bullet.querySelector('::before');
        if (beforeElement) {
          beforeElement.style.background = '#007bff';
          beforeElement.style.boxShadow = 'none';
        }
      });

      // Force all sidebar text elements to be dark colored
      const allSidebarText = clonedContainer.querySelectorAll('.sidebar *, .sidebar-section *, .contact-info *, .soft-skills *, .languages *');
      allSidebarText.forEach(el => {
        if (el.tagName !== 'I' && !el.classList.contains('skill-chip') && !el.classList.contains('tech-badge')) {
          el.style.color = '#333333';
        }
      });

      // Ensure sidebar headers remain blue
      const sidebarHeaders = clonedContainer.querySelectorAll('.sidebar h3, .sidebar-section h3');
      sidebarHeaders.forEach(header => {
        header.style.color = '#007bff';
      });

      // Apply print styles to project headers
      const projectHeaders = clonedContainer.querySelectorAll('.project-header');
      projectHeaders.forEach(header => {
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.gap = '10px';
        header.style.marginBottom = '10px';
        header.style.flexWrap = 'wrap';
      });

      // Apply print styles to project titles
      const projectTitles = clonedContainer.querySelectorAll('.project-header h3');
      projectTitles.forEach(title => {
        title.style.color = '#007bff';
        title.style.fontSize = '13px';
        title.style.fontWeight = '600';
        title.style.margin = '0';
      });

      // Apply print styles to experience sections
      const experienceItems = clonedContainer.querySelectorAll('.section h3:not(.project-header h3)');
      experienceItems.forEach(item => {
        item.style.color = '#007bff';
        item.style.fontSize = '13px';
        item.style.fontWeight = '600';
        item.style.marginBottom = '5px';
        item.style.marginTop = '10px';
      });

      // Apply print styles to experience dates
      const experienceDates = clonedContainer.querySelectorAll('.experience-date');
      experienceDates.forEach(date => {
        date.style.color = '#666666';
        date.style.fontSize = '10px';
        date.style.marginBottom = '6px';
        date.style.display = 'block';
      });

      // Apply print styles to lists in main content
      const mainContentLists = clonedContainer.querySelectorAll('.main-content ul:not(.contact-info ul):not(.soft-skills ul):not(.languages ul)');
      mainContentLists.forEach(list => {
        list.style.listStyle = 'none';
        list.style.padding = '0';
        list.style.margin = '8px 0';
      });

      // Apply print styles to list items in main content
      const mainContentListItems = clonedContainer.querySelectorAll('.main-content ul li:not(.contact-info li):not(.soft-skills li):not(.languages li)');
      mainContentListItems.forEach(item => {
        item.style.marginBottom = '4px';
        item.style.paddingLeft = '12px';
        item.style.position = 'relative';
        item.style.fontSize = '11px';
        item.style.lineHeight = '1.4';
        item.style.color = '#333333';
      });

      // Apply print styles to project dividers
      const projectDividers = clonedContainer.querySelectorAll('.project-divider');
      projectDividers.forEach(divider => {
        divider.style.background = '#dee2e6';
        divider.style.margin = '15px 0';
        divider.style.height = '1px';
        divider.style.border = 'none';
      });

      // Apply print styles to main content paragraphs
      const mainContentParagraphs = clonedContainer.querySelectorAll('.main-content p');
      mainContentParagraphs.forEach(p => {
        p.style.color = '#333333';
        p.style.fontSize = '11px';
        p.style.lineHeight = '1.5';
        p.style.marginBottom = '10px';
        p.style.textAlign = i18n.language === 'ar' ? 'right' : 'left';
      });

      // Apply print styles to section icons
      const sectionIcons = clonedContainer.querySelectorAll('.section-title i');
      sectionIcons.forEach(icon => {
        icon.style.fontSize = '14px';
        icon.style.color = '#007bff';
        icon.style.marginRight = i18n.language === 'ar' ? '0' : '6px';
        icon.style.marginLeft = i18n.language === 'ar' ? '6px' : '0';
      });

      // Fix RTL alignment for Arabic
      if (i18n.language === 'ar') {
        // RTL adjustments for contact info
        const rtlContactItems = clonedContainer.querySelectorAll('.contact-info ul li');
        rtlContactItems.forEach(item => {
          item.style.flexDirection = 'row-reverse';
          item.style.textAlign = 'right';
          item.style.justifyContent = 'flex-start';
        });

        // RTL adjustments for soft skills
        const rtlSoftSkills = clonedContainer.querySelectorAll('.soft-skills ul li');
        rtlSoftSkills.forEach(item => {
          item.style.paddingLeft = '0';
          item.style.paddingRight = '12px';
          item.style.textAlign = 'right';
        });

        // RTL adjustments for project headers
        const rtlProjectHeaders = clonedContainer.querySelectorAll('.project-header');
        rtlProjectHeaders.forEach(header => {
          header.style.flexDirection = 'row-reverse';
          header.style.justifyContent = 'flex-start';
        });
      }

      // Remove all animations and transitions
      const allElements = clonedContainer.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.transform = 'none';
      });

      // Add the cloned container to the temporary wrapper
      tempWrapper.appendChild(clonedContainer);
      document.body.appendChild(tempWrapper);

      // Wait for images to load and styles to apply
      const images = tempWrapper.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        });
      }));

      await new Promise(resolve => setTimeout(resolve, 300));

      // Configure html2pdf options for the styled clone
      const opt = {
        margin: [8, 8, 8, 8],
        filename: `Taida_CV_${i18n.language === 'ar' ? 'Arabic' : 'English'}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.95 
        },
        html2canvas: { 
          scale: 1.2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          width: 794, // A4 width
          height: Math.max(tempWrapper.scrollHeight + 100, 1123)
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };

      // Generate PDF from the styled clone
      await html2pdf().set(opt).from(clonedContainer).save();
      
      // Clean up
      document.body.removeChild(tempWrapper);
      
      console.log('PDF generated successfully with proper styling');
      
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