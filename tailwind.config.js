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
        "profile-avtar": "url('/img/profile.jpg')",
      },
      fontFamily: {
        comforter: ["Comforter", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
