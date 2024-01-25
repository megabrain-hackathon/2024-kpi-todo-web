import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './app/home';

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

export default AppRouter;
