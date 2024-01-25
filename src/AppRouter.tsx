import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Workspace from './app/workspace/home';
import Login from './app/auth/login';
import Layout from './layout';
import LandingHome from './app/home';
import WorkspaceList from './app/workspace/list';
import UserEdit from './app/auth/user';
import WorkspaceLayout from './app/workspace/layout';
import WorkspaceEdit from './app/workspace/home/edit';

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <LandingHome />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'workspace',
				element: <WorkspaceLayout />,
				children: [
					{
						index: true,
						element: <WorkspaceList />,
					},
					{
						path: ':id',
						element: <Workspace />,
					},
					{
						path: ':id/edit',
						element: <WorkspaceEdit />,
					},
				],
			},
			{
				path: 'user',
				element: <UserEdit />,
			},
		],
	},
]);

export default AppRouter;
