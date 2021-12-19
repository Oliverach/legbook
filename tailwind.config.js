module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: true,
    themes: [
     // first one will be the default theme
      "light",
      "dark"
    ],
  }
}
