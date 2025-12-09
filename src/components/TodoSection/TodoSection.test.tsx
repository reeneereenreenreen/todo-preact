import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import TodoSection from './TodoSection';

describe('TodoSection', () => {
  const todos = [
    { id: '1', text: 'Test Todo 1', completed: false },
    { id: '2', text: 'Test Todo 2', completed: true },
  ];

  const defaultProps = {
    title: 'Todos',
    count: todos.length,
    todos,
    editingId: null,
    editText: '',
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEditStart: vi.fn(),
    onUpdate: vi.fn(),
    section: 'todo' as const,
  };

  it('renders the section title and badge', () => {
    render(<TodoSection {...defaultProps} />);
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText(String(todos.length))).toBeInTheDocument();
  });

  it('renders all todo items', () => {
    render(<TodoSection {...defaultProps} />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('calls onToggle when a todo item is toggled', () => {
    render(<TodoSection {...defaultProps} />);
    // Find the first TodoItem's toggle button (assuming it has a checkbox or button)
    const toggleButtons = screen.getAllByRole('checkbox');
    fireEvent.click(toggleButtons[0]);
    expect(defaultProps.onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when a todo item is deleted', () => {
    render(<TodoSection {...defaultProps} />);
    // Find the delete buttons (assuming they have aria-label or text "Delete")
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(defaultProps.onDelete).toHaveBeenCalledWith('1');
  });

  // it('calls onEditStart when edit is started', () => {
  //   render(<TodoSection {...defaultProps} />);
  //   // Find the edit buttons (assuming they have aria-label or text "Edit")
  //   const editButtons = screen.getAllByLabelText(/edit/i);
  //   fireEvent.click(editButtons[0]);
  //   expect(defaultProps.onEditStart).toHaveBeenCalledWith('1', 'Test Todo 1');
  // });
});