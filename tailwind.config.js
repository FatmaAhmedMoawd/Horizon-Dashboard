/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "1p": "1%",
        "50p": "50%",
        "99p": "99%",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        "3xl": "14px 17px 40px 4px",
        inset: "inset 0px 18px 22px",
        darkinset: "0px 4px 4px inset",
      },
      borderRadius: {
        primary: "20px",
      },
    },
    screens: {
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "992px",
      "lg-max": { max: "992px" },
      xl: "1200px",
      "xl-max": { max: "1200px" },
      "2xl": "1320px",
      "2xl-max": { max: "1320px" },
      "3xl": "1600px",
      "3xl-max": { max: "1600px" },
      "4xl": "1850px",
      "4xl-max": { max: "1850px" },
    },
    colors: () => ({
      white: "#ffffff",
      lightPrimary: "#F4F7FE",
      blueSecondary: "#4318FF",
      brandLinear: "#868CFF",
      gray: {
        50: "#f8f9fa",
        100: "#edf2f7",
        200: "#e9ecef",
        300: "#cbd5e0",
        400: "#a0aec0",
        500: "#adb5bd",
        600: "#a3aed0",
        700: "#707eae",
        800: "#252f40",
        900: "#1b2559",
      },
      navy: {
        50: "#d0dcfb",
        100: "#aac0fe",
        200: "#a3b9f8",
        300: "#728fea",
        400: "#3652ba",
        500: "#1b3bbb",
        600: "#24388a",
        700: "#1B254B",
        800: "#111c44",
        900: "#0b1437",
      },
      red: {
        50: "#ee5d501a",
        500: "#f53939",
        600: "#ea0606",
      },
      orange: {
        500: "#f97316",
      },
      green: {
        50: "#05cd991a",
        500: "#22c55e",
        600: "#17ad37",
      },
      brand: {
        400: "#7551FF",
        500: "#422AFB",
        600: "#3311DB",
      },
      shadow: {
        500: "rgba(112, 144, 176, 0.08)",
      },
    }),
  },
  plugins: [require("tailwindcss-rtl")],
};
