import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import TodoList from './TodoList';

describe('TodoList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the default title', () => {
    render(<TodoList />);
    expect(screen.getByText('My Todo List')).toBeTruthy();
  });

  it('adds a new todo', async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('A new todo...');
    fireEvent.input(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText('Test Todo')).toBeTruthy();
  });

  it('toggles a todo as completed', async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('A new todo...');
    fireEvent.input(input, { target: { value: 'Toggle Todo' } });
    fireEvent.submit(input.closest('form')!);
    const toggleBtn = screen.getByLabelText(/toggle/i);
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Toggle Todo')).toBeTruthy();
    expect(screen.getByText('Done')).toBeTruthy();
  });
});
