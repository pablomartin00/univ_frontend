import daisyui from "daisyui"

module.exports = {
  content: [
    './src/**/*.{html,svelte,js,ts}', // Archivos a escanear para las clases de Tailwind
  ],
  theme: {
    extend: {
      fontFamily: {
                    sans: ['Poppins', 'sans-serif'], // Usamos Poppins como la fuente principal para 'font-sans'
                  }
            },

          },
  daisyui: {
    themes: ["light","dark","cupcake"],
  },
  plugins: [daisyui],
}


