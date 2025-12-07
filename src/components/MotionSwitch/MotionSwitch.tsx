import { useState, useEffect, useCallback } from 'preact/hooks';
import { FunctionComponent } from 'preact';
import './MotionSwitch.css';

interface MotionSwitchProps {}

const LOCAL_STORAGE_KEY = 'noMotion';

const MotionSwitch: FunctionComponent<MotionSwitchProps> = () => {
  const [noMotion, setNoMotion] = useState<boolean>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(noMotion));
    if (noMotion) {
      document.documentElement.classList.add('no-motion');
    } else {
      document.documentElement.classList.remove('no-motion');
    }
  }, [noMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      // Only update if not overridden by localStorage
      if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
        setNoMotion(event.matches);
      }
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleMotion = useCallback(() => {
    setNoMotion((prev) => !prev);
  }, []);

  return (
    <div class="motion-switch">
      <h3 class="motion-switch__title">Motion Preferences</h3>
      <div class="field field--switch">
        <input
          type="checkbox"
          id="motion-switch"
          class="field__control"
          checked={!noMotion}
          onChange={toggleMotion}
          />
        <label class="field__label" for="motion-switch">
          <span class="field__indicator"></span>
            {noMotion ? 'Enable animations' : 'Disable animations'}
        </label>
      </div>
    </div>
  );
};

export default MotionSwitch;