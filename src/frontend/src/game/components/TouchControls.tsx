import { Button } from '@/components/ui/button';
import { Crosshair } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TouchControlsProps {
  onMove: (dx: number, dy: number) => void;
  onShoot: () => void;
}

export default function TouchControls({ onMove, onShoot }: TouchControlsProps) {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const touchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const joystick = joystickRef.current;
    if (!joystick) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      
      touchIdRef.current = touch.identifier;
      setJoystickActive(true);
      updateJoystick(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchIdRef.current === null) return;
      
      const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
      if (!touch) return;
      
      updateJoystick(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const stillTouching = Array.from(e.touches).some(t => t.identifier === touchIdRef.current);
      if (!stillTouching) {
        touchIdRef.current = null;
        setJoystickActive(false);
        setJoystickPosition({ x: 0, y: 0 });
        onMove(0, 0);
      }
    };

    const updateJoystick = (clientX: number, clientY: number) => {
      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let dx = clientX - centerX;
      let dy = clientY - centerY;
      
      const maxDistance = rect.width / 2 - 20;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }
      
      setJoystickPosition({ x: dx, y: dy });
      
      const normalizedDx = dx / maxDistance;
      const normalizedDy = dy / maxDistance;
      onMove(normalizedDx, normalizedDy);
    };

    joystick.addEventListener('touchstart', handleTouchStart, { passive: false });
    joystick.addEventListener('touchmove', handleTouchMove, { passive: false });
    joystick.addEventListener('touchend', handleTouchEnd, { passive: false });
    joystick.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      joystick.removeEventListener('touchstart', handleTouchStart);
      joystick.removeEventListener('touchmove', handleTouchMove);
      joystick.removeEventListener('touchend', handleTouchEnd);
      joystick.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [onMove]);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-40 pointer-events-none">
      {/* Virtual Joystick */}
      <div className="pointer-events-auto">
        <div
          ref={joystickRef}
          className={`relative w-32 h-32 rounded-full battle-panel flex items-center justify-center transition-all ${
            joystickActive ? 'scale-110 battle-shadow-lg' : 'battle-shadow'
          }`}
        >
          <div className="absolute inset-4 rounded-full border-2 border-primary/30" />
          <div
            className={`absolute w-12 h-12 rounded-full bg-primary transition-all ${
              joystickActive ? 'scale-110' : ''
            }`}
            style={{
              transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`,
            }}
          />
          <span className="absolute text-xs font-bold text-muted-foreground uppercase tracking-wide">
            Move
          </span>
        </div>
      </div>

      {/* Fire Button */}
      <div className="pointer-events-auto">
        <Button
          size="lg"
          onClick={onShoot}
          className="w-24 h-24 rounded-full text-lg font-bold battle-shadow-lg"
        >
          <Crosshair className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
