import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@mui/material';
import { Add, PlusOne } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Link, redirect } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useWorkspace } from '../../../state/workspace';
import { useAuthSession } from '../../../state/auth';
import { supabase } from '../../../auth/supabase';
import { WorkspaceType } from '../../../type/workspace';
import NewWorkspaceDialogContent from '../new';

export default function WorkspaceList() {
	const { workspaces, setWorkspaces } = useWorkspace();
	const { session } = useAuthSession();
	const [openNewWorkspace, setOpenNewWorkspace] = useState(false);

	const callWorkspaces = async () => {
		if (!session) return;
		const workspaces: any[] = [];
		await supabase
			.from('workspace')
			.select('*')
			.eq('admin_id', session.user.id)
			.then(({ data, error }) => {
				if (data) workspaces.push(...data);
				if (error) toast.error(error.message);
			});
		await supabase
			.from('workspace_user')
			.select('*')
			.eq('user_id', session.user.id)
			.then(async ({ data, error }) => {
				if (data)
					await supabase
						.from('workspace')
						.select('*')
						.in(
							'id',
							data.map((d) => d.workspace_id),
						)
						.then(({ data, error }) => {
							if (data) workspaces.push(...data);
							if (error) toast.error(error.message);
						});
				if (error) toast.error(error.message);
			});
		if (workspaces.length > 0) {
			const uniqueWorkspaces = workspaces.reduce((acc, cur) => {
				const isExist = acc.find((a: { id: any }) => a.id === cur.id);
				if (!isExist) acc.push(cur);
				return acc;
			}, [] as any[]);
			setWorkspaces(uniqueWorkspaces as WorkspaceType[]);
		} else {
			toast('You have no workspace yet, please create one.');
			redirect('/workspace/new');
		}
	};

	useEffect(() => {
		if (!session) return;
		callWorkspaces();
	}, [session]);

	return (
		<>
			<Typography variant="h2" component="h1" sx={{ pb: 1 }}>
				WORKSPACE
			</Typography>
			<Grid container spacing={1} alignItems="stretch">
				{workspaces.map((workspace) => {
					return (
						<Grid item xs={12} md={6} lg={4}>
							<Link to={`/workspace/${workspace.id}`} key={workspace.id}>
								<Card>
									<CardContent>
										<Typography variant="h5" component="div">
											{workspace.title}
										</Typography>
										<Typography variant="body2">
											{workspace.description}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					);
				})}
				<Grid item xs={12} md={6} lg={4}>
					<Button onClick={() => setOpenNewWorkspace(true)}>
						<Card>
							<CardContent>
								<Typography variant="body2">
									<Add fontSize="large" /> Create new workspace
								</Typography>
							</CardContent>
						</Card>
					</Button>
				</Grid>
			</Grid>
			<Dialog
				open={openNewWorkspace}
				onClose={() => setOpenNewWorkspace(false)}
				PaperProps={{ style: { width: '700px' } }}
			>
				<DialogContent>
					<NewWorkspaceDialogContent
						onClose={() => setOpenNewWorkspace(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
