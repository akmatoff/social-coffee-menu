/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        category: "var(--category)",
        categorySecondary: "var(--categorySecondary)",
      },
    },
  },
  plugins: [],
};
