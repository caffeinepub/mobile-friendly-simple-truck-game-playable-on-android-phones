import { useState } from 'react';
import { useBattleGame } from './useBattleGame';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PauseOverlay from './components/PauseOverlay';
import Hud from './components/Hud';
import TouchControls from './components/TouchControls';

export default function BattleGame() {
  const [isPaused, setIsPaused] = useState(false);
  
  const {
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
  } = useBattleGame();

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
    <div className="relative w-full h-full flex flex-col bg-battle-dark overflow-hidden">
      {/* Game viewport */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Arena background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/generated/arena-bg.dim_1920x1080.png)',
            filter: 'brightness(0.85)',
          }}
        />
        
        {/* Battle arena overlay */}
        <div className="absolute inset-0 battle-arena-gradient opacity-60" />

        {/* Game content */}
        {gameState !== 'idle' && (
          <div className="relative w-full h-full max-w-4xl">
            {/* Enemies */}
            {enemies.map((enemy) => (
              <div
                key={enemy.id}
                className="absolute transition-all duration-100"
                style={{
                  left: `${enemy.x}%`,
                  top: `${enemy.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '60px',
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src="/assets/generated/enemy-bot.dim_512x512.png"
                    alt="Enemy"
                    className="w-full h-full object-contain battle-shadow"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(255,0,0,0.4))',
                    }}
                  />
                  {/* Enemy health bar */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-destructive/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-destructive transition-all duration-200"
                      style={{ width: `${(enemy.health / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Projectiles */}
            {projectiles.map((projectile) => (
              <div
                key={projectile.id}
                className="absolute transition-all duration-75"
                style={{
                  left: `${projectile.x}%`,
                  top: `${projectile.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                }}
              >
                <img
                  src="/assets/generated/projectile-effect.dim_256x256.png"
                  alt="Projectile"
                  className="w-full h-full object-contain animate-pulse"
                  style={{
                    filter: projectile.isPlayerProjectile 
                      ? 'drop-shadow(0 0 8px rgba(0,255,255,0.8))' 
                      : 'drop-shadow(0 0 8px rgba(255,0,0,0.8))',
                  }}
                />
              </div>
            ))}

            {/* Player */}
            <div
              className="absolute transition-all duration-150 ease-out"
              style={{
                left: `${playerPosition.x}%`,
                top: `${playerPosition.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src="/assets/generated/player-hero.dim_512x512.png"
                  alt="Player"
                  className="w-full h-full object-contain battle-shadow"
                  style={{
                    filter: 'drop-shadow(0 6px 12px rgba(0,255,255,0.5))',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Overlays */}
        {gameState === 'idle' && <StartScreen onStart={handleStart} />}
        {isPaused && <PauseOverlay onResume={handleResume} />}
        {(gameState === 'gameOver' || gameState === 'win') && (
          <GameOverScreen 
            kills={kills} 
            won={gameState === 'win'}
            onRestart={handleRestart} 
          />
        )}
      </div>

      {/* HUD */}
      {gameState === 'playing' && !isPaused && (
        <Hud health={health} kills={kills} onPause={handlePause} />
      )}

      {/* Touch controls */}
      {gameState === 'playing' && !isPaused && (
        <TouchControls onMove={movePlayer} onShoot={shoot} />
      )}

      {/* Footer */}
      <footer className="py-2 px-4 text-center text-xs text-muted-foreground bg-background/60 backdrop-blur-sm border-t border-border/50">
        © 2026. Built with ❤️ using{' '}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
