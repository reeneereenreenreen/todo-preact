import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import ColorPicker from './ColorPicker';

const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

describe('ColorPicker', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.setProperty('--color-primary', '');
  });

  it('renders with default colors and title', () => {
    render(<ColorPicker />);
    expect(screen.getByText('Primary Color')).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(6);
  });

  it('renders with custom colors', () => {
    render(<ColorPicker colors={COLORS} />);
    expect(screen.getAllByRole('button')).toHaveLength(COLORS.length);
  });

  it('selects initialColor if provided', () => {
    render(<ColorPicker colors={COLORS} initialColor={COLORS[2]} />);
    const selectedBtn = screen.getAllByRole('button')[2];
    expect(selectedBtn.className).toContain('is-selected');
    expect(
      document.documentElement.style.getPropertyValue('--color-primary')
    ).toBe(COLORS[2]);
  });

  it('selects color on click and updates localStorage', () => {
    render(<ColorPicker colors={COLORS} />);
    const btn = screen.getAllByRole('button')[1];
    fireEvent.click(btn);
    expect(btn.className).toContain('is-selected');
    expect(localStorage.getItem('color-picker-selected-color')).toBe(COLORS[1]);
    expect(
      document.documentElement.style.getPropertyValue('--color-primary')
    ).toBe(COLORS[1]);
  });

  it('loads color from localStorage if valid', () => {
    localStorage.setItem('color-picker-selected-color', COLORS[1]);
    render(<ColorPicker colors={COLORS} />);
    const selectedBtn = screen.getAllByRole('button')[1];
    expect(selectedBtn.className).toContain('is-selected');
  });

  it('ignores localStorage color if not in colors', () => {
    localStorage.setItem('color-picker-selected-color', '#unknown');
    render(<ColorPicker colors={COLORS} initialColor={COLORS[0]} />);
    const selectedBtn = screen.getAllByRole('button')[0];
    expect(selectedBtn.className).toContain('is-selected');
  });
});
