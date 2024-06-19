/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
    },
  },
  variants: {
    lineClamp: ["responsive", "hover"],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".line-clamp-1": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
          overflow: "hidden",
        },
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
          overflow: "hidden",
        },
        ".line-clamp-3": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
          overflow: "hidden",
        },
        ".line-clamp-4": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "4",
          overflow: "hidden",
        },
        ".line-clamp-5": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "5",
          overflow: "hidden",
        },
        ".line-clamp-6": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "6",
          overflow: "hidden",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
});
