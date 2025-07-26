import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 p-6 rounded-lg sidebar-section-gradient border border-white/10 transition-all duration-500 last:mb-0">
      <div className="contact-info">
        <h3 className="text-xl mb-4 text-[#00aaff] animate-fade-in-up-custom">
          {t('contact')}
        </h3>
        <ul className="list-none leading-8">
          <li className="text-sm text-[#94a3b8] flex items-center gap-2 animate-fade-in-delayed contact-info-item">
            <i className="fas fa-envelope text-[#00aaff] min-w-5 text-center contact-info-icon"></i>
            <a 
              href="mailto:taida.dream@gmail.com" 
              className="text-[#00aaff] no-underline hover:text-white transition-colors duration-300"
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              taida.dream@gmail.com
            </a>
          </li>
          <li className="text-sm text-[#94a3b8] flex items-center gap-2 animate-fade-in-delayed contact-info-item">
            <i className="fas fa-phone text-[#00aaff] min-w-5 text-center contact-info-icon"></i>
            <a 
              href="tel:+967774126583" 
              dir="ltr" 
              className="text-[#00aaff] no-underline hover:text-white transition-colors duration-300"
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              +967774126583
            </a>
          </li>
          <li className="text-sm text-[#94a3b8] flex items-center gap-2 animate-fade-in-delayed contact-info-item">
            <i className="fab fa-github text-[#00aaff] min-w-5 text-center contact-info-icon"></i>
            <a 
              href="https://github.com/0taida" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#00aaff] no-underline hover:text-white transition-colors duration-300"
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              Github
            </a>
          </li>
          <li className="text-sm text-[#94a3b8] flex items-center gap-2 animate-fade-in-delayed contact-info-item">
            <i className="fas fa-map-marker-alt text-[#00aaff] min-w-5 text-center contact-info-icon"></i>
            <span>{t('location')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;