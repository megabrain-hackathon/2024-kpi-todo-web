import React, { useEffect } from 'react';
import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Link as MUILink,
	Container,
} from '@mui/material';
import { Link, Outlet, redirect } from 'react-router-dom';
import { Home, Menu } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { supabase } from '../auth/supabase';
import { useAuthSession } from '../state/auth';
import { useWorkspace } from '../state/workspace';
import { WorkspaceType } from '../type/workspace';

function Layout() {
	const { session, setSession } = useAuthSession();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				setSession(session);
				redirect('/workspace');
			} else {
				redirect('/');
			}
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				setSession(session);
				redirect('/workspace');
			} else {
				redirect('/');
			}
		});
		return () => subscription.unsubscribe();
	}, []);

	return (
		<>
			<AppBar position="static" elevation={0}>
				<Toolbar>
					<Link to={session ? '/workspace' : '/'}>
						<Button
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							startIcon={<Home />}
						>
							KPI TODO
						</Button>
					</Link>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" style={{ textDecoration: 'none' }} />
					</Typography>
					{session ? (
						<Link to="/user">
							<Button color="inherit" variant="outlined">
								{session.user.user_metadata.name}
							</Button>
						</Link>
					) : (
						<Link to="/login">
							<Button color="inherit" variant="outlined">
								Login
							</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
			<main style={{ height: 'calc(100vh-64px)' }}>
				<Container maxWidth="md">
					<Outlet />
				</Container>
			</main>
		</>
	);
}

export default Layout;
