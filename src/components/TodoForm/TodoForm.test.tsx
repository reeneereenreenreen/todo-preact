import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('renders input and button', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('Add new todo...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to todo list/i })).toBeInTheDocument();
  });

  it('calls onAdd with input value and clears input', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText('Add new todo...');
    const button = screen.getByRole('button', { name: /add to todo list/i });

    fireEvent.input(input, { target: { value: 'Test todo' } });
    fireEvent.submit(input.closest('form')!);

    expect(onAdd).toHaveBeenCalledWith('Test todo');
    expect(input).toHaveValue('');
  });

  it('does not call onAdd if input is empty or whitespace', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText('Add new todo...');
    fireEvent.input(input, { target: { value: '   ' } });
    fireEvent.submit(input.closest('form')!);
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('disables input and button when disabled prop is true', () => {
    render(<TodoForm onAdd={vi.fn()} disabled />);
    const input = screen.getByPlaceholderText('Add new todo...');
    const button = screen.getByRole('button', { name: /add to todo list/i });
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('uses custom placeholder if provided', () => {
    render(<TodoForm onAdd={vi.fn()} placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('button is disabled when input is empty', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    const button = screen.getByRole('button', { name: /add to todo list/i });
    expect(button).toBeDisabled();
  });

  it('button is enabled when input is not empty', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    const input = screen.getByPlaceholderText('Add new todo...');
    const button = screen.getByRole('button', { name: /add to todo list/i });
    fireEvent.input(input, { target: { value: 'Something' } });
    expect(button).not.toBeDisabled();
  });
});