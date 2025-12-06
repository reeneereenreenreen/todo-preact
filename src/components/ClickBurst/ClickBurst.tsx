// src/components/Clickburst.tsx
import { FunctionComponent } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './ClickBurst.css';

interface ClickBurstProps {}

const ClickBurst: FunctionComponent<ClickBurstProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createBurst = (x: number, y: number) => {
      const burst = document.createElement('div');
      burst.className = 'burst';
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;

      // Create 4 comic particles
      for (let i = 0; i < 4; i++) {
        const particle = document.createElement('span');
        const angle = (i * 90) * (Math.PI / 180);
        const velocity = 120 + Math.random() * 60;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.style.setProperty('--vx', vx.toString());
        particle.style.setProperty('--vy', vy.toString());
        burst.appendChild(particle);
      }

      container.appendChild(burst);

      // Auto-remove after animation
      setTimeout(() => {
        if (burst.parentNode) {
          burst.parentNode.removeChild(burst);
        }
      }, 700);
    };

    const handleClick = (e: MouseEvent) => {
      // e.preventDefault();
      createBurst(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      createBurst(touch.clientX, touch.clientY);
    }, { passive: false });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleClick as any);
    };
  }, []);

  return <div ref={containerRef} className="burst-container" />;
};

export default ClickBurst;
