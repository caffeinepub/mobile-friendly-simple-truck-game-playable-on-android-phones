import { Button } from '@/components/ui/button';
import { Pause, Heart, Target } from 'lucide-react';

interface HudProps {
  health: number;
  kills: number;
  onPause: () => void;
}

export default function Hud({ health, kills, onPause }: HudProps) {
  const healthPercentage = Math.max(0, Math.min(100, health));
  const healthColor = healthPercentage > 50 ? 'bg-success' : healthPercentage > 25 ? 'bg-accent' : 'bg-destructive';

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-40 pointer-events-none">
      {/* Left side - Health and Kills */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Health bar */}
        <div className="battle-panel rounded-lg px-4 py-2 min-w-[180px]">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-xs font-bold text-foreground uppercase tracking-wide">Health</span>
          </div>
          <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${healthColor} transition-all duration-300`}
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right font-bold">{Math.floor(health)}/100</p>
        </div>

        {/* Kills counter */}
        <div className="battle-panel rounded-lg px-4 py-2 min-w-[180px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-wide">Kills</span>
            </div>
            <span className="text-2xl font-bold text-primary">{kills}</span>
          </div>
        </div>
      </div>

      {/* Right side - Pause button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onPause}
        className="battle-shadow pointer-events-auto"
      >
        <Pause className="w-5 h-5" />
      </Button>
    </div>
  );
}
