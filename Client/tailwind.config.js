module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {},
    extend: {
      spacing: {
        1.5: "0.4rem",
      },
      colors: {
        palebg: "rgba(0,0,0, 0.01)",
        mybrown: "rgb(169, 164, 163)",
        darkbrown: "#5A342C",
        coffee: "#715046",
        espresso: "#403735",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        source: ["Source Sans Pro", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        norm: "0.95rem",
      },
      minWidth: {
        "1/4": "25%",
      },
      height: {
        smpage: "60vh",
      },
      boxShadow: {
        light: "0px 2px 4px rgb(210, 210, 210)",
        clean: "0px 1px 2px rgb(228, 228, 228)",
      },
      backgroundImage: (theme) => ({
        "footer-image": "url('./assets/h1.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      borderColor: ["disabled", "group-hover"],
      textColor: ["active"],
      padding: ["group-hover", "hover"],
      width: ["group-hover"],
      borderRadius: ["group-hover", "hover"],
      fontSize: ["group-hover"],
      translate: ["group-hover", "hover"],
      outline: ["active", "focus"],
      borderWidth: ["hover"],
      scale: ["group-hover"],
    },
  },
  plugins: [],
};
