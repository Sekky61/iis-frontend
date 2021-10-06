module.exports = {
  mode: 'jit',
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#D11D27',
          secondary: '#E53C38',
        },
        bgcolor: '#FBEBD8',
        bgcolor2: '#FFFAEF'
      }
    },
    transitionProperty: {
      'visibility': 'visibility',
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
