import { useEffect } from 'react';

export interface KeyboardShortcutHandlers {
  onHelp?: () => void;
  onSkip?: () => void;
  onRetry?: () => void;
  onDashboard?: () => void;
  onSubmit?: () => void;
}

/**
 * Hook to handle keyboard shortcuts for the game
 * 
 * Shortcuts:
 * - H: Request help
 * - S: Skip problem
 * - R: Retry question
 * - D: Toggle dashboard
 * - Enter: Submit answer (when input is not focused)
 */
export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Don't trigger if modifier keys are pressed (except Shift for capital letters)
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        case 'h':
          event.preventDefault();
          handlers.onHelp?.();
          break;
        case 's':
          event.preventDefault();
          handlers.onSkip?.();
          break;
        case 'r':
          event.preventDefault();
          handlers.onRetry?.();
          break;
        case 'd':
          event.preventDefault();
          handlers.onDashboard?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlers, enabled]);
}
