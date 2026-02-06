import { Button } from '@/components/ui/button';
import { Pause } from 'lucide-react';

interface HudProps {
  score: number;
  onPause: () => void;
}

export default function Hud({ score, onPause }: HudProps) {
  const displayScore = Math.floor(score);

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-40 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
      {/* Score */}
      <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
        <p className="text-xs text-muted-foreground mb-0.5">Score</p>
        <p className="text-2xl font-bold text-primary tabular-nums">{displayScore}</p>
      </div>

      {/* Pause button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onPause}
        className="h-12 w-12 rounded-full shadow-md"
      >
        <Pause className="w-5 h-5" />
      </Button>
    </div>
  );
}
