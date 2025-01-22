import { writable } from 'svelte/store';

// Crear el store con un valor inicial null
const { subscribe, set, update } = writable(null);

// Exportar el store con métodos adicionales para debugging
export const userData = {
  subscribe,
  set: (value) => {
    console.log('Setting userData store:', value);
    set(value);
  },
  update
};