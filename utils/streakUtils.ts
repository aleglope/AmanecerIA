export const calculateStreak = (dates: string[]): number => {
  if (!dates.length) return 0;

  // Remove duplicates and sort descending
  const uniqueDates = [...new Set(dates)].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let streak = 0;
  let currentDate = new Date(uniqueDates[0]);
  currentDate.setHours(0, 0, 0, 0);

  // Check if the most recent entry is today or yesterday
  if (
    currentDate.getTime() !== today.getTime() &&
    currentDate.getTime() !== yesterday.getTime()
  ) {
    return 0;
  }

  // If the most recent entry is today, we start counting from today.
  // If it's yesterday, we start counting from yesterday (streak is still alive).
  let checkDate = currentDate.getTime() === today.getTime() ? today : yesterday;

  for (const dateStr of uniqueDates) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === checkDate.getTime()) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // Gap found, streak ends
      break;
    }
  }

  return streak;
};
