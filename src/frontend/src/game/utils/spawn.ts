import type { Obstacle } from '../useTruckGame';

export function shouldSpawnObstacle(
  timeSinceLastSpawn: number,
  spawnInterval: number
): boolean {
  return timeSinceLastSpawn >= spawnInterval;
}

export function generateObstacle(
  id: number,
  existingObstacles: Obstacle[]
): Obstacle | null {
  // Get available lanes (avoid spawning on top of recent obstacles)
  const recentObstacles = existingObstacles.filter((obs) => obs.position < 30);
  const occupiedLanes = new Set(recentObstacles.map((obs) => obs.lane));
  
  const availableLanes = [0, 1, 2].filter((lane) => !occupiedLanes.has(lane));
  
  if (availableLanes.length === 0) {
    // All lanes occupied, pick random lane anyway
    const lane = Math.floor(Math.random() * 3);
    return { id, lane, position: -10 };
  }

  // Pick random available lane
  const lane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
  
  return {
    id,
    lane,
    position: -10, // Start above screen
  };
}
