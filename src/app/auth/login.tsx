import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../auth/supabase';
import { useAuthSession } from '../../state/auth';

function Login() {
	const { session, setSession } = useAuthSession();

	if (!session) {
		return (
			<div
				style={{
					width: '100vw',
					height: '100vh',
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
			<button
				onClick={() =>
					supabase.auth.signOut().then(() => setSession(undefined))
				}
			>
				Sign out
			</button>
		</div>
	);
}

export default Login;
