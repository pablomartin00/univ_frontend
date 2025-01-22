<script>
  export let newMessage;
  export let isLoading;
  export let messageInput;
  export let sendMessage;
</script>

<form 
  class="flex items-center space-x-2" 
  on:submit|preventDefault={sendMessage}>
  <input
    bind:this={messageInput}
    type="text"
    bind:value={newMessage}
    placeholder="Escribe un mensaje..."
    class="input input-bordered w-full bg-base-100 text-base-content"
    aria-label="Mensaje"
    disabled={isLoading}
  />

  <button
    type="submit"
    class="btn btn-circle btn-primary"
    aria-label="Enviar mensaje"
    disabled={isLoading || !newMessage.trim()}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  </button>
</form>
