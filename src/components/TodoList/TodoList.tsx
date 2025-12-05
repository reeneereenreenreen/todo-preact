import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { TodoForm } from '@components/TodoForm';
import { TodoSection } from '@components/TodoSection';
import './TodoList.css';
import { Dialog } from '../Dialog';
import { Button } from '@components/Button';
import { ColorPicker } from '../ColorPicker';
import { DarkmodeToggle } from '../DarkmodeToggle';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([{ id: crypto.randomUUID(), text, completed: false }, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const [title, setTitle] = useState(localStorage.getItem('todoListTitle') || 'My Todo List');

  const updateTodo = (id: string, text: string) => {
    if (!text.trim()) {
      deleteTodo(id);
      return;
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: text.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const activeTodos = todos.filter(t => !t.completed);
  const doneTodos = todos.filter(t => t.completed);

  // Separate dialog states
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setPreferencesDialogOpen] = useState(false);

  return (
    <div class="todo-list">
      <div class="todo-list__content">
        <h2
          class="todo-list__title"
          contentEditable
          onInput={e => {
            const value = (e.target as HTMLElement).innerText;
            localStorage.setItem('todoListTitle', value);
          }}
          onBlur={e => {
            const value = (e.target as HTMLElement).innerText;
            localStorage.setItem('todoListTitle', value);
          }}
        >
          {title}
        </h2>

        <TodoForm
          onAdd={addTodo}
          disabled={!!editingId}
          placeholder="A new todo..."
        />

        <TodoSection
          title={`Open`}
          count={activeTodos.length}
          todos={activeTodos}
          editingId={editingId}
          editText={editText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEditStart={startEdit}
          onUpdate={updateTodo}
          section="todo"
        />

        <TodoSection
          title={`Done`}
          count={doneTodos.length}
          todos={doneTodos}
          editingId={editingId}
          editText={editText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEditStart={startEdit}
          onUpdate={updateTodo}
          section="done"
        />
      </div>

      <div class="todo-list__footer">
        <Button
          icon="preferences"
          label="Preferences"
          variant="primary"
          appearance="ghost"
          onClick={() => setPreferencesDialogOpen(true)}
        />

        <Button
          icon="trash"
          label="Cleanup"
          variant="danger"
          appearance="ghost"
          onClick={() => setDeleteDialogOpen(true)}
        />
      </div>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete All Todos"
        icon="warning"
      >
        <Button
          icon="trash"
          label="Delete All Todos"
          variant="danger"
          appearance="solid"
          onClick={() => {
            setTodos([]);
            setEditingId(null);
            setEditText('');
            localStorage.removeItem('todos');
            localStorage.removeItem('todoListTitle');
            setTitle('Next Todo List');
            setDeleteDialogOpen(false);
          }}
        />
      </Dialog>

      <Dialog
        isOpen={isPreferencesDialogOpen}
        onClose={() => setPreferencesDialogOpen(false)}
        title="Preferences"
        icon="preferences"
      >
        <DarkmodeToggle />
        <ColorPicker />
      </Dialog>
    </div>
  );
};

export default TodoList;
