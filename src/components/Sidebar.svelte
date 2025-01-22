<script>
  const modules = [
    { icon: '📄', name: 'Documentos' },
    { icon: '💬', name: 'Chat' },
    { icon: '⚙️', name: 'Configuración' }
  ];

  let currentTheme = "light";

  function changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    currentTheme = theme;
  }
</script>

<aside class="w-24 flex flex-col items-center bg-base-100 my-3 ml-3 mr-2">
  <!-- Contenedor que aplica el margen y padding -->
  <div class="card bg-base-200 shadow-xl p-4 rounded-lg flex-1 "> <!-- Aquí se envuelve todo en un card -->
    
    <!-- Módulos de la barra lateral, centrados horizontalmente -->
    <div class="flex flex-col items-center mb-4">
      {#each modules as { icon, name }}
        <div
          class="cursor-pointer hover:bg-gray-700 p-2 rounded-full mb-4"
          title={name}
        >
          <span class="text-2xl">{icon}</span>
        </div>
      {/each}
    </div>

    <!-- Botones de selección de tema, alineados abajo -->
    <div class="mt-auto flex gap-2 flex-col w-full">
      <button
        class="btn btn-sm w-full rounded-full bg-white text-black"
        on:click={() => changeTheme("light")}
        title="Light Theme"
      >
        Light
      </button>
      <button
        class="btn btn-sm w-full rounded-full bg-black text-white"
        on:click={() => changeTheme("dark")}
        title="Dark Theme"
      >
        Dark
      </button>
      <button
        class="btn btn-sm w-full rounded-full bg-yellow-400 text-black"
        on:click={() => changeTheme("cupcake")}
        title="Cupcake Theme"
      >
        Cupcake
      </button>
    </div>
  </div>
</aside>
