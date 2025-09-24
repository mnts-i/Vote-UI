
// Tailwind + Daisy UI
import './assets/tailwind.css';

// Application CSS
import './assets/app.scss';

// Components
import { Login } from './components/Login';

export const Root = () => {
	return (
		<div className="flex flex-col w-[100dvw] h-[100dvh] bg-base-200/10 relative">
			<Login />
		</div>
	);
};