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
      // Create a simplified version of the CV for PDF generation
      const createSimplifiedCV = () => {
        // Get current data from the DOM
        const profileImg = document.querySelector('.profile-img');
        const contactItems = document.querySelectorAll('.contact-info ul li');
        const softSkills = document.querySelectorAll('.soft-skills ul li');
        const languageItems = document.querySelectorAll('.languages ul li');
        const sections = document.querySelectorAll('.main-content .section');
        
        // Extract text content safely
        const getTextContent = (element) => element ? element.textContent.trim() : '';
        const getInnerHTML = (element) => element ? element.innerHTML : '';
        
        // Create a simple HTML structure
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white; color: #333;">
            <div style="display: flex; gap: 30px;">
              <!-- Sidebar -->
              <div style="width: 250px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <!-- Profile Image -->
                <div style="text-align: center; margin-bottom: 20px;">
                  ${profileImg ? `<img src="${profileImg.src}" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid #007bff; object-fit: cover;" />` : ''}
                </div>
                
                <!-- Contact -->
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #007bff; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${t('contact')}</h3>
                  <div style="font-size: 12px; line-height: 1.6;">
                    ${Array.from(contactItems).map(item => `<div style="margin-bottom: 8px;">${item.textContent}</div>`).join('')}
                  </div>
                </div>
                
                <!-- Soft Skills -->
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #007bff; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${t('soft-skills')}</h3>
                  <div style="font-size: 12px; line-height: 1.6;">
                    ${Array.from(softSkills).map(skill => `<div style="margin-bottom: 5px;">• ${skill.textContent}</div>`).join('')}
                  </div>
                </div>
                
                <!-- Languages -->
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #007bff; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${t('languages')}</h3>
                  <div style="font-size: 12px;">
                    ${Array.from(languageItems).map(item => {
                      const langName = item.querySelector('span')?.textContent || '';
                      const progressBar = item.querySelector('.language-progress-fill');
                      const percentage = progressBar ? progressBar.style.width : '0%';
                      return `
                        <div style="margin-bottom: 10px;">
                          <div style="margin-bottom: 3px;">${langName}</div>
                          <div style="background: #e9ecef; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="background: #007bff; height: 100%; width: ${percentage}; border-radius: 4px;"></div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
              
              <!-- Main Content -->
              <div style="flex: 1;">
                ${Array.from(sections).map(section => {
                  const title = section.querySelector('.section-title span')?.textContent || '';
                  
                  // Handle different section types
                  let content = '';
                  
                  // Professional Summary and Interests - just get the paragraph text
                  const paragraph = section.querySelector('p');
                  if (paragraph && (title.includes('Summary') || title.includes('Interests') || title.includes('الملخص') || title.includes('الاهتمامات'))) {
                    content = `<p style="margin-bottom: 10px;">${paragraph.textContent}</p>`;
                  }
                  
                  // Experience and Education - handle structured content
                  else if (title.includes('Experience') || title.includes('Education') || title.includes('الخبرة') || title.includes('التعليم')) {
                    const h3Elements = section.querySelectorAll('h3');
                    const paragraphs = section.querySelectorAll('p');
                    const lists = section.querySelectorAll('ul');
                    
                    content = Array.from(h3Elements).map((h3, index) => {
                      let itemContent = `<h3 style="color: #007bff; font-size: 14px; margin: 10px 0 5px 0;">${h3.textContent}</h3>`;
                      
                      // Add corresponding paragraph and list if they exist
                      if (paragraphs[index]) {
                        itemContent += `<p style="margin: 5px 0; font-size: 12px; color: #666;">${paragraphs[index].textContent}</p>`;
                      }
                      
                      if (lists[index]) {
                        const listItems = Array.from(lists[index].querySelectorAll('li'));
                        itemContent += '<ul style="margin: 5px 0; padding-left: 15px;">';
                        listItems.forEach(li => {
                          itemContent += `<li style="margin-bottom: 3px; font-size: 12px;">${li.textContent}</li>`;
                        });
                        itemContent += '</ul>';
                      }
                      
                      return itemContent;
                    }).join('');
                  }
                  
                  // Technical Skills - handle skill chips
                  else if (title.includes('Skills') || title.includes('Tools') || title.includes('المهارات') || title.includes('الأدوات')) {
                    const skillChips = section.querySelectorAll('.skill-chip');
                    if (skillChips.length > 0) {
                      content = '<div style="display: flex; flex-wrap: wrap; gap: 5px;">';
                      Array.from(skillChips).forEach(chip => {
                        content += `<span style="background: #e9ecef; color: #495057; padding: 3px 8px; border-radius: 12px; font-size: 11px; border: 1px solid #dee2e6; margin: 2px;">${chip.textContent}</span>`;
                      });
                      content += '</div>';
                    }
                  }
                  
                  // Projects - handle project structure
                  else if (title.includes('Projects') || title.includes('المشاريع')) {
                    const projectHeaders = section.querySelectorAll('.project-header');
                    const projectDescriptions = section.querySelectorAll('p');
                    
                    content = Array.from(projectHeaders).map((header, index) => {
                      const projectTitle = header.querySelector('h3')?.textContent || '';
                      const techBadges = Array.from(header.querySelectorAll('.tech-badge'));
                      const description = projectDescriptions[index]?.textContent || '';
                      
                      let projectContent = `<div style="margin-bottom: 20px;">`;
                      projectContent += `<h3 style="color: #007bff; font-size: 14px; margin-bottom: 8px;">${projectTitle}</h3>`;
                      
                      if (techBadges.length > 0) {
                        projectContent += '<div style="margin-bottom: 8px;">';
                        techBadges.forEach(badge => {
                          projectContent += `<span style="background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 10px; font-size: 10px; margin-right: 5px; border: 1px solid #bbdefb;">${badge.textContent}</span>`;
                        });
                        projectContent += '</div>';
                      }
                      
                      if (description) {
                        projectContent += `<p style="font-size: 12px; line-height: 1.4; color: #555; margin-bottom: 10px;">${description}</p>`;
                      }
                      
                      projectContent += '</div>';
                      
                      if (index < projectHeaders.length - 1) {
                        projectContent += '<hr style="border: none; border-top: 1px solid #dee2e6; margin: 15px 0;">';
                      }
                      
                      return projectContent;
                    }).join('');
                  }
                  
                  // Fallback for any other content
                  else {
                    const textContent = section.textContent.replace(title, '').trim();
                    content = `<p style="font-size: 12px; line-height: 1.4;">${textContent}</p>`;
                  }
                  
                  return `
                    <div style="margin-bottom: 25px; page-break-inside: avoid;">
                      <h2 style="color: #007bff; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${title}</h2>
                      <div>${content}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
        
        return html;
      };

      // Create temporary element with simplified content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = createSimplifiedCV();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.background = 'white';
      document.body.appendChild(tempDiv);

      // Configure html2pdf options
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `Taida_CV_${i18n.language === 'ar' ? 'Arabic' : 'English'}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.92 
        },
        html2canvas: { 
          scale: 1.2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          letterRendering: true,
          width: 800,
          height: 1000
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        }
      };

      // Generate PDF
      await html2pdf().set(opt).from(tempDiv.firstElementChild).save();
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      console.log('PDF generated successfully');
      
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