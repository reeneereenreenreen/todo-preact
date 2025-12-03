import { render } from 'preact';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
// import { Button } from '@components/Button';
import { TodoList } from '@components/TodoList';

// import preactLogo from './assets/preact.svg';
import './settings.css';
import './reset.css';
import './style.css';

export function App() {
	return (
		<main class="main">
			<Header />
			<TodoList />


			{/* <a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a> */}

			{/* <div class="header">
				<h2 class="header__title">Name your list</h2>
			</div> */}

			{/* <Button
				label="Click me"
				onClick={() => console.log('clicked')}
				/>
			<Button
				label="Click me 2"
				onClick={() => console.log('clicked 2')}
				variant="secondary"
				/>
			<section>
				<Resource
					title="Learn Preact"
					description="If you're new to Preact, try the interactive tutorial to learn important concepts"
					href="https://preactjs.com/tutorial"
				/>
				<Resource
					title="Differences to React"
					description="If you're coming from React, you may want to check out our docs to see where Preact differs"
					href="https://preactjs.com/guide/v10/differences-to-react"
				/>
				<Resource
					title="Learn Vite"
					description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
					href="https://vitejs.dev"
				/>
			</section> */}

			<Footer />
		</main>
	);
}

// function Resource(props) {
// 	return (
// 		<a href={props.href} target="_blank" class="resource">
// 			<h2>{props.title}</h2>
// 			<p>{props.description}</p>
// 		</a>
// 	);
// }

render(<App />, document.getElementById('app'));
