import { FunctionComponent } from 'preact';
import './TodoItem.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  editingId: string | null;
  editText: string;
  onToggle: () => void;
  onDelete: () => void;
  onEditStart: () => void;
  onUpdate: (text: string) => void;
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
      <span
        class={`todo-item__text ${todo.completed ? 'completed' : ''}`}
        contentEditable
        autoFocus={isEditing}
        onBlur={(e: any) => onUpdate(e.target.innerText)}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onUpdate(e.target.innerText);
            (e.target as HTMLElement).blur();
          }
          if (e.key === 'Escape') {
            onEditStart();
          }
        }}
      >
        {isEditing ? editText : todo.text}
      </span>
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
