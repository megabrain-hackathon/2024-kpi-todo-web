import React, { useEffect } from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Edit } from '@mui/icons-material';
import MajorKPI from './kpi/major';
import TodoList from './todo/todo-list';
import { supabase } from '../../../auth/supabase';
import { WorkspaceType } from '../../../type/workspace';

function Home() {
	const params = useParams();
	const [workspace, setWorkspace] = React.useState<WorkspaceType>();
	useEffect(() => {
		const fetch = async () => {
			await supabase
				.from('workspace')
				.select('*')
				.eq('id', params.id)
				.then(({ data, error }) => {
					if (error) toast.error(error.message);
					if (data) setWorkspace(data[0]);
				});
		};
		fetch();
	}, [params.id]);
	return (
		<div>
			<Container
				maxWidth="lg"
				sx={{ background: '#FFFFFF', minHeight: 'calc(100vh - 64px)' }}
			>
				<Typography
					variant="h2"
					component="h4"
					sx={{ flexGrow: 1, fontSize: '40px', mb: 1 }}
				>
					{workspace?.title}
				</Typography>
				<Link to="edit">
					<Button variant="outlined" color="primary" startIcon={<Edit />}>
						Edit
					</Button>
				</Link>
				<Grid container>
					<Grid item xs={12} md={3}>
						<MajorKPI />
					</Grid>
					<Grid item xs={12} md={9}>
						<TodoList />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Home;
