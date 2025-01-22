import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui'; // Importa DaisyUI
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [typography, forms, containerQueries, daisyui], // Agrega DaisyUI a los plugins

  // Configuración de DaisyUI
  daisyui: {
    themes: ['light', 'dark'], // Habilita temas de DaisyUI (opcional)
  },
} satisfies Config;