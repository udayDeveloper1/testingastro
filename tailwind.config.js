// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true, // centers the container
      padding: '1rem', // default horizontal padding
      screens: {
        sm: '100%',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        "website-color": "#6B46C1",
      },
    },
  },
  plugins: [],
}
