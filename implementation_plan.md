# Implementation Plan: Core Essence of AmanecerIA

We will implement the following 3 key features to deepen the application's essence:

1.  **Connect User Preferences**: Ensure Gemini uses the user's Tone and Length settings.
2.  **Emotional Reactivity**: Make the Dashboard message update immediately when the user logs a mood.
3.  **Chat Persistence**: Save and load chat history so the "Companion" remembers conversations.

## User Review Required

> [!IMPORTANT] > **Database Changes**: For Chat Persistence (Point 3), we need to create a new table `chat_messages`. I will provide the SQL for this. You may need to run this in your Supabase SQL Editor.

## Proposed Changes

### 1. Connect User Preferences

#### [MODIFY] [geminiService.ts](file:///c:/Users/34692/Documents/AmanecerIA/services/geminiService.ts)

- Update `generateMorningMessage` and `generateDashboardMessage` to accept `NotificationPreferences`.
- Modify `systemInstructions` to dynamically include instructions based on Tone (Amable, Directo, Motivador) and Length (Corto, Medio, Detallado).

#### [MODIFY] [MessageCard.tsx](file:///c:/Users/34692/Documents/AmanecerIA/components/dashboard/MessageCard.tsx)

- Pass `user.notificationPreferences` to the service calls.

### 2. Emotional Reactivity

#### [MODIFY] [Dashboard.tsx](file:///c:/Users/34692/Documents/AmanecerIA/pages/Dashboard.tsx)

- Create a state `currentMood` that updates when `MoodTracker` saves.
- Pass `currentMood` to `MessageCard`.

#### [MODIFY] [MessageCard.tsx](file:///c:/Users/34692/Documents/AmanecerIA/components/dashboard/MessageCard.tsx)

- Watch for changes in `currentMood`.
- If `currentMood` changes, trigger a new Gemini call with a specific "Reaction Prompt" (e.g., "The user just felt X. Give a quick supportive comment").

#### [MODIFY] [geminiService.ts](file:///c:/Users/34692/Documents/AmanecerIA/services/geminiService.ts)

- Add `generateMoodReaction` function.

### 3. Chat Persistence

#### [NEW] [supabase/migrations/01_create_chat_messages.sql](file:///c:/Users/34692/Documents/AmanecerIA/supabase/migrations/01_create_chat_messages.sql)

- SQL to create `chat_messages` table with `user_id`, `role`, `content`, `created_at`.

#### [MODIFY] [ChatPage.tsx](file:///c:/Users/34692/Documents/AmanecerIA/pages/ChatPage.tsx)

- On load: Fetch last N messages from `chat_messages`.
- On send: Insert user message and model response into `chat_messages`.

## Verification Plan

### Automated Tests

- None (Visual/Manual verification primarily).

### Manual Verification

1.  **Preferences**: Change settings to "Directo" and "Corto". Refresh Dashboard. Verify message style.
2.  **Reactivity**: Go to Dashboard. Log "Ansiedad". Verify `MessageCard` updates with a supportive message about anxiety.
3.  **Persistence**: Go to Chat. Say "Hola, me llamo Juan". Reload page. Verify the chat history is still there.
