<script>
  let currentTheme = "light";

  function changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    currentTheme = theme;
  }
</script>

<header class="bg-base-100 text-base-content p-4 flex items-center justify-between">
  <!-- Título -->
  <h1 class="text-lg font-bold">Mi Asistente Profesional</h1>

  <!-- Selector de temas -->
  <div class="flex gap-2">
    <button 
      class="btn btn-sm btn-primary" 
      on:click={() => changeTheme("light")}
    >
      Light
    </button>
    <button 
      class="btn btn-sm btn-secondary" 
      on:click={() => changeTheme("dark")}
    >
      Dark
    </button>
    <button 
      class="btn btn-sm btn-accent" 
      on:click={() => changeTheme("cupcake")}
    >
      Cupcake
    </button>
  </div>
</header>
