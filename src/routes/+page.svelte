<script>
  import Sidebar from '../components/Sidebar.svelte';
  import DocumentSection from '../components/DocumentSection.svelte';
  import Chat from '../components/Chat.svelte';
</script>

<div class="h-screen flex flex-col">
  <!-- Contenedor principal que ocupa el espacio restante -->
  <div class="flex flex-1 min-h-0">
    <!-- Sidebar -->
    <Sidebar class="flex-none" />

    <!-- Main Content -->
    <div class="flex flex-1 min-w-0">
      <!-- Document Section -->
      <div class="w-1/2 overflow-y-auto">
        <!-- Card para Documentos -->
        <DocumentSection /> 
      </div>

      <!-- Chat Section -->
      <div class="w-1/2 overflow-y-auto">
        <Chat />
      </div>
    </div>
  </div>
</div>
