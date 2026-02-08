import { Button } from '@/components/ui/button';
import { Play, Info, Target } from 'lucide-react';
import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [showPublishInfo, setShowPublishInfo] = useState(false);

  return (
    <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center p-6 z-50 overflow-y-auto">
      <div className="text-center space-y-6 max-w-sm w-full my-auto">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="w-28 h-28 bg-primary rounded-3xl flex items-center justify-center battle-shadow relative overflow-hidden">
            <div className="absolute inset-0 battle-glow opacity-30" />
            <Target className="w-16 h-16 text-primary-foreground relative z-10" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Skylance Royale
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Battle bots in the arena and survive to win!
          </p>
        </div>

        {/* Instructions */}
        <div className="battle-panel rounded-xl p-5 space-y-3 text-sm text-card-foreground">
          <p className="font-bold text-primary flex items-center justify-center gap-2">
            <Target className="w-4 h-4" />
            How to Play:
          </p>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Use the <strong>joystick</strong> to move your hero</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Tap <strong>FIRE</strong> button to shoot at enemies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Eliminate <strong>20 bots</strong> to win the match</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Avoid enemy fire and keep your health above zero</span>
            </li>
          </ul>
        </div>

        {/* Start button */}
        <Button
          size="lg"
          onClick={onStart}
          className="w-full text-lg h-14 shadow-lg font-bold"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Battle
        </Button>

        {/* Publish on Google Play Info */}
        <div className="battle-panel rounded-xl p-4 space-y-3 text-sm text-card-foreground">
          <button
            onClick={() => setShowPublishInfo(!showPublishInfo)}
            className="flex items-center justify-between w-full text-left font-bold hover:text-primary transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Publish on Google Play
            </span>
            <span className="text-muted-foreground text-lg">{showPublishInfo ? '−' : '+'}</span>
          </button>
          
          {showPublishInfo && (
            <div className="space-y-3 text-muted-foreground text-left pt-2">
              <div className="space-y-2">
                <p className="font-bold text-foreground">Two Ways to Install:</p>
                <ol className="space-y-2 pl-4">
                  <li><strong>1. Browser Install (PWA):</strong> Open this game in Chrome/Edge, tap the menu, and select "Add to Home Screen" or "Install app".</li>
                  <li><strong>2. Google Play Store:</strong> Package this web app as an Android app and publish it to the Play Store.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-foreground">Publishing Steps:</p>
                <ol className="space-y-1 pl-4 list-decimal text-xs">
                  <li>Create a Google Play Console developer account</li>
                  <li>Use a Trusted Web Activity (TWA) wrapper to package this PWA</li>
                  <li>Generate an Android App Bundle (AAB) file</li>
                  <li>Sign the AAB with your keystore</li>
                  <li>Upload to Play Console with required assets (icons, screenshots, feature graphic)</li>
                  <li>Complete store listing and submit for review</li>
                </ol>
              </div>

              <p className="text-xs">
                For detailed instructions, see <code className="bg-muted px-1 py-0.5 rounded text-[10px]">docs/PLAY_STORE_PUBLISHING.md</code> in the project repository.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
