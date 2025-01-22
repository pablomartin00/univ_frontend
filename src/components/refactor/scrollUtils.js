export const scrollToBottom = (chatContainer, messageInput, isLoading) => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    if (messageInput && !isLoading) {
      messageInput.focus();
    }
  };
  