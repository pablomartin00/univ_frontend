export const buildApiUrl = (baseUrl, userMessage, historicalMessages) => {
    const params = new URLSearchParams({
      user_message: userMessage.text,
      historical_messages: JSON.stringify(historicalMessages.map(({ user, text }) => ({ user, text }))),
    });
    return `${baseUrl}?${params.toString()}`;
  };
  