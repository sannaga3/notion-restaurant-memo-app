/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        width: {
          "700px": "700px",
          "600px": "600px",
          "550px": "550px",
          "500px": "500px",
          "450px": "450px",
          "400px": "400px",
          "350px": "350px",
          "300px": "300px",
          "250px": "250px",
          "200px": "200px",
          "150px": "150px",
          "100px": "100px",
          "50px": "50px",
          "30px": "30px",
          "20px": "20px",
          "10px": "10px",
        },
        height: {
          "700px": "700px",
          "600px": "600px",
          "550px": "550px",
          "500px": "500px",
          "450px": "450px",
          "400px": "400px",
          "350px": "350px",
          "300px": "300px",
          "250px": "250px",
          "200px": "200px",
          "150px": "150px",
          "100px": "100px",
          "50px": "50px",
          "30px": "30px",
          "20px": "20px",
          "10px": "10px",
        },
      },
    },
  },
  plugins: [],
};
