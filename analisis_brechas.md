# Análisis de Brechas: La Esencia de AmanecerIA

Tras revisar el código en profundidad, he identificado 5 pilares clave que necesitamos desarrollar para pasar de un "MVP funcional" a la "Esencia Emocional" que buscamos.

## 1. La "Personalización Real" está desconectada

Actualmente, tenemos la interfaz para que el usuario elija sus preferencias, pero el "cerebro" (Gemini) las ignora.

- **Estado Actual:** En `SettingsPage` y `types.ts` definimos `NotificationTone` (Amable, Directo, Motivador) y `NotificationLength`, pero **no se envían** a `geminiService.ts`.
- **La Esencia:** El usuario debe sentir que la IA le habla _exactamente_ como él necesita. Si elijo "Directo y Corto", el mensaje no puede ser un párrafo poético.
- **Acción:** Necesitamos inyectar `user.notificationPreferences` en los prompts de `generateMorningMessage` y `generateDashboardMessage`.

## 2. Reactividad Emocional Inmediata

El Dashboard actual es un poco estático en su respuesta emocional.

- **Estado Actual:** El `MessageCard` genera un mensaje basado _solo_ en el `Focus` (ej. "Ansiedad") al cargar. Si el usuario luego registra que se siente "Optimista" en el `MoodTracker`, el mensaje principal no cambia ni reacciona.
- **La Esencia:** "AmanecerIA" debe sentirse viva. Si le digo que estoy triste, el mensaje del día debería transformarse o ofrecer un consuelo inmediato, no quedarse estático en el "Focus" general.
- **Acción:** Hacer que `MessageCard` escuche los cambios en `MoodTracker` y ofrezca regenerar el mensaje o dar un "micro-consejo" basado en el mood actual.

## 3. Las Promesas "Premium" están vacías

La página de ventas promete mucho valor que aún no existe en el código.

- **Estado Actual:**
  - "Estadísticas de Progreso": Solo mostramos una lista de texto (`MoodHistory`). No hay gráficos ni visualización de tendencias.
  - "Biblioteca de Ejercicios": No existe ninguna estructura de datos ni componentes para audios o guías de TCC.
- **La Esencia:** Premium debe sentirse como un "Gimnasio Mental" completo, no solo un chat.
- **Acción:** Implementar una librería básica de recursos (aunque sean texto inicialmente) y usar una librería de gráficos (como Recharts) para el historial.

## 4. Memoria y Continuidad (El "Compañero")

La IA actual tiene amnesia a corto plazo.

- **Estado Actual:** El chat (`ChatPage`) envía el contexto inicial (Nombre, Focus, Últimos 3 moods), pero no guarda el historial de la conversación en Supabase. Si salgo y vuelvo, la conversación empieza de cero.
- **La Esencia:** Un compañero real recuerda lo que hablamos ayer. "Hola [Nombre], ¿cómo te fue con esa presentación de la que hablamos ayer?".
- **Acción:** Persistir los mensajes del chat en una tabla `chat_history` en Supabase y cargar un resumen o los últimos mensajes al iniciar una nueva sesión.

## 5. El Ciclo del Hábito (Gamificación Sutil)

Falta el gancho para que el usuario vuelva todos los días más allá de la notificación.

- **Estado Actual:** No hay concepto de "Racha" (Streak) ni revisión nocturna.
- **La Esencia:** La salud mental es una práctica diaria. Celebrar la constancia (ej. "3 días seguidos cuidando de ti") refuerza la identidad positiva del usuario.
- **Acción:** Añadir un contador de `current_streak` en el perfil del usuario y mostrarlo visualmente en el Header o Dashboard.

---

### Recomendación de Prioridad Inmediata

Para "empezar a implementar en profundidad", sugiero este orden:

1.  **Conectar Preferencias (Punto 1):** Es rápido y mejora drásticamente la percepción de calidad.
2.  **Reactividad (Punto 2):** Hace que la app se sienta "mágica" e inmediata.
3.  **Persistencia de Chat (Punto 4):** Es vital para la retención del usuario Premium.
