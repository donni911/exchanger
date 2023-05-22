/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e76f51",
        secondary: "#264653",

        body: "#4f2424",
      },
    },
  },
  plugins: [],
};
