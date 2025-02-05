<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { userDataHandler, formatValue } from './refactor/utils';
  import { resetMessages } from '../stores/messages.js';
  import { userData } from '../stores/userData.js';
  import { uploadedFileStore } from '../stores/uploadedFileStore.js'; 

  let selectedPatient = '';
  let isOpen = false;
  let currentUserData = null;
  let errorMessage = ""; // Mensaje de error para la subida

  let uploadedFileContent = ""; // Reactivo, sincronizado con el store

  // Sincronizamos el store con la variable reactiva local
  uploadedFileStore.subscribe((value) => {
    uploadedFileContent = value;
  });

  // Suscripción al store y manejo de datos
  userDataHandler((value) => {
    currentUserData = value;
  });

  onMount(() => {
    console.log('Initial userData:', currentUserData);
  });

  const handlePatientSelect = (patient) => {
    selectedPatient = patient;
    isOpen = false;
  };

  const handleDropdownToggle = () => {
    isOpen = !isOpen;
  };

  // Función para manejar el refresh y resetear el historial de mensajes y userData
  const handleRefresh = () => {
    console.log('Current userData:', currentUserData);
    resetMessages(); // Reseteamos los mensajes a su estado inicial
    userData.set([]); // Reseteamos el userData a un array vacío (o null, según lo necesites)
  };

  // Función para manejar la subida del archivo
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    // Validar tipo de archivo
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!file || !validFileTypes.includes(file.type)) {
      errorMessage = "Por favor, sube un archivo válido (doc, docx, pdf, txt).";
      return;
    }

    errorMessage = ""; // Limpiar mensajes de error

    try {
      // Leer el archivo y extraer texto
      const text = await extractTextFromFile(file);
      uploadedFileStore.set(text); // Guardar contenido en el store
    } catch (error) {
      errorMessage = "Hubo un error procesando el archivo.";
      console.error(error);
    }
  };

  const handleExampleLoad = async () => {
    try {
      const response = await fetch('/demo1-extendida.txt');
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo de ejemplo.');
      }
      const text = await response.text();
      uploadedFileStore.set(text); // Guardar contenido en el store
    } catch (error) {
      errorMessage = "Hubo un error cargando el archivo de ejemplo.";
      console.error(error);
    }
  };


  // Función para extraer texto del archivo
  async function extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (file.type === 'application/pdf') {
          resolve("Procesamiento de PDF no implementado completamente."); // Preparado para futura implementación
        } else {
          resolve(reader.result); // Para archivos de texto planos o similares
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file); // Leer como texto
    });
  }

  // Procesamiento reactivo
  $: tableRows = currentUserData?.rows || [];
  $: tableHeaders = currentUserData?.columns || [];
</script>

<div class="flex flex-col h-full" role="region" aria-label="Panel de datos e info">
  <div class="card bg-base-200 shadow-xl p-4 rounded-lg flex-1 my-3 ml-2 mr-1">
    <!-- Header con título y botón de refresh -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold" id="panel-title">Asistente de Diagnóstico Médico</h2>
      <div class="flex items-center gap-2">
        <span class="text-sm opacity-50" role="status">
          {#if currentUserData}
            Datos actualizados
          {:else}
            Sin datos
          {/if}
        </span>

        <button 
          class="btn btn-circle btn-sm"
          on:click={handleRefresh}
          aria-label="Reinicializar demo"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Acordeones -->
    <div class="join join-vertical w-full">
    
    <!-- Acordeón: Selección de Legajo -->
    <div class="collapse bg-base-200 collapse-arrow">
      <input type="checkbox" class="peer" checked />
      <div class="collapse-title text-xl font-medium" id="user-data-title">
        Selección de Legajo
      </div>
      <div class="collapse-content" role="region" aria-labelledby="user-data-title">
        <div class="py-4">
          <!-- Botón para subir archivo -->
          <label class="btn btn-primary">
            Seleccionar archivo
            <input
              type="file"
              accept=".doc,.docx,.pdf,.txt"
              class="hidden"
              on:change="{handleFileUpload}" />
          </label>

          <label class="btn btn-secondary mt-4" on:click={handleExampleLoad}>
            Cargar Ejemplo
          </label>

          <!-- Mensaje de error -->
          {#if errorMessage}
            <p class="text-red-500 mt-2">{errorMessage}</p>
          {/if}

          <!-- Caja de texto para mostrar el archivo subido (solo si hay contenido) -->
          {#if uploadedFileContent}
            <textarea
              class="textarea textarea-bordered w-full mt-4"
              rows="10"
              readonly
              bind:value="{uploadedFileContent}">
            </textarea>
          {/if}
        </div>
      </div>
    </div>
      
    <!-- Acordeón: Información de Uso -->
    <div class="collapse bg-base-200 collapse-arrow">
      <input type="checkbox" class="peer" checked />
      <div class="collapse-title text-xl font-medium" id="usage-title">
        Información de Uso
      </div>
      <div class="collapse-content" role="region" aria-labelledby="usage-title">
        <p>
          ¡Bienvenido al asistente virtual para médicos y especialistas! Este asistente está diseñado para facilitar el acceso a información médica, gestionando historias clínicas y mejorando la atención al paciente. A continuación, te mostramos un ejemplo práctico de cómo interactuar con el asistente.
        </p>

        <h3 class="text-lg font-semibold mt-4">Ejemplo práctico de uso:</h3>
        
        <ul class="list-decimal ml-4">
          <li><strong>Primer paso:</strong> Cargar la historia clínica de un paciente. Antes de iniciar el chat, debes seleccionar la historia clínica. Puedes hacer esto subiendo el archivo correspondiente a través de la interfaz. Si no has cargado ninguna historia clínica, el asistente te lo recordará. <br><em>Formatos soportados: txt, pdf o documento Word.</em></li>
          <li><strong>Segundo paso:</strong> Una vez cargada la historia clínica, puedes empezar a hacer preguntas sobre el historial médico del paciente. Por ejemplo: </li>
        </ul>

        <ul class="list-decimal ml-8 mt-2">
          <li><em>"El paciente presenta actualmente dolor al hacer flexiones, ¿qué podría ser?"</em></li>
          <li><em>"¿Cuáles son los antecedentes médicos de este paciente?"</em></li>
          <li><em>"¿Qué diagnósticos previos tiene este paciente?"</em></li>
          <li><em>"¿Qué tratamientos ha recibido este paciente en el pasado?"</em></li>
        </ul>

        <p class="mt-4">
          **Importante:** El asistente está diseñado para responder exclusivamente sobre el historial clínico del paciente actual. No realiza agendamientos de citas ni consultas sobre otros pacientes ni estadísticas.
        </p>

        <h3 class="text-lg font-semibold mt-4">Otros ejemplos de consulta:</h3>
        <ul class="list-decimal ml-4">
          <li>¿Cuáles son los diagnósticos anteriores del paciente?</li>
          <li>¿Qué síntomas ha tenido este paciente en los últimos meses?</li>
          <li>¿Cuáles fueron los tratamientos previos a la consulta actual?</li>
        </ul>

        <p class="mt-4">
          Puedes probar estos ejemplos para obtener información más detallada sobre la historia clínica del paciente, sus diagnósticos, tratamientos y síntomas. Además, puedes adaptar estos ejemplos para crear consultas más específicas o realizar nuevas preguntas basadas en las necesidades de tu consulta clínica.
        </p>
      </div>
    </div>



    </div>
  </div>
</div>
