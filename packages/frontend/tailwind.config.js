/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    //themes: ["black"],
    themes: false,
    darkTheme: "dark"
  },
  theme: {
    extend: {
      flex: {
        2: "1 1 100%",
      }
    }
  }
}
