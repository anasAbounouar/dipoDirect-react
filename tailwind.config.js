/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        myBrand: '#2196F3', // Primary Color
        mySoftBrand: 'rgba(33, 150, 243, 0.2)',
        mySoftGreen: 'rgba(165, 214, 167, 0.2)',
        myHeartColor: '#4CAF50',
        myTextSlateGray: '#727272',

        myLightGrey: '#D3D3D3', // Neutrals Group
        mySilver: '#C0C0C0', // Neutrals Group
        myTurquoise: '#40E0D0', // Highlight Group
        myDarkBlue: '#1565C0', // Main Colors
        myRoyalBlue: '#4169E1', // Main Colors
        myIndigo: '#4B0082', // Creative Group
        myNavyBlue: '#000080', // Depth Group
        myStripe: '#F4F2FF', // Backgrounds
        myLightTheme: '#F9F9FC', // Backgrounds
        // Add other colors here
        myDarkColor: '#2F2F2F',
        myNonImportantText: '#A0ABC0',
        myTealBlue: '#009688',
        myContent: '#EEEE',
        myLogin: '#D18742',
      },
      margin: {
        'sidebar-expanded': '300px',
        'sidebar-collapsed': '62px',
      },
      width: {
        'sidebar-expanded': '300px',
        'sidebar-collapsed': '62px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
