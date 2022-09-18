/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'sans-serif': 'DM Sans',
    },
    extend: {
      colors: {
        darkGreen: '#028593',
        brightGreen: '#1ab9d8',
      },
      backgroundImage: {
        startPageImage:
          "url('file:///Users/vadim.domnenko/Desktop/IT/Social-Network-Project/client/src/images/startPage.jpeg')",
        signInImage:
          "url('file:///Users/vadim.domnenko/Desktop/IT/Social-Network-Project/client/src/images/signInImage4.jpeg')",
      },
      boxShadow: {
        custom: '0 0 30px -20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
