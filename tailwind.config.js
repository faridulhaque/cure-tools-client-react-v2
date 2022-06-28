/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "rgb(38,49,82)",
          secondary: "red",
          accent: "#37cdbe",
          neutral: "#3d4451",
          
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },

  plugins: [require("daisyui")],
};
