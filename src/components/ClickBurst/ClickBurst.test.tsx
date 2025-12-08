import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/preact';
import { fireEvent } from '@testing-library/dom';
import ClickBurst from './ClickBurst';

describe('ClickBurst', () => {
  beforeEach(() => {
    // Clear DOM between tests
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders the burst container', () => {
    render(<ClickBurst />);
    expect(document.querySelector('.burst-container')).toBeTruthy();
  });

  it('creates a burst on document click', () => {
    render(<ClickBurst />);
    fireEvent.click(document, { clientX: 100, clientY: 200 });

    const burst = document.querySelector('.burst');
    expect(burst).toBeTruthy();
    expect((burst as HTMLElement).style.left).toBe('100px');
    expect((burst as HTMLElement).style.top).toBe('200px');
    expect((burst as HTMLElement).children.length).toBe(4);
  });

  it('removes burst after animation timeout', () => {
    vi.useFakeTimers();
    render(<ClickBurst />);

    fireEvent.click(document, { clientX: 50, clientY: 60 });
    expect(document.querySelector('.burst')).toBeTruthy();

    vi.advanceTimersByTime(700);
    expect(document.querySelector('.burst')).toBeFalsy();

    vi.useRealTimers();
  });

  it('creates a burst on touchstart', () => {
    render(<ClickBurst />);
    const touch = { clientX: 30, clientY: 40 };

    fireEvent.touchStart(document, {
      touches: [touch],
      preventDefault: vi.fn(),
    });

    const burst = document.querySelector('.burst');
    expect(burst).toBeTruthy();
    expect((burst as HTMLElement).style.left).toBe('30px');
    expect((burst as HTMLElement).style.top).toBe('40px');
  });
});
