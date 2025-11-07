import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

// Tailwind + Daisy UI
import './assets/tailwind.css';

// React-responsive-modal CSS
import 'react-responsive-modal/styles.css';

// Application CSS
import './assets/app.scss';

// Hooks
import { useSocket } from './com/useSocket';

// Components
import { Background } from './components/Background';
import { glassStyles } from './shared';

export const Root = () => {
	useSocket();

	return (
		<div className="flex flex-col w-[100dvw] h-[100dvh] overflow-x-hidden relative z-30">
			<div className="fixed w-[100dvw] h-[100dvh] -z-10">
				<Background
					particleCount={400}
					particleBaseSize={200}
					alphaParticles
				/>
			</div>

			<Outlet />

			<Toaster
				toastOptions={{
					duration: 2000,
					style: {
						...glassStyles,
						paddingLeft: 15,
						paddingRight: 15,
						borderRadius: '100px',
						color: '#fff',
					}
				}}
			/>
		</div>
	);
};