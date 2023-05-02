/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'slate': { 
        ...colors.slate,
        900: '#030E21',
        800: '#091936',
      }
    }
  },
  plugins: [],
}
