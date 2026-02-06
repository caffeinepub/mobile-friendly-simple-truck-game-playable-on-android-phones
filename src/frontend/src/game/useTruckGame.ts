import { useState, useEffect, useCallback, useRef } from 'react';
import { checkCollision } from './utils/collision';
import { shouldSpawnObstacle, generateObstacle } from './utils/spawn';

export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface Obstacle {
  id: number;
  lane: number; // 0, 1, or 2
  position: number; // 0-100 (percentage from top)
}

export function useTruckGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [truckPosition, setTruckPosition] = useState(1); // 0=left, 1=center, 2=right
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const obstacleIdRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTruckPosition(1);
    setObstacles([]);
    obstacleIdRef.current = 0;
    lastTimeRef.current = performance.now();
    lastSpawnTimeRef.current = 0;
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

  const moveLeft = useCallback(() => {
    setTruckPosition((prev) => Math.max(0, prev - 1));
  }, []);

  const moveRight = useCallback(() => {
    setTruckPosition((prev) => Math.min(2, prev + 1));
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Update score (increases over time)
      setScore((prev) => prev + deltaTime * 0.01);

      // Calculate difficulty (speed increases with score)
      const difficulty = Math.min(1 + Math.floor(score / 100) * 0.2, 3);
      const moveSpeed = 0.15 * difficulty; // pixels per ms
      const spawnInterval = Math.max(800, 1500 - Math.floor(score / 50) * 100);

      // Move obstacles
      setObstacles((prevObstacles) => {
        const updated = prevObstacles
          .map((obstacle) => ({
            ...obstacle,
            position: obstacle.position + moveSpeed * deltaTime,
          }))
          .filter((obstacle) => obstacle.position < 120); // Remove off-screen obstacles

        return updated;
      });

      // Spawn new obstacles
      const timeSinceLastSpawn = currentTime - lastSpawnTimeRef.current;
      if (shouldSpawnObstacle(timeSinceLastSpawn, spawnInterval)) {
        const newObstacle = generateObstacle(obstacleIdRef.current++, obstacles);
        if (newObstacle) {
          setObstacles((prev) => [...prev, newObstacle]);
          lastSpawnTimeRef.current = currentTime;
        }
      }

      // Check collisions
      const collision = checkCollision(truckPosition, obstacles);
      if (collision) {
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
  }, [gameState, score, truckPosition, obstacles]);

  return {
    gameState,
    score,
    truckPosition,
    obstacles,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    moveLeft,
    moveRight,
  };
}
