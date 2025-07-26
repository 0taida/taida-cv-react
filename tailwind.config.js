/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.5s ease 0.4s forwards',
        'slide-in-sidebar': 'slideInSidebar 0.5s ease 0.2s forwards',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'to': { opacity: '1' }
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInSidebar: {
          'to': { transform: 'translateX(0)' }
        },
        subtlePulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            boxShadow: '0 6px 15px rgba(0, 170, 255, 0.2)'
          }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}