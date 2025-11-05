import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

// Router
import { router } from './routing/router.tsx';

// State
import { store } from './state/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
