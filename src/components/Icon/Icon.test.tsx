import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import Icon from './Icon';

describe('Icon', () => {
  it('renders the trash icon', () => {
    const { container } = render(<Icon name="trash" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-trash')).toBeTruthy();
  });

  it('renders the check icon with custom size', () => {
    const { container } = render(<Icon name="check" size="lg" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-check')).toBeTruthy();
    expect(container.querySelector('.icon-lg')).toBeTruthy();
  });

  it('renders the plus icon', () => {
    const { container } = render(<Icon name="plus" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-plus')).toBeTruthy();
  });

  it('renders the chevron-down icon', () => {
    const { container } = render(<Icon name="chevron-down" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-chevron-down')).toBeTruthy();
  });

  it('renders the dots-vertical icon', () => {
    const { container } = render(<Icon name="dots-vertical" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-dots-vertical')).toBeTruthy();
  });

  it('renders the sun icon', () => {
    const { container } = render(<Icon name="sun" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-sun')).toBeTruthy();
  });

  it('renders the moon icon', () => {
    const { container } = render(<Icon name="moon" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-moon')).toBeTruthy();
  });

  it('renders the enter icon', () => {
    const { container } = render(<Icon name="enter" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-enter')).toBeTruthy();
  });

  it('renders the computer icon', () => {
    const { container } = render(<Icon name="computer" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-computer')).toBeTruthy();
  });

  it('renders the preferences icon', () => {
    const { container } = render(<Icon name="preferences" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-preferences')).toBeTruthy();
  });

  it('renders the warning icon', () => {
    const { container } = render(<Icon name="warning" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-warning')).toBeTruthy();
  });

  it('renders the close icon', () => {
    const { container } = render(<Icon name="close" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.icon-close')).toBeTruthy();
  });

  it('renders fallback for unknown icon name', () => {
    const { container, getByTitle } = render(<Icon name="unknown" />);
    expect(container.querySelector('svg')).toBeFalsy();
    expect(container.querySelector('.icon-unknown')).toBeTruthy();
    expect(getByTitle('Icon unknown not found')).toBeTruthy();
  });
});
