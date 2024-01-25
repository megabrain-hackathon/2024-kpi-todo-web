import React, { useEffect } from 'react';
import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Link as MUILink,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { supabase } from '../auth/supabase';
import { useAuthSession } from '../state/auth';

function Layout() {
	const { setSession } = useAuthSession();
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session) setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);

	return (
		<>
			<AppBar position="static" elevation={0}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Menu />
					</IconButton>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" style={{ textDecoration: 'none' }}>
							KPI TODO
						</Link>
					</Typography>
					<Link to="/login">
						<Button color="inherit">Login</Button>
					</Link>
				</Toolbar>
			</AppBar>
			<main style={{ height: 'calc(100vh-64px)' }}>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
