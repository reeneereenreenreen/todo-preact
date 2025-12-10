import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { TodoForm } from '../TodoForm';
import { TodoSection } from '../TodoSection';
import './TodoList.css';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { ColorPicker } from '../ColorPicker';
import { DarkmodeToggle } from '../DarkmodeToggle';
import { MotionSwitch } from '../MotionSwitch';
import { Icon } from '../Icon';

interface Todo {
  id: string;
  text: string;
  description?: string;
  date?: string;
  completed: boolean;
}

const defaultProfiles = [
  { id: 'default', name: 'Default' },
  { id: 'work', name: 'Work' },
  { id: 'personal', name: 'Personal' },
];

const TodoList: FunctionComponent = () => {
  // Load selected profile from localStorage if available
  const [profile, setProfile] = useState<string>(() => {
    return localStorage.getItem('selectedProfile') || 'default';
  });
  const [profiles] = useState<{ id: string; name: string }[]>(defaultProfiles);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Load todos for the selected profile
  useEffect(() => {
    const key = `todos_${profile}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTodos(
          parsed.map((todo: any) => ({
            ...todo,
            description:
              typeof todo.description === 'string' ? todo.description : '',
            date: typeof todo.date === 'string' ? todo.date : '',
          }))
        );
      } catch {
        setTodos([]);
      }
    } else {
      setTodos([]);
    }
  }, [profile]);

  // Save todos for the selected profile
  useEffect(() => {
    const key = `todos_${profile}`;
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos, profile]);

  const addTodo = (text: string, description?: string, date?: string) => {
    setTodos([
      { id: crypto.randomUUID(), text, description, date, completed: false },
      ...todos,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const [title, setTitle] = useState('My Todo List');

  // Load title for the selected profile
  useEffect(() => {
    const key = `todoListTitle_${profile}`;
    setTitle(localStorage.getItem(key) || 'My Todo List');
  }, [profile]);

  const updateTodo = (id: string, text: string) => {
    if (!text.trim()) {
      deleteTodo(id);
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const doneTodos = todos.filter((t) => t.completed);

  // Separate dialog states
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setPreferencesDialogOpen] = useState(false);

  return (
    <div class="todo-list">
      <div class="todo-list__header">
        <div class="field field--select">
          <label htmlFor="profile-select" class="field__label sr-only">
            Profile:
          </label>
          <select
            id="profile-select"
            class="field__control"
            value={profile}
            onChange={(e) => {
              const selectedProfile = (e.target as HTMLSelectElement).value;
              setProfile(selectedProfile);
              localStorage.setItem('selectedProfile', selectedProfile);
            }}
          >
            {profiles.map((p) => {
              // Get open todos for each profile
              let openCount = 0;
              try {
                const saved = localStorage.getItem(`todos_${p.id}`);
                if (saved) {
                  const parsed = JSON.parse(saved);
                  openCount = Array.isArray(parsed)
                    ? parsed.filter((t: any) => !t.completed).length
                    : 0;
                }
              } catch {}
              return (
                <option key={p.id} value={p.id}>
                  <span class="badge">
                    <span class="sr-only">(</span>
                    {openCount}
                    <span class="sr-only">)</span>
                  </span>
                  &nbsp;{p.name}
                </option>
              );
            })}
          </select>
          <Icon name="chevron-down" />
        </div>

        <h2
          class="todo-list__title"
          contentEditable
          onInput={(e) => {
            const value = (e.target as HTMLElement).innerText;
            setTitle(value);
            localStorage.setItem(`todoListTitle_${profile}`, value);
          }}
          onBlur={(e) => {
            const value = (e.target as HTMLElement).innerText;
            setTitle(value);
            localStorage.setItem(`todoListTitle_${profile}`, value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLElement).blur();
            }
          }}
        >
          {title}
        </h2>
      </div>
      <div class="todo-list__content">
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
        <Button
          icon="close"
          label="Abort"
          variant="primary"
          appearance="ghost"
          onClick={() => setDeleteDialogOpen(false)}
        />
      </Dialog>

      <Dialog
        isOpen={isPreferencesDialogOpen}
        onClose={() => setPreferencesDialogOpen(false)}
        title="Preferences"
        icon="preferences"
      >
        <DarkmodeToggle />
        <MotionSwitch />
        <ColorPicker />
      </Dialog>
    </div>
  );
};

export default TodoList;
