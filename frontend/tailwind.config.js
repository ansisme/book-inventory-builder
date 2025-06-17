/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          500: '#624CF5',
          50: ' #F6F8FD',
          // DEFAULT: '#624CF5',
          // foreground: 'hsl(var(--primary-foreground))',
        },
         grey: {
          600: '#545454',
          500: '#757575',
          400: '#AFAFAF',
          50: '#F6F6F6',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
       backgroundImage: {
        'dotted-pattern': "url('./assets/images/dotted-pattern.png')",
      },
    },
  },
  plugins: [],
}
