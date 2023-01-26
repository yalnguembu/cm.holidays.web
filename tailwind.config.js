/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#E71D35",
        },
        blue: {
          primary: "#1565C0",
          light: "#E8F2FC",
        },
        "gray-25": "#EFF2F5",
      },
    },
  },
  plugins: [],
};
