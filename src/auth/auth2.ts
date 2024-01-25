import { toast } from 'react-toastify';
import { supabase } from './supabase';

export const googleLogin = async () => {
	await supabase.auth
		.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})
		.catch((error) => {
			toast.error(error.error_description || error.message);
		});
};
