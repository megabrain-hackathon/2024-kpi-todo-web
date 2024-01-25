import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './app/home';
import Login from './app/auth/login';
import Layout from './layout';

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

export default AppRouter;
