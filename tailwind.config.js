module.exports = {
  purge: { content: ['./public/*.html', './src/**/*.{js,vue}', './src/*.{js,vue}'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theorange: '#f95335',
        theyellow: '#fcaf38',
        bgbox: '#FBEBD8',
        bggradstart: '#50a3a4',
        bggradmid: '#8ec1c1',
        bggradend: '#50a3a4',
      },
      
      minHeight: {
        '1/4': '25%',
        '400': '400px'
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        '100': '50rem',
      }
    },
    transitionProperty: {
      'visibility': 'visibility',
    }
  },
  variants: {
    extend: {
      ringWidth: [
        "hover",
      ],
      backgroundColor: ['active', 'checked'],
    },
  },
  plugins: [],
}
