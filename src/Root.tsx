import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

// Tailwind + Daisy UI
import './assets/tailwind.css';

// Application CSS
import './assets/app.scss';

// Components
import { Background } from './components/Background';
import { glassStyles } from './shared';

export const Root = () => {
	return (
		<div className="flex flex-col w-[100dvw] h-[100dvh] overflow-hidden relative">
			<div className="fixed w-[100dvw] h-[100dvh]">
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