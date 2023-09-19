/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#151520",
        primary: "#202025",
        secondary: "#252530",
        tertial: "#303035",
      },
    },
  },
  plugins: [],
};
