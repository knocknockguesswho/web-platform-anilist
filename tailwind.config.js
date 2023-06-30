module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        black: '#1f1f1f',
        'soft-black': '#434343',
        white: '#FFFFFF',
        overlay: '#1f1f1f25',
        grey: '#CACACA',
        'dark-grey': '#595959',
        'red-error': '#F33030',
        transparent: 'transparent',
        'dark-blue': '#1E3273',
        blue: '#4488C1',
        neutral: '#2D2F4490',
        mild: '#C4C4C4',
        'dark-green': '#0B373C',
        'light-green': '#126064',
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      screens: {
        'small-phone': '360px',
        phone: '412px',
        tablet: '560px',
        'small-desktop': '768px',
        desktop: '1140px',
      },
      boxShadow: {
        card: '4px 2px 10px #00000050',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
