import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import MotionSwitch from './MotionSwitch';

describe('MotionSwitch', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorage.clear();

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    document.documentElement.classList.remove('no-motion');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove('no-motion');
  });

  it('renders with default state (animations enabled)', () => {
    render(<MotionSwitch />);
    expect(screen.getByText('Disable animations')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles motion preference and updates localStorage', async () => {
    render(<MotionSwitch />);
    const checkbox = screen.getByRole('checkbox');
    expect(localStorage.getItem('noMotion')).toBe('false');
    fireEvent.click(checkbox);
    expect(localStorage.getItem('noMotion')).toBe('true');
    expect(screen.getByText('Enable animations')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('no-motion')).toBe(true);
    fireEvent.click(checkbox);
    expect(localStorage.getItem('noMotion')).toBe('false');
    expect(document.documentElement.classList.contains('no-motion')).toBe(
      false
    );
  });

  it('respects localStorage value on initial render', () => {
    localStorage.setItem('noMotion', 'true');
    render(<MotionSwitch />);
    expect(screen.getByText('Enable animations')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(document.documentElement.classList.contains('no-motion')).toBe(true);
  });

  // it('uses prefers-reduced-motion if localStorage is not set', () => {
  //   localStorage.clear();
  //   (window.matchMedia as any).mockImplementation((query: string) => ({
  //     matches: true,
  //     media: query,
  //     addEventListener: vi.fn(),
  //     removeEventListener: vi.fn(),
  //   }));
  //   render(<MotionSwitch />);
  //   expect(screen.getByText('Enable animations')).toBeInTheDocument();
  //   expect(screen.getByRole('checkbox')).toBeChecked();
  //   expect(document.documentElement.classList.contains('no-motion')).toBe(true);
  // });

  // it('updates state when prefers-reduced-motion changes and localStorage is not set', () => {
  //   let handler: ((e: any) => void) | undefined;
  //   (window.matchMedia as any).mockImplementation((query: string) => ({
  //     matches: false,
  //     media: query,
  //     addEventListener: (event: string, fn: (e: any) => void) => {
  //       if (event === 'change') handler = fn;
  //     },
  //     removeEventListener: vi.fn(),
  //   }));
  //   render(<MotionSwitch />);
  //   expect(screen.getByText('Disable animations')).toBeInTheDocument();
  //   // Simulate media query change
  //   handler && handler({ matches: true });
  //   expect(screen.getByText('Enable animations')).toBeInTheDocument();
  //   expect(document.documentElement.classList.contains('no-motion')).toBe(true);
  // });
});
