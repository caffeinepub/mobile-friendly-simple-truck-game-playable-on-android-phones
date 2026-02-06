import type { Obstacle } from '../useTruckGame';

const TRUCK_POSITION_BOTTOM = 15; // percentage from top where truck sits
const TRUCK_HEIGHT = 20; // percentage height
const OBSTACLE_HEIGHT = 16; // percentage height

export function checkCollision(truckLane: number, obstacles: Obstacle[]): boolean {
  const truckTop = 100 - TRUCK_POSITION_BOTTOM - TRUCK_HEIGHT;
  const truckBottom = 100 - TRUCK_POSITION_BOTTOM;

  for (const obstacle of obstacles) {
    // Check if in same lane
    if (obstacle.lane !== truckLane) {
      continue;
    }

    // Check vertical overlap
    const obstacleTop = obstacle.position;
    const obstacleBottom = obstacle.position + OBSTACLE_HEIGHT;

    const verticalOverlap =
      (obstacleTop >= truckTop && obstacleTop <= truckBottom) ||
      (obstacleBottom >= truckTop && obstacleBottom <= truckBottom) ||
      (obstacleTop <= truckTop && obstacleBottom >= truckBottom);

    if (verticalOverlap) {
      return true;
    }
  }

  return false;
}
