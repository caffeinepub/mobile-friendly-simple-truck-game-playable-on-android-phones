import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, Skull } from 'lucide-react';

interface GameOverScreenProps {
  kills: number;
  won: boolean;
  onRestart: () => void;
}

export default function GameOverScreen({ kills, won, onRestart }: GameOverScreenProps) {
  return (
    <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center p-6 z-50">
      <div className="text-center space-y-6 max-w-sm">
        {/* Icon */}
        <div className="flex justify-center">
          {won ? (
            <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center border-4 border-success battle-shadow relative overflow-hidden">
              <div className="absolute inset-0 battle-glow opacity-30" />
              <Trophy className="w-12 h-12 text-success relative z-10" />
            </div>
          ) : (
            <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center border-4 border-destructive battle-shadow relative overflow-hidden">
              <div className="absolute inset-0 battle-glow opacity-30" />
              <Skull className="w-12 h-12 text-destructive relative z-10" />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-foreground">
            {won ? 'Victory!' : 'Defeated'}
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            {won ? 'You eliminated all enemies!' : 'Your health reached zero'}
          </p>
        </div>

        {/* Score display */}
        <div className="battle-panel rounded-2xl p-8 shadow-xl">
          <p className="text-sm text-muted-foreground mb-2 font-bold uppercase tracking-wide">
            Enemies Eliminated
          </p>
          <p className="text-6xl font-bold text-primary">{kills}</p>
        </div>

        {/* Restart button */}
        <Button
          size="lg"
          onClick={onRestart}
          className="w-full text-lg h-14 shadow-lg font-bold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
