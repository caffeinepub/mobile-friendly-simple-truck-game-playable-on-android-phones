import { Button } from '@/components/ui/button';
import { Play, Target } from 'lucide-react';

interface PauseOverlayProps {
  onResume: () => void;
}

export default function PauseOverlay({ onResume }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center p-6 z-50">
      <div className="text-center space-y-6 max-w-sm">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-4 border-primary battle-shadow">
            <Target className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Paused</h2>
          <p className="text-muted-foreground text-sm font-medium">
            Battle is on hold
          </p>
        </div>

        {/* Resume button */}
        <Button
          size="lg"
          onClick={onResume}
          className="w-full text-lg h-14 shadow-lg font-bold"
        >
          <Play className="w-5 h-5 mr-2" />
          Resume Battle
        </Button>
      </div>
    </div>
  );
}
