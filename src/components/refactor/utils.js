import { userData } from '../../stores/userData.js';

// Manejo del store userData
export const userDataHandler = (callback) => {
  userData.subscribe((value) => {
    
    if (Array.isArray(value)) {
      callback({
        columns: Object.keys(value[0] || {}),
        rows: value,
      });
    } else {
      callback(value);
    }
  });
};

// Formateo de valores
export const formatValue = (value) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch (e) {
      return 'Error: Datos inválidos';
    }
  }
  return String(value);
};
