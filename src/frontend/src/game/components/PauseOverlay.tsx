import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface PauseOverlayProps {
  onResume: () => void;
}

export default function PauseOverlay({ onResume }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center p-6 z-50">
      <div className="text-center space-y-6 max-w-sm">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Paused</h2>
          <p className="text-muted-foreground text-sm">
            Take a break, then continue driving
          </p>
        </div>

        {/* Resume button */}
        <Button
          size="lg"
          onClick={onResume}
          className="w-full text-lg h-14 shadow-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Resume Game
        </Button>
      </div>
    </div>
  );
}
