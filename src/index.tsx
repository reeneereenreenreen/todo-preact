import { render } from 'preact';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ClickBurst } from './components/ClickBurst';
import './settings.css';
import './reset.css';
import './font.css';
import './style.css';

export function App() {
  return (
    <main class="main">
      <ClickBurst />
      <Header />
      <TodoList />
    </main>
  );
}

render(<App />, document.getElementById('app'));
