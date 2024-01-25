import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Button from '@mui/material/Button';
import { supabase } from '../../auth/supabase';
import { useAuthSession } from '../../state/auth';

function Login() {
	const { session, setSession } = useAuthSession();

	if (!session) {
		return (
			<div
				style={{
					width: '100%',
					height: 'calc(100vh - 64px)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						providers={['google']}
					/>
				</div>
			</div>
		);
	}
	return (
		<div>
			<div>Logged in!</div>
			<Button
				onClick={() =>
					supabase.auth.signOut().then(() => setSession(undefined))
				}
			>
				Sign out
			</Button>
		</div>
	);
}

export default Login;
