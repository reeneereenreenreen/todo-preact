import { render } from 'preact';
import { Header } from '@components/Header';
// import { Footer } from '@components/Footer';
// import { Button } from '@components/Button';
import { TodoList } from '@components/TodoList';
import { ClickBurst } from './components/ClickBurst';

// import preactLogo from './assets/preact.svg';
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
			{/* <Footer /> */}
		</main>
	);
}

render(<App />, document.getElementById('app'));
