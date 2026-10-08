/**
 * LocalStorage utilities for tracking Touch Grass points and streak offline.
 */

const STORAGE_KEYS = {
  POINTS: 'trailmate_grass_points',
  COMPLETED: 'trailmate_completed_count',
  HISTORY: 'trailmate_mission_history',
  ACTIVE: 'trailmate_active_mission',
};

export function getStoredPoints() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.POINTS);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function addStoredPoints(points) {
  try {
    const current = getStoredPoints();
    const updated = current + points;
    localStorage.setItem(STORAGE_KEYS.POINTS, updated.toString());
    return updated;
  } catch {
    return points;
  }
}

export function getCompletedCount() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function recordCompletedMission(mission, earnedPoints) {
  try {
    const count = getCompletedCount() + 1;
    localStorage.setItem(STORAGE_KEYS.COMPLETED, count.toString());

    const history = getMissionHistory();
    const entry = {
      id: mission.id,
      title: mission.title,
      activity: mission.activity,
      duration: mission.duration_minutes,
      points: earnedPoints,
      completedAt: new Date().toISOString(),
    };
    history.unshift(entry);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 20)));
    return count;
  } catch {
    return 1;
  }
}

export function getMissionHistory() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}
