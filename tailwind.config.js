module.exports = {
  purge: { content: ['./public/*.html', './src/**/*.{js,vue}', './src/*.{js,vue}'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        theorange: '#f95335',
        theyellow: '#fcaf38',
        bgbox: '#FBEBD8',
        bggradstart: '#50a3a4',
        bggradmid: '#8ec1c1',
        bggradend: '#50a3a4',
        greennotif: '#32c682',
        yellownotif: '#eebf31',
        rednotif: '#ff5549'
      },

      flex: {
        '2': '2 2 0%',
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
        '97': '35rem',
        '88': '22rem',
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
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
