export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  activeDates: string[]; // List of YYYY-MM-DD
}

const STORAGE_KEY = 'smart_learning_streak';

// Helper to format date in local YYYY-MM-DD
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate difference in whole calendar days
function getDaysDifference(dateStrA: string, dateStrB: string): number {
  const [y1, m1, d1] = dateStrA.split('-').map(Number);
  const [y2, m2, d2] = dateStrB.split('-').map(Number);
  const dateA = new Date(y1, m1 - 1, d1);
  const dateB = new Date(y2, m2 - 1, d2);
  const diffTime = dateA.getTime() - dateB.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Generates past N days as active dates for realistic baseline
function generateInitialActiveDates(count: number, todayStr: string): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    dates.push(getLocalDateString(d));
  }
  return dates;
}

export function getInitialStreak(): StreakData {
  const todayStr = getLocalDateString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StreakData;
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read streak from localStorage', err);
  }

  // Realistic starter streak for an eager learner
  const initialStreakCount = 6;
  const initialDates = generateInitialActiveDates(initialStreakCount, todayStr);
  const defaultStreak: StreakData = {
    currentStreak: initialStreakCount,
    longestStreak: 12,
    lastActiveDate: todayStr,
    activeDates: initialDates
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStreak));
  } catch {
    // Ignore storage quota
  }

  return defaultStreak;
}

export function updateStreakOnActivity(current: StreakData): StreakData {
  const todayStr = getLocalDateString();

  // If already logged in today, ensure today is in activeDates and return
  if (current.lastActiveDate === todayStr) {
    if (!current.activeDates.includes(todayStr)) {
      const updated = {
        ...current,
        activeDates: [...current.activeDates, todayStr]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    }
    return current;
  }

  const diffDays = getDaysDifference(todayStr, current.lastActiveDate);

  let newCurrent = current.currentStreak;
  if (diffDays === 1) {
    // Consecutive day activity!
    newCurrent += 1;
  } else if (diffDays > 1) {
    // Streak broken, reset to 1
    newCurrent = 1;
  } else {
    // Same day or clock skew, preserve
    newCurrent = Math.max(1, current.currentStreak);
  }

  const newLongest = Math.max(current.longestStreak, newCurrent);
  const updatedDates = Array.from(new Set([...current.activeDates, todayStr])).slice(-30);

  const updated: StreakData = {
    currentStreak: newCurrent,
    longestStreak: newLongest,
    lastActiveDate: todayStr,
    activeDates: updatedDates
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  return updated;
}
