# Implementation Plan: Premium Features & Gamification

We will implement the remaining "Essence" pillars:

1.  **Habit Cycle (Streaks)**: Gamify the experience to encourage daily check-ins.
2.  **Premium Value (Charts)**: Visualize emotional progress.
3.  **Premium Value (Library)**: Provide actionable tools (CBT/Mindfulness exercises).

## User Review Required

> [!NOTE]
> We need to install `recharts` for the data visualization.

## Proposed Changes

### 1. Dependencies

- Run `npm install recharts`

### 2. Habit Cycle (Streaks)

#### [NEW] [utils/streakUtils.ts](file:///c:/Users/34692/Documents/AmanecerIA/utils/streakUtils.ts)

- Function `calculateStreak(moodHistory)`: Calculates consecutive days ending today/yesterday.

#### [MODIFY] [context/AuthContext.tsx](file:///c:/Users/34692/Documents/AmanecerIA/context/AuthContext.tsx)

- Fetch full mood history (lightweight query) to calculate streak on load.
- Expose `streak` in the context.

#### [MODIFY] [components/dashboard/ProfileHeader.tsx](file:///c:/Users/34692/Documents/AmanecerIA/components/dashboard/ProfileHeader.tsx)

- Display "🔥 {streak} días" badge next to the greeting.

### 3. Mood Charts (Premium)

#### [NEW] [components/dashboard/MoodChart.tsx](file:///c:/Users/34692/Documents/AmanecerIA/components/dashboard/MoodChart.tsx)

- Use `recharts` to render a line/area chart of mood levels over time.
- Map moods to numeric values (Very Bad=1 to Very Good=5).

#### [MODIFY] [components/dashboard/MoodHistory.tsx](file:///c:/Users/34692/Documents/AmanecerIA/components/dashboard/MoodHistory.tsx)

- If `user.is_premium`: Show `MoodChart` above the list.
- If free: Show a "Blur" preview of a chart with a "Unlock Trends" CTA.

### 4. Exercise Library (Premium)

#### [NEW] [data/exercises.ts](file:///c:/Users/34692/Documents/AmanecerIA/data/exercises.ts)

- Static list of exercises (Title, Duration, Type, Content).

#### [NEW] [pages/ExercisesPage.tsx](file:///c:/Users/34692/Documents/AmanecerIA/pages/ExercisesPage.tsx)

- List of exercises. Clicking one opens a modal or expands it.

#### [MODIFY] [App.tsx](file:///c:/Users/34692/Documents/AmanecerIA/App.tsx)

- Add routing for `ExercisesPage` (e.g., if `view === 'exercises'`).

#### [MODIFY] [pages/Dashboard.tsx](file:///c:/Users/34692/Documents/AmanecerIA/pages/Dashboard.tsx)

- Add a new Card or Button to navigate to Exercises.

## Verification Plan

### Manual Verification

1.  **Streaks**: Log a mood. Check if flame icon appears/updates.
2.  **Charts**: (Temporarily set `is_premium` to true or use a test account). Verify the chart renders correctly with data.
3.  **Library**: Click "Exercises". Verify list loads and content is readable.
