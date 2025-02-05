export const buildApiUrl = (baseUrl, userMessage, historicalMessages, legajoPaciente) => {
  // Crear los parámetros de la URL
  const params = new URLSearchParams({
    user_message: userMessage.text,
    historical_messages: JSON.stringify(historicalMessages.map(({ user, text }) => ({ user, text }))),
    legajo_paciente: JSON.stringify(legajoPaciente), // Agregar el parámetro legajo_paciente
  });

  // Retornar la URL con los parámetros
  return `${baseUrl}?${params.toString()}`;
};


