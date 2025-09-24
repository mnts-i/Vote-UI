
// Tailwind + Daisy UI
import './assets/tailwind.css';

// Application CSS
import './assets/app.scss';

// Components
import { Login } from './components/Login';

export const Root = () => {
	return (
		<>
			<Login />
		</>
	);
};