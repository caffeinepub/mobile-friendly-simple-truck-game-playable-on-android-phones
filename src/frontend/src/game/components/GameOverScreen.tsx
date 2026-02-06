import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
  const finalScore = Math.floor(score);

  return (
    <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center p-6 z-50">
      <div className="text-center space-y-6 max-w-sm">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Game Over!</h2>
          <p className="text-muted-foreground text-sm">
            You crashed into an obstacle
          </p>
        </div>

        {/* Score display */}
        <div className="bg-card rounded-xl p-6 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">Final Score</p>
          <p className="text-5xl font-bold text-primary">{finalScore}</p>
        </div>

        {/* Restart button */}
        <Button
          size="lg"
          onClick={onRestart}
          className="w-full text-lg h-14 shadow-lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
