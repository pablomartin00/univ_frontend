import { userData } from '../../stores/userData.js';
import { chatStats } from '../../stores/chatStats.js';

export const handleEventSourceMessages = (eventSource, messages, setMessages, cleanupConnection) => {
  eventSource.onmessage = (event) => {
    try {
      let rawData = event.data;
      if (rawData.startsWith('data: ')) {
        rawData = rawData.slice(6);
      }
      const data = JSON.parse(rawData);

      // Handle user_data
      if ('user_data' in data) {
        try {
          const processedData = typeof data.user_data === 'string' ? JSON.parse(data.user_data) : data.user_data;
          const columns = processedData.length > 0 ? Object.keys(processedData[0]) : [];
          const tableData = { columns, rows: processedData };
          userData.set(tableData);
        } catch (error) {
          console.error('Error processing user data:', error);
        }
      }

      // Handle user_info
      if ('user_info' in data) {
        if (data.user_info === 'stats') {
          chatStats.set({
            input_tokens: data.input_tokens,
            output_tokens: data.output_tokens,
            total_tokens: data.total_tokens,
            total_time: data.total_time
          });
        }
      }

      // Handle generation
      if ('generation' in data) {
        setMessages([
          ...messages,
          { user: 'contact', text: data.generation, time: new Date().toLocaleTimeString() }
        ]);
      }
    } catch (error) {
      console.error('Error processing EventSource message:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('EventSource error:', error);
    cleanupConnection();
  };
};
