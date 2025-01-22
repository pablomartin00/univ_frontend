export const formatHistoricalMessages = (msgs) =>
    msgs.map(({ user, text }) => ({ user, text }));
  
  export const updateMessages = (currentMessages, newText) => {
    const currentResponse = typeof newText === 'string' ? newText : newText.text;
    return [
      ...currentMessages.filter(
        (msg) => msg.user !== 'contact' || msg !== currentMessages[currentMessages.length - 1]
      ),
      {
        user: 'contact',
        text: currentResponse,
        time: new Date().toLocaleTimeString(),
      },
    ];
  };
  
  export const handleError = (messages, errorMessage) => [
    ...messages,
    {
      user: 'contact',
      text: `Error: ${errorMessage}`,
      time: new Date().toLocaleTimeString(),
    },
  ];
  