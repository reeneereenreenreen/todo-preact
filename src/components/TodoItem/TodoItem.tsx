import { FunctionComponent } from 'preact';
import './TodoItem.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface Todo {
  id: string;
  text: string;
  description?: string;
  date?: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  editingId: string | null;
  editText: string;
  onToggle: () => void;
  onDelete: () => void;
  onEditStart: () => void;
  onUpdate: (text: string, description?: string, date?: string) => void;
  section: 'todo' | 'done';
}

const TodoItem: FunctionComponent<Props> = ({
  todo,
  editingId,
  editText,
  onToggle,
  onDelete,
  onEditStart,
  onUpdate,
  section,
}) => {
  const isEditing = editingId === todo.id;

  return (
    <li class="todo-item">
      <div class="field field--checkbox">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onClick={onToggle}
          disabled={isEditing}
          class="field__control"
        />
        <label for={`todo-${todo.id}`} class="field__label">
          <span class="field__icon">
            <Icon name="check" />
          </span>
          <span class="sr-only">
            {section === 'done' ? `Undone: ${todo.text}` : `Done: ${todo.text}`}
          </span>
        </label>
      </div>
      <div class="todo-item__content">
        {todo.date &&
          (() => {
            const today = new Date();
            let dateClass = '';
            try {
              const todoDate = new Date(todo.date);
              todoDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);
              const diff =
                (todoDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
              if (diff < 0) {
                dateClass = 'todo-item__date--past';
              } else if (diff <= 2) {
                dateClass = 'todo-item__date--soon';
              }
            } catch {}
            return (
              <span class={`todo-item__date ${dateClass}`}>{todo.date}</span>
            );
          })()}
        <span
          class={`todo-item__text ${todo.completed ? 'completed' : ''}`}
          contentEditable
          autoFocus={isEditing}
          onBlur={(e: any) =>
            onUpdate(e.target.innerText, todo.description, todo.date)
          }
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onUpdate(e.target.innerText, todo.description, todo.date);
              (e.target as HTMLElement).blur();
            }
            if (e.key === 'Escape') {
              onEditStart();
            }
          }}
        >
          {isEditing ? editText : todo.text}
        </span>
        {todo.description && (
          <span
            class="todo-item__description"
            contentEditable
            onBlur={(e: any) =>
              onUpdate(todo.text, e.target.innerText, todo.date)
            }
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onUpdate(todo.text, e.target.innerText, todo.date);
                (e.target as HTMLElement).blur();
              }
              if (e.key === 'Escape') {
                onEditStart();
              }
            }}
          >
            {todo.description}
          </span>
        )}
      </div>
      <Button
        icon="trash"
        ariaLabel="Delete todo"
        onClick={onDelete}
        variant="danger"
        appearance="ghost"
      />
    </li>
  );
};

export default TodoItem;
