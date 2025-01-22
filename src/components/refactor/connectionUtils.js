export const cleanupConnection = (eventSource, setIsLoading, setProcessingMessageId = () => {}, messageInput) => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (typeof setIsLoading === 'function') {
      setIsLoading(false);
    }
    if (typeof setProcessingMessageId === 'function') {
      setProcessingMessageId(null);
    }
    if (messageInput) {
      messageInput.focus();
    }
  };
  