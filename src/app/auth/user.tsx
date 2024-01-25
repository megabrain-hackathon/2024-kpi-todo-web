import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { redirect } from 'react-router-dom';
import { supabase } from '../../auth/supabase';
import { useAuthSession } from '../../state/auth';

export default function UserEdit() {
	const { session, setSession } = useAuthSession();
	useEffect(() => {
		if (!session) {
			redirect('/');
		}
	}, [session]);
	return (
		<>
			<Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
				{session?.user.user_metadata.name}님의 정보
			</Typography>
			<Typography variant="h5" component="h3" sx={{ flexGrow: 1 }}>
				{session?.user.email}
			</Typography>

			<Button
				variant="contained"
				sx={{ mt: 2 }}
				onClick={() =>
					supabase.auth.signOut().then(() => {
						setSession(undefined);
						redirect('/');
					})
				}
			>
				Logout
			</Button>
		</>
	);
}
