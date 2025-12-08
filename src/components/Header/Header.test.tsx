import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import Header from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toBeTruthy();
  });

  it('has the correct class name', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')?.className).toBe('header');
  });

  it('renders the Logo component', () => {
    const { container } = render(<Header />);
    // Assuming Logo renders an element with class 'logo'
    expect(container.querySelector('.logo')).toBeTruthy();
  });
});