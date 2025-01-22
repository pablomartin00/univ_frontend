<script>
  import { onDestroy } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { messages } from '../stores/messages.js'; // Importamos el store
  import { chatStats } from '../stores/chatStats.js';
  import { userData } from '../stores/userData.js';
  
  import { formatHistoricalMessages, handleError } from './refactor/messageUtils.js';
  import { scrollToBottom } from './refactor/scrollUtils.js';
  import { cleanupConnection } from './refactor/connectionUtils.js';
  import { buildApiUrl } from './refactor/apiUtils.js';
  import { handleEventSourceMessages } from './refactor/eventSourceHandler.js';

  import Message from './refactor/Message.svelte';
  import LoadingIndicator from './refactor/LoadingIndicator.svelte';
  import ChatInput from './refactor/ChatInput.svelte';

  let newMessage = '';
  let isLoading = false;
  let eventSource = null;
  let chatContainer;
  let messageInput;

  afterUpdate(() => scrollToBottom(chatContainer, messageInput, isLoading));

  onDestroy(() => cleanupConnection(eventSource, (state) => (isLoading = state), undefined, messageInput));

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage = {
      user: 'me',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString()
    };

    messages.update(currentMessages => [...currentMessages, userMessage]); // Actualizamos el store con el nuevo mensaje
    newMessage = '';
    isLoading = true;

    try {
      const url = buildApiUrl('/api/agent/stream', userMessage, $messages);

      if (eventSource) eventSource.close();
      eventSource = new EventSource(url);
      handleEventSourceMessages(
        eventSource,
        $messages,
        (newMessages) => messages.set(newMessages), // Actualizamos el store con los nuevos mensajes
        () => cleanupConnection(eventSource, (state) => (isLoading = state), null, messageInput)
      );
    } catch (error) {
      messages.update(currentMessages => handleError(currentMessages, 'Error al procesar el mensaje. Por favor, intenta de nuevo.'));
      isLoading = false;
    }
  };
</script>

<div class="flex flex-col h-full">
  <div class="card flex-1 bg-base-100 shadow-xl rounded-lg overflow-hidden flex flex-col my-3 ml-2 mr-3">
    <!-- Chat Messages Area -->
    <div 
      bind:this={chatContainer}
      class="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200 text-base-content" 
      role="log" 
      aria-live="polite"
    >
      <h2 class="text-xl font-semibold">Chat con el Asistente Virtual</h2>
      
      {#each $messages as { user, text, time }}
        <Message {user} {text} {time} />
      {/each}

      {#if isLoading}
        <LoadingIndicator />
      {/if}
    </div>

    <!-- Input Area -->
    <div class="p-4 bg-base-300 border-t border-base-200">
      <ChatInput 
        bind:newMessage 
        bind:messageInput 
        {isLoading} 
        {sendMessage} 
      />
    </div>
  </div>
</div>
