module.exports = {
  content: [
    "./views/**/*.{ejs,html,js}",
    "./views/pages/**/*.{ejs,html,js}",
    "./views/components/**/*.{ejs,html,js}",
    "./views/partials/**/*.{ejs,html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/img/login-bg.jpg')",
        "profile-avtar": "url('/img/profile.jpg')",
      },
      fontFamily: {
        comforter: ["Comforter", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
