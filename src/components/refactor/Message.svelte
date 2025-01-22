<script>
  export let user;
  export let text;
  export let time;
</script>

<div class="chat {user === 'me' ? 'chat-end' : 'chat-start'}" role="article">
  <div class="chat-header">
    {user === 'me' ? 'Tú' : 'Asistente'}
    <time class="text-xs text-opacity-75">{time}</time>
  </div>
  <div class="chat-bubble bg-base-300 text-base-content" style="white-space: pre-wrap">
    {text}
  </div>
</div>
