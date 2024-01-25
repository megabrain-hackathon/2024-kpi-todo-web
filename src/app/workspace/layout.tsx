import React, { useEffect } from 'react';

import { Outlet, redirect } from 'react-router-dom';
import { useAuthSession } from '../../state/auth';

export default function WorkspaceLayout() {
	const { session } = useAuthSession();
	useEffect(() => {
		if (!session) {
			redirect('/');
		}
	}, [session]);
	return <Outlet />;
}
