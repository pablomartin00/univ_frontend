<script>
  import { onMount } from 'svelte';
  import { userDataHandler, formatValue } from './refactor/utils';
  import { resetMessages } from '../stores/messages.js';
  import { userData } from '../stores/userData.js'; // Importamos el store de userData

  let selectedPatient = '';
  let isOpen = false;
  let currentUserData = null;

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
    resetMessages();  // Reseteamos los mensajes a su estado inicial
    userData.set([]);  // Reseteamos el userData a un array vacío (o null, según lo necesites)
  };

  // Procesamiento reactivo
  $: tableRows = currentUserData?.rows || [];
  $: tableHeaders = currentUserData?.columns || [];
</script>

<div class="flex flex-col h-full" role="region" aria-label="Panel de datos e info">
  <div class="card bg-base-200 shadow-xl p-4 rounded-lg flex-1 my-3 ml-2 mr-1">
    <!-- Header con título y botón de refresh -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold" id="panel-title">Asistente Para Universidades</h2>
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
    
      <!-- Acordeón: Datos del Usuario -->
      <div class="collapse bg-base-200 collapse-arrow">
        <input type="checkbox" class="peer" checked />
        <div class="collapse-title text-xl font-medium" id="user-data-title">
          Datos de la Consulta
        </div>
        <div class="collapse-content" role="region" aria-labelledby="user-data-title">
          {#if currentUserData && tableRows.length > 0}
            <div class="overflow-x-auto">
              <table class="table table-zebra w-full" aria-label="Datos del usuario">
                <thead>
                  <tr>
                    {#each tableHeaders as header}
                      <th scope="col" class="font-medium">
                        {header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ')}
                      </th>
                    {/each}
                  </tr>
                </thead>
                <tbody>
                  {#each tableRows as row}
                    <tr>
                      {#each tableHeaders as header}
                        <td class="whitespace-pre-wrap">{formatValue(row[header])}</td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <div class="text-center py-4 opacity-70" role="status">
              <p>No hay datos disponibles</p>
              {#if !currentUserData}
                <p class="text-sm mt-2">Los datos se actualizarán cuando el chat procese información</p>
              {/if}
            </div>
          {/if}
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
            ¡Bienvenido a la demo del asistente virtual para universidades! Este asistente está diseñado para facilitar tareas como inscripciones de alumnos y consultas sobre materias. A continuación, te guiamos a través de un ejemplo práctico de inscripción.
          </p>
          <h3 class="text-lg font-semibold mt-4">Ejemplo práctico de inscripción:</h3>

          <ul class="list-decimal ml-4">
            <li><strong>Primer paso:</strong> Conocer qué materias están disponibles. Puedes escribir:  
              <em>"¿Qué materias hay disponibles?"</em>
            </li>
            <li><strong>Segundo paso:</strong> Con la lista de materias, puedes preguntar por los profesores que dictan una en particular. Por ejemplo, escribe:  
              <em>"¿Qué profesores hay disponibles para Gestión de Proyectos?"</em>
            </li>
            <li><strong>Tercer paso:</strong> Selecciona un profesor y consulta las comisiones que tiene asignadas. Pregunta:  
              <em>"¿Qué comisiones tiene disponible Andrés Díaz para esa materia?"</em>
            </li>
            <li><strong>Cuarto paso:</strong> Ahora que tienes el número de la comisión, toca inscribir un alumno. Por el momento, solo se pueden inscribir alumnos existentes en la base de datos de la demo. Puedes buscar algunos alumnos escribiendo:  
              <em>"Dame una lista de 5 alumnos y sus documentos que no estén inscritos en la comisión 14."</em>
            </li>
            <li><strong>Quinto paso:</strong> Para inscribir al alumno en la comisión seleccionada, utiliza el siguiente comando:  
              <em>"Inscribe al alumno 3002 a la comisión 14."</em>
            </li>
            <li><strong>Sexto paso:</strong> Una vez realizada la inscripción, puedes verificar la lista de alumnos inscritos en la comisión escribiendo:  
              <em>"Lista los alumnos de la comisión 14 con sus documentos."</em>
            </li>
          </ul>

          <p class="mt-4">
            Esto te permitirá confirmar que el alumno ha sido añadido correctamente a la comisión que seleccionaste.
          </p>

          <h3 class="text-lg font-semibold mt-4">Otros ejemplos de consulta:</h3>

          <ul class="list-decimal ml-4">
            <li>¿Cuántos alumnos tienen las comisiones que tiene a cargo Andrés Díaz?</li>
            <li>¿Cuántas inscripciones tienen las comisiones que tiene a cargo Andrés Díaz?</li>
            <li>¿Cuántos alumnos tiene la comisión 3?</li>
          </ul>

          <p class="mt-4">
            Puedes probar estos ejemplos de consulta para obtener información detallada sobre las inscripciones, comisiones, materias, alumnos y profesores, e inspirarte para crear nuevas consultas. 
          </p>
        </div>



      </div>

    </div>
  </div>
</div>
