import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { useAuthSession } from '../../state/auth';

export default function LandingHome() {
	const { session } = useAuthSession();
	useEffect(() => {
		if (session) {
			redirect('/workspace');
		}
	}, [session]);
	return <Container maxWidth="md">{process.env.PUBLIC_URL}</Container>;
}
