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
        color1: "#E2744B",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        source: ["Source Sans Pro", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        norm: "0.97rem",
      },
      minWidth: {
        "1/4": "25%",
      },
      height: {
        page: "85vh",
        smpage: "60vh",
      },
      boxShadow: {
        light: "0px 2px 6px rgb(226, 226, 226)",
        clean: "0px 2px 3px rgb(238, 238, 238)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      borderColor: ["disabled", "group-hover"],
      textColor: ["active"],
      padding: ["group-hover"],
      width: ["group-hover"],
      borderRadius: ["group-hover"],
      fontSize: ["group-hover"],
      translate: ["group-hover", "hover"],
      outline: ["active", "focus"],
    },
  },
  plugins: [],
};
