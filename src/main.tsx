import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import { Root } from './Root.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Root />
	</StrictMode>,
);
