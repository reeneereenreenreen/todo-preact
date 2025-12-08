import { describe, it, expect, beforeEach, vi } from 'vitest';
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

  // it('deletes a todo', async () => {
  //   render(<TodoList />);
  //   const input = screen.getByPlaceholderText('A new todo...');
  //   fireEvent.input(input, { target: { value: 'Delete Me' } });
  //   fireEvent.submit(input.closest('form')!);
  //   const deleteBtn = screen.getByLabelText(/delete/i);
  //   fireEvent.click(deleteBtn);
  //   expect(screen.queryByText('Delete Me')).toBeNull();
  // });

  // it('opens and closes preferences dialog', () => {
  //   render(<TodoList />);
  //   const prefBtn = screen.getByLabelText('Preferences');
  //   fireEvent.click(prefBtn);
  //   expect(screen.getByText('Preferences')).toBeTruthy();
  //   const closeBtn = screen.getByLabelText('Abort');
  //   fireEvent.click(closeBtn);
  //   expect(screen.queryByText('Preferences')).toBeNull();
  // });

  // it('cleans up all todos via dialog', () => {
  //   render(<TodoList />);
  //   const input = screen.getByPlaceholderText('A new todo...');
  //   fireEvent.input(input, { target: { value: 'Cleanup Todo' } });
  //   fireEvent.submit(input.closest('form')!);
  //   const cleanupBtn = screen.getByLabelText('Cleanup');
  //   fireEvent.click(cleanupBtn);
  //   const deleteAllBtn = screen.getByLabelText('Delete All Todos');
  //   fireEvent.click(deleteAllBtn);
  //   expect(screen.queryByText('Cleanup Todo')).toBeNull();
  //   expect(localStorage.getItem('todos')).toBeNull();
  // });
});