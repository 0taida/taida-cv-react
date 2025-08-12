# 📝 Taida CV - React Version

A modern, bilingual, and responsive CV web app built with **React**, **Vite**, **Tailwind CSS**, and **i18next**.  
Switch between **dark** and **light** themes, toggle between **English** and **Arabic** (full RTL), and print a pixel-perfect PDF via the browser’s print dialog.

---

## 🚀 Features

- **React-powered:** Modern React with hooks and component composition
- **Component Architecture:** Cleanly separated sections (Summary, Experience, Education, Projects, etc.)
- **Tailwind CSS + Custom CSS:** Utility-first styling plus `src/custom.css` for gradients, animations, RTL/mobile tweaks
- **i18next Integration:** Professional i18n with `react-i18next`, including Arabic RTL and print-specific short texts
- **Theme System:** Toggle dark/light themes with smooth transitions
- **Bilingual Support:** Instant English/Arabic switching with direction-aware styles
- **Responsive Design:** Mobile-first layout matching the original HTML reference across breakpoints
- **Native Print to PDF:** Print via hidden iframe + `window.print()` for reliable, accurate output (no html2pdf.js)
- **RTL-Perfect Printing:** Arabic page is centered with correct margins and spacing in PDFs

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
│   ├── ContactInfo.jsx           # Contact information
│   ├── Education.jsx             # Education section
│   ├── Experience.jsx            # Professional experience
│   ├── Interests.jsx             # Interests section
│   ├── Languages.jsx             # Language skills with progress bars
│   ├── PrintButton.jsx           # Native print-to-PDF via hidden iframe
│   ├── ProfessionalSummary.jsx   # Professional summary section
│   ├── ProfileImage.jsx          # Profile image
│   ├── Projects.jsx              # Key projects list
│   ├── SoftSkills.jsx            # Soft skills list
│   ├── TechnicalSkills.jsx       # Technical skills chips
│   └── ThemeToggle.jsx           # Theme and language toggle buttons
├── data/
│   └── cvData.js                 # Centralized CV data (contact, skills, projects, ...)
├── i18n/
│   └── index.js                  # i18next configuration and translations
├── App.jsx                       # Main application component
├── main.jsx                      # React entry point
├── index.css                     # Tailwind base and utilities
└── custom.css                    # Additional custom styles (animations, gradients, print)
```

---

## 🎨 Customization

### **Content Data (Recommended)**
Most content is centralized in `src/data/cvData.js`:
- **Contact:** email, phone, GitHub, location
- **Technical Skills:** frontend/backend/tools arrays
- **Soft Skills:** list of soft skills
- **Languages:** list with proficiency percentages
- **Projects:** titles, descriptions (i18n keys), tech badges

### **Translations**
Edit `src/i18n/index.js` for all translatable strings. For print, short descriptions are used when available:
- Project short keys: `*-desc-short` (e.g., `rai-platform-desc-short`)
- Section titles: `top-skills`, `additional-qualifications`, `core-competencies`, `frontend-development`, `backend-development`, `tools-development`

### **Styling**
- **Tailwind:** Utility classes live across components
- **Custom CSS:** `src/custom.css` for gradients, animations, RTL/mobile adjustments, and print styles
- **Tailwind config:** Adjust in `tailwind.config.js` as needed

### **Profile Images**
Replace `face.png` and `profile.webp` in the `public` folder

### **Printing to PDF**
Printing uses a hidden iframe and the browser’s native print dialog for best fidelity:
- Click the printer icon (`PrintButton`) in the UI
- The print view is language-aware (LTR/RTL) and uses short i18n descriptions for projects
- Arabic output is centered with proper margins

---

## 🌐 Internationalization

The app uses **i18next** with **react-i18next**:
- **Dynamic Switching:** Instant English/Arabic toggling with `dir` updates
- **RTL Support:** Full right-to-left layout and print handling
- **Print Strings:** Short keys (e.g., `*-desc-short`) for concise print content
- **Fallback Language:** English as fallback

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
- **HTML Parity:** Matches the reference HTML design on mobile and desktop
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