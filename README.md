# 📝 Taida CV - React Version

A modern, bilingual, and responsive CV web app built with **React**, **Vite**, **Tailwind CSS**, and **i18next**.  
Switch between **dark** and **light** themes, and toggle between **English** and **Arabic** with a single click!

---

## 🚀 Features

- **React-powered:** Built with modern React hooks and components
- **Component Architecture:** Modular, reusable components for easy maintenance
- **Tailwind CSS:** Utility-first CSS framework for rapid styling
- **i18next Integration:** Professional internationalization with react-i18next
- **Theme System:** Toggle between dark and light themes with smooth transitions
- **Bilingual Support:** Instantly switch between English and Arabic with full RTL support
- **Responsive Design:** Mobile-first approach that looks great on all devices
- **Smooth Animations:** Custom Tailwind animations for better user experience
- **Interactive Elements:** Hover effects and transitions throughout

---

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18next
- **PostCSS** - CSS processing
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactInfo.jsx      # Contact information component
│   ├── Languages.jsx        # Language skills with progress bars
│   ├── ProfessionalSummary.jsx # Professional summary section
│   ├── ProfileImage.jsx     # Profile image component
│   ├── SoftSkills.jsx       # Soft skills list
│   ├── TechnicalSkills.jsx  # Technical skills chips
│   └── ThemeToggle.jsx      # Theme and language toggle buttons
├── i18n/
│   └── index.js            # i18next configuration and translations
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Tailwind CSS and custom styles
```

---

## 🎨 Customization

### **Personal Information**
Update contact details, skills, and experience in the respective components:
- `ContactInfo.jsx` - Email, phone, GitHub, location
- `TechnicalSkills.jsx` - Technical skills array
- `SoftSkills.jsx` - Soft skills list
- `Languages.jsx` - Language proficiency levels

### **Translations**
Add or modify translations in `src/i18n/index.js`:
```javascript
const resources = {
  en: { translation: { /* English translations */ } },
  ar: { translation: { /* Arabic translations */ } }
}
```

### **Styling**
- **Colors:** Modify Tailwind config in `tailwind.config.js`
- **Animations:** Custom animations defined in `src/index.css`
- **Components:** Each component uses Tailwind classes for styling

### **Profile Images**
Replace `face.png` and `profile.webp` in the `public` folder

---

## 🌐 Internationalization

The app uses **i18next** for professional internationalization:
- **Language Detection:** Automatic language detection
- **Namespace Support:** Organized translations
- **RTL Support:** Full right-to-left layout for Arabic
- **Fallback Language:** English as fallback
- **Dynamic Language Switching:** Instant language changes

---

## 🎨 Theme System

- **Dark Theme:** Modern gradient backgrounds with blue accents
- **Light Theme:** Clean white backgrounds with subtle shadows
- **Smooth Transitions:** All theme changes are animated
- **Consistent Colors:** Tailwind's dark mode utilities ensure consistency

---

## 📱 Responsive Design

- **Mobile-First:** Designed for mobile devices first
- **Breakpoint System:** Uses Tailwind's responsive utilities
- **Flexible Layout:** Sidebar collapses on mobile
- **Touch-Friendly:** Optimized for touch interactions

---

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `vite.config.js` - Vite build configuration
- `package.json` - Dependencies and scripts

---

## 📄 License

MIT License

---

> Built with ❤️ using React, Tailwind CSS, and i18next by [@0taida](https://github.com/0taida)