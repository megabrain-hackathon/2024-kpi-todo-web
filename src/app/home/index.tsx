import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import MajorKPI from './kpi/major';
import TodoList from './todo/todo-list';

function Home() {
	return (
		<div>
			<Container
				maxWidth="lg"
				sx={{ background: '#FFFFFF', minHeight: 'calc(100vh - 64px)' }}
			>
				<Stack direction="row">
					<Box
						sx={{
							width: 1 / 4,
						}}
					>
						Workspace, KPi 지표
						<MajorKPI />
					</Box>
					<Box
						sx={{
							width: 3 / 4,
						}}
					>
						TODO List
						<TodoList />
					</Box>
				</Stack>
			</Container>
		</div>
	);
}

export default Home;
