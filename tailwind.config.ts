import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Monochrome industrial palette
        ink: "#1c1c1c", // primary text
        carbon: "#000000", // pure black / dark sections
        ash: "#efefef", // light background
        steel: "#7a7a7a", // secondary grey
        line: "#d8d8d8", // hairline borders
        ember: "#c8462a", // single warm accent (stufe / fuoco)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.1em",
        widest2: "0.18em",
      },
      maxWidth: {
        site: "1600px",
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
