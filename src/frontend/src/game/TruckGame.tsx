import { useState } from 'react';
import { useTruckGame } from './useTruckGame';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PauseOverlay from './components/PauseOverlay';
import Hud from './components/Hud';
import TouchControls from './components/TouchControls';
import { Truck } from 'lucide-react';

export default function TruckGame() {
  const [isPaused, setIsPaused] = useState(false);
  
  const {
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
  } = useTruckGame();

  const handleStart = () => {
    startGame();
  };

  const handlePause = () => {
    pauseGame();
    setIsPaused(true);
  };

  const handleResume = () => {
    resumeGame();
    setIsPaused(false);
  };

  const handleRestart = () => {
    restartGame();
    setIsPaused(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-muted overflow-hidden">
      {/* Game viewport */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Road background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-muted-foreground/20 to-muted">
          {/* Road lanes */}
          <div className="absolute inset-0 flex justify-center">
            <div className="relative w-full max-w-md h-full bg-muted-foreground/30">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 road-stripe opacity-60" />
              
              {/* Lane markers */}
              <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-border opacity-40" />
              <div className="absolute right-1/4 top-0 bottom-0 w-0.5 bg-border opacity-40" />
            </div>
          </div>
        </div>

        {/* Game content */}
        {gameState !== 'idle' && (
          <div className="relative w-full max-w-md h-full">
            {/* Obstacles */}
            {obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                className="absolute w-16 h-16 bg-destructive rounded-lg shadow-lg transition-all duration-75"
                style={{
                  left: `${obstacle.lane * 33.33}%`,
                  top: `${obstacle.position}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-destructive-foreground">
                  <div className="w-12 h-12 bg-destructive-foreground/20 rounded flex items-center justify-center">
                    🚧
                  </div>
                </div>
              </div>
            ))}

            {/* Player truck */}
            <div
              className="absolute bottom-[15%] w-16 h-20 transition-all duration-200 ease-out"
              style={{
                left: `${truckPosition * 33.33}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="relative w-full h-full">
                {/* Truck body */}
                <div className="absolute inset-0 bg-primary rounded-lg truck-shadow flex items-center justify-center">
                  <Truck className="w-10 h-10 text-primary-foreground" />
                </div>
                {/* Truck highlights */}
                <div className="absolute top-2 left-2 right-2 h-1 bg-primary-foreground/30 rounded-full" />
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-primary-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Overlays */}
        {gameState === 'idle' && <StartScreen onStart={handleStart} />}
        {isPaused && <PauseOverlay onResume={handleResume} />}
        {gameState === 'gameOver' && (
          <GameOverScreen score={score} onRestart={handleRestart} />
        )}
      </div>

      {/* HUD */}
      {gameState === 'playing' && !isPaused && (
        <Hud score={score} onPause={handlePause} />
      )}

      {/* Touch controls */}
      {gameState === 'playing' && !isPaused && (
        <TouchControls onLeft={moveLeft} onRight={moveRight} />
      )}

      {/* Footer */}
      <footer className="py-2 px-4 text-center text-xs text-muted-foreground bg-background/50 backdrop-blur-sm">
        © 2026. Built with ❤️ using{' '}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
