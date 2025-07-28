import { useTranslation } from 'react-i18next';

const ContactInfo = ({ contactData }) => {
  const { t } = useTranslation();

  // Default contact data if not provided
  const defaultContactData = {
    email: 'taida.dream@gmail.com',
    phone: '+967774126583',
    github: 'https://github.com/0taida',
    location: 'location'
  };

  const data = contactData || defaultContactData;

  return (
    <div className="sidebar-section">
      <div className="contact-info">
        <h3 className="animate-fade-in-up-custom">
          {t('contact')}
        </h3>
        <ul>
          <li className="animate-fade-in-delayed">
            <i className="fas fa-envelope"></i>
            <a 
              href={`mailto:${data.email}`}
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              {data.email}
            </a>
          </li>
          <li className="animate-fade-in-delayed">
            <i className="fas fa-phone"></i>
            <a 
              href={`tel:${data.phone}`}
              dir="ltr" 
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              {data.phone}
            </a>
          </li>
          <li className="animate-fade-in-delayed">
            <i className="fab fa-github"></i>
            <a 
              href={data.github}
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#00aaff', textDecoration: 'none' }}
            >
              Github
            </a>
          </li>
          <li className="animate-fade-in-delayed">
            <i className="fas fa-map-marker-alt"></i>
            <span>{t(data.location)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;