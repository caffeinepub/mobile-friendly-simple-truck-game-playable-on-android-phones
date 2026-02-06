import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TouchControlsProps {
  onLeft: () => void;
  onRight: () => void;
}

export default function TouchControls({ onLeft, onRight }: TouchControlsProps) {
  return (
    <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-8 px-8 z-30 pb-safe">
      {/* Left button */}
      <Button
        size="lg"
        variant="secondary"
        onClick={onLeft}
        className="h-16 w-16 rounded-full shadow-xl active:scale-95 transition-transform"
        onTouchStart={(e) => {
          e.preventDefault();
          onLeft();
        }}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      {/* Right button */}
      <Button
        size="lg"
        variant="secondary"
        onClick={onRight}
        className="h-16 w-16 rounded-full shadow-xl active:scale-95 transition-transform"
        onTouchStart={(e) => {
          e.preventDefault();
          onRight();
        }}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </div>
  );
}
