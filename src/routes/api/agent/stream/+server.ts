import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const backendUrl = import.meta.env.VITE_BACKEND_URL; // URL del backend, configurada en las variables de entorno
const securityToken = import.meta.env.VITE_SECURITY_TOKEN; // Leer el SECURITY_TOKEN del entorno

// +server.ts
export const GET: RequestHandler = async ({ url }) => {
    const encoder = new TextEncoder();
    
    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            const userMessage = url.searchParams.get('user_message');
            const historicalMessages = JSON.parse(url.searchParams.get('historical_messages') || '[]');
            
            const legajoPaciente = url.searchParams.get('legajo_paciente');

            // Imprimimos los valores en la consola para visualizarlos
            console.log('#1userMessage:', userMessage);
            console.log('#2historicalMessages:', historicalMessages);
            console.log('#3legajoPaciente:', legajoPaciente);

  
            if (!userMessage) {
              // Enviar mensaje de error en el formato adecuado de SSE
              controller.enqueue(encoder.encode('data: {"error": "No se proporcionó mensaje del usuario."}\n\n'));
              controller.close();
              return;
            }
  
            const response = await fetch(`${backendUrl}/api/askagent`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${securityToken}`,
              },
              body: JSON.stringify({
                user_message: userMessage,
                historical_messages: historicalMessages,
                legajo_paciente: legajoPaciente,
              }),
            });
  
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
  
            const reader = response.body?.getReader();
            if (!reader) {
              throw new Error('No se pudo leer la respuesta del backend');
            }
  
            const decoder = new TextDecoder();
            let isDone = false;
  
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) {
                // Antes de cerrar, enviar la señal de "cerrar conexión"
                controller.enqueue(encoder.encode('data: {"type": "close_connection"}\n\n'));
                controller.close();
                break;
              }
  
              const chunk = decoder.decode(value, { stream: true });
  
              // Enviar el chunk de datos al cliente, con el formato adecuado para SSE
              controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            }
          } catch (error) {
            // Enviar el error en el formato adecuado de SSE
            controller.enqueue(encoder.encode(`data: {"error": "${error.message}"}\n\n`));
            controller.close();
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      }
    );
  };
  