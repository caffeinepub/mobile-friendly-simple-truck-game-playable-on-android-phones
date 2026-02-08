import { useState, useEffect, useCallback, useRef } from 'react';
import { checkCollision } from './utils/collision';
import { shouldSpawnEnemy, generateEnemy } from './utils/spawn';

export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver' | 'win';

export interface Enemy {
  id: number;
  x: number;
  y: number;
  health: number;
  speed: number;
}

export interface Projectile {
  id: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isPlayerProjectile: boolean;
}

export interface PlayerPosition {
  x: number;
  y: number;
}

const MAX_ENEMIES = 8;
const WIN_KILLS = 20;
const PLAYER_START_X = 50;
const PLAYER_START_Y = 70;
const PLAYER_SPEED = 0.8;
const PROJECTILE_SPEED = 1.2;
const ENEMY_SHOOT_INTERVAL = 2000;

export function useBattleGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [health, setHealth] = useState(100);
  const [kills, setKills] = useState(0);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ 
    x: PLAYER_START_X, 
    y: PLAYER_START_Y 
  });
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const enemyIdRef = useRef<number>(0);
  const projectileIdRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastEnemyShootRef = useRef<number>(0);
  const lastPlayerShootRef = useRef<number>(0);
  const movementRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const startGame = useCallback(() => {
    setGameState('playing');
    setHealth(100);
    setKills(0);
    setPlayerPosition({ x: PLAYER_START_X, y: PLAYER_START_Y });
    setEnemies([]);
    setProjectiles([]);
    enemyIdRef.current = 0;
    projectileIdRef.current = 0;
    lastTimeRef.current = performance.now();
    lastSpawnTimeRef.current = 0;
    lastEnemyShootRef.current = 0;
    lastPlayerShootRef.current = 0;
    movementRef.current = { dx: 0, dy: 0 };
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
    lastTimeRef.current = performance.now();
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const movePlayer = useCallback((dx: number, dy: number) => {
    movementRef.current = { dx, dy };
  }, []);

  const shoot = useCallback(() => {
    const now = performance.now();
    if (now - lastPlayerShootRef.current < 300) return; // Rate limit
    
    lastPlayerShootRef.current = now;
    
    setProjectiles((prev) => [
      ...prev,
      {
        id: projectileIdRef.current++,
        x: playerPosition.x,
        y: playerPosition.y - 5,
        velocityX: 0,
        velocityY: -PROJECTILE_SPEED,
        isPlayerProjectile: true,
      },
    ]);
  }, [playerPosition]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Update player position
      setPlayerPosition((prev) => {
        const newX = Math.max(10, Math.min(90, prev.x + movementRef.current.dx * PLAYER_SPEED * deltaTime * 0.1));
        const newY = Math.max(10, Math.min(90, prev.y + movementRef.current.dy * PLAYER_SPEED * deltaTime * 0.1));
        return { x: newX, y: newY };
      });

      // Move projectiles
      setProjectiles((prevProjectiles) => {
        return prevProjectiles
          .map((proj) => ({
            ...proj,
            x: proj.x + proj.velocityX * deltaTime * 0.1,
            y: proj.y + proj.velocityY * deltaTime * 0.1,
          }))
          .filter((proj) => proj.x >= 0 && proj.x <= 100 && proj.y >= 0 && proj.y <= 100);
      });

      // Check projectile-enemy collisions
      setProjectiles((prevProjectiles) => {
        const remainingProjectiles: Projectile[] = [];
        const hitEnemyIds = new Set<number>();

        prevProjectiles.forEach((proj) => {
          if (!proj.isPlayerProjectile) {
            remainingProjectiles.push(proj);
            return;
          }

          let hit = false;
          enemies.forEach((enemy) => {
            if (hitEnemyIds.has(enemy.id)) return;
            const dist = Math.sqrt(Math.pow(proj.x - enemy.x, 2) + Math.pow(proj.y - enemy.y, 2));
            if (dist < 8) {
              hit = true;
              hitEnemyIds.add(enemy.id);
            }
          });

          if (!hit) {
            remainingProjectiles.push(proj);
          }
        });

        // Damage hit enemies
        if (hitEnemyIds.size > 0) {
          setEnemies((prevEnemies) => {
            const updated = prevEnemies.map((enemy) => {
              if (hitEnemyIds.has(enemy.id)) {
                return { ...enemy, health: enemy.health - 50 };
              }
              return enemy;
            });
            
            // Remove dead enemies and update kills
            const alive = updated.filter((e) => e.health > 0);
            const deadCount = updated.length - alive.length;
            if (deadCount > 0) {
              setKills((prev) => prev + deadCount);
            }
            return alive;
          });
        }

        return remainingProjectiles;
      });

      // Check projectile-player collisions
      projectiles.forEach((proj) => {
        if (proj.isPlayerProjectile) return;
        const dist = Math.sqrt(Math.pow(proj.x - playerPosition.x, 2) + Math.pow(proj.y - playerPosition.y, 2));
        if (dist < 6) {
          setHealth((prev) => Math.max(0, prev - 10));
          setProjectiles((prev) => prev.filter((p) => p.id !== proj.id));
        }
      });

      // Move enemies toward player
      setEnemies((prevEnemies) => {
        return prevEnemies.map((enemy) => {
          const dx = playerPosition.x - enemy.x;
          const dy = playerPosition.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 1) {
            const moveX = (dx / dist) * enemy.speed * deltaTime * 0.01;
            const moveY = (dy / dist) * enemy.speed * deltaTime * 0.01;
            return {
              ...enemy,
              x: enemy.x + moveX,
              y: enemy.y + moveY,
            };
          }
          return enemy;
        });
      });

      // Enemy shooting
      if (currentTime - lastEnemyShootRef.current > ENEMY_SHOOT_INTERVAL) {
        lastEnemyShootRef.current = currentTime;
        
        enemies.forEach((enemy) => {
          const dx = playerPosition.x - enemy.x;
          const dy = playerPosition.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 0 && dist < 40) {
            setProjectiles((prev) => [
              ...prev,
              {
                id: projectileIdRef.current++,
                x: enemy.x,
                y: enemy.y,
                velocityX: (dx / dist) * PROJECTILE_SPEED * 0.7,
                velocityY: (dy / dist) * PROJECTILE_SPEED * 0.7,
                isPlayerProjectile: false,
              },
            ]);
          }
        });
      }

      // Spawn new enemies
      const spawnInterval = Math.max(1500, 3000 - kills * 50);
      const timeSinceLastSpawn = currentTime - lastSpawnTimeRef.current;
      
      if (shouldSpawnEnemy(timeSinceLastSpawn, spawnInterval) && enemies.length < MAX_ENEMIES) {
        const newEnemy = generateEnemy(enemyIdRef.current++, playerPosition);
        if (newEnemy) {
          setEnemies((prev) => [...prev, newEnemy]);
          lastSpawnTimeRef.current = currentTime;
        }
      }

      // Check win condition
      if (kills >= WIN_KILLS) {
        setGameState('win');
        return;
      }

      // Check lose condition
      if (health <= 0) {
        setGameState('gameOver');
        return;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, health, kills, playerPosition, enemies, projectiles]);

  return {
    gameState,
    health,
    kills,
    playerPosition,
    enemies,
    projectiles,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    movePlayer,
    shoot,
  };
}
