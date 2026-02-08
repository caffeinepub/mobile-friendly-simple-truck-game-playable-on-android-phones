import type { Enemy, PlayerPosition } from '../useBattleGame';

export function shouldSpawnEnemy(
  timeSinceLastSpawn: number,
  spawnInterval: number
): boolean {
  return timeSinceLastSpawn >= spawnInterval;
}

export function generateEnemy(
  id: number,
  playerPosition: PlayerPosition
): Enemy | null {
  // Spawn enemies at random edges of the arena, away from player
  const edge = Math.floor(Math.random() * 4);
  let x: number, y: number;
  
  switch (edge) {
    case 0: // Top
      x = Math.random() * 80 + 10;
      y = 5;
      break;
    case 1: // Right
      x = 95;
      y = Math.random() * 80 + 10;
      break;
    case 2: // Bottom
      x = Math.random() * 80 + 10;
      y = 95;
      break;
    case 3: // Left
      x = 5;
      y = Math.random() * 80 + 10;
      break;
    default:
      x = 50;
      y = 5;
  }
  
  // Don't spawn too close to player
  const dist = Math.sqrt(Math.pow(x - playerPosition.x, 2) + Math.pow(y - playerPosition.y, 2));
  if (dist < 20) {
    return null;
  }
  
  return {
    id,
    x,
    y,
    health: 100,
    speed: 0.5 + Math.random() * 0.5,
  };
}
