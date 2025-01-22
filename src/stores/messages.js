// ./stores/messages.js
import { writable } from 'svelte/store';

export const messages = writable([
  { user: 'contact', text: 'Hola, ¿puedo ayudarte con las inscripciones?', time: new Date().toLocaleTimeString() }
]);

export const resetMessages = () => {
  messages.set([
    { user: 'contact', text: 'Hola, ¿puedo ayudarte con las inscripciones?', time: new Date().toLocaleTimeString() }
  ]);
};
