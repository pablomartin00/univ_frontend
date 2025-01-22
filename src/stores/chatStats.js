// src/stores/chatStats.js
import { writable } from 'svelte/store';

export const chatStats = writable({
  input_tokens: 0,
  output_tokens: 0,
  total_tokens: 0,
  total_time: 0
});