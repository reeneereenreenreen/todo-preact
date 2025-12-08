import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/preact';
import TodoItem from './TodoItem';

const todo = {
  id: '1',
  text: 'Test Todo',
  completed: false,
};

describe('TodoItem', () => {
  const defaultProps = {
    todo,
    editingId: null,
    editText: '',
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEditStart: vi.fn(),
    onUpdate: vi.fn(),
    section: 'todo' as const,
  };

  it('renders todo text', () => {
    const { getByText } = render(<TodoItem {...defaultProps} />);
    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const { getByRole } = render(<TodoItem {...defaultProps} />);
    fireEvent.click(getByRole('checkbox'));
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', () => {
    const { getByLabelText } = render(<TodoItem {...defaultProps} />);
    fireEvent.click(getByLabelText('Delete todo'));
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  it('shows editText when editing', () => {
    const props = { ...defaultProps, editingId: '1', editText: 'Editing...' };
    const { getByText } = render(<TodoItem {...props} />);
    expect(getByText('Editing...')).toBeTruthy();
  });

  it('calls onUpdate on blur', () => {
    const props = { ...defaultProps, editingId: '1', editText: 'Editing...' };
    const { getByText } = render(<TodoItem {...props} />);
    fireEvent.blur(getByText('Editing...'), { target: { innerText: 'Updated' } });
    expect(props.onUpdate).toHaveBeenCalledWith('Updated');
  });

  it('calls onUpdate on Enter key', () => {
    const props = { ...defaultProps, editingId: '1', editText: 'Editing...' };
    const { getByText } = render(<TodoItem {...props} />);
    fireEvent.keyDown(getByText('Editing...'), { key: 'Enter', target: { innerText: 'Updated' } });
    expect(props.onUpdate).toHaveBeenCalledWith('Updated');
  });

  it('calls onEditStart on Escape key', () => {
    const props = { ...defaultProps, editingId: '1', editText: 'Editing...' };
    const { getByText } = render(<TodoItem {...props} />);
    fireEvent.keyDown(getByText('Editing...'), { key: 'Escape' });
    expect(props.onEditStart).toHaveBeenCalled();
  });

  it('checkbox is disabled when editing', () => {
    const props = { ...defaultProps, editingId: '1' };
    const { getByRole } = render(<TodoItem {...props} />);
    expect(getByRole('checkbox')).toBeDisabled();
  });

  it('shows completed class when todo is completed', () => {
    const props = { ...defaultProps, todo: { ...todo, completed: true } };
    const { container } = render(<TodoItem {...props} />);
    expect(container.querySelector('.completed')).toBeTruthy();
  });

  it('renders correct sr-only text for section', () => {
    const props = { ...defaultProps, section: 'done' };
    const { getByText } = render(<TodoItem {...props} />);
    expect(getByText(`Undone: ${todo.text}`)).toBeTruthy();
  });
});