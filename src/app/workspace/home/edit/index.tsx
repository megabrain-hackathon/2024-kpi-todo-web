import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	Grid,
	List,
	ListItem,
	ListItemText,
	Stack,
	TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { WorkspaceType } from '../../../../type/workspace';
import { supabase } from '../../../../auth/supabase';

export default function WorkspaceEdit() {
	const params = useParams();
	const [workspace, setWorkspace] = useState<WorkspaceType>();
	const [workspaceUser, setWorkspaceUser] =
		useState<{ name: string; email: string }[]>();
	const [kpi, setKpi] = useState<any[]>();
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
			await supabase
				.from('workspace_user')
				.select('*')
				.eq('workspace_id', params.id)
				.then(({ data, error }) => {
					if (error) toast.error(error.message);
					if (data) setWorkspaceUser(data);
				});
			await supabase
				.from('kpi')
				.select('*')
				.eq('workspace_id', params.id)
				.then(({ data, error }) => {
					if (error) toast.error(error.message);
					if (data) setKpi(data);
				});
		};
		fetch();
	}, [params.id]);
	return (
		<Stack
			component="form"
			direction="column"
			noValidate
			autoComplete="off"
			spacing={2}
		>
			<Accordion defaultExpanded>
				<AccordionSummary>기본 정보 수정</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField label="이름" value={workspace?.title} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField label="설명" value={workspace?.description} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField label="시작일" value={workspace?.start_date} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField label="종료일" value={workspace?.end_date} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField label="관리자 ID" value={workspace?.admin_id} />
							</FormControl>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary>멤버 관리</AccordionSummary>
				<AccordionDetails>
					<List>
						{workspaceUser?.map((user) => {
							return (
								<ListItem>
									<ListItemText primary={user.name} secondary={user.email} />
								</ListItem>
							);
						})}
					</List>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary>KPI 관리</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{kpi?.map((kpi) => {
							return (
								<>
									<Grid item xs={12} md={6}>
										<TextField fullWidth label="KPI" value={kpi.title} />
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField fullWidth label="설명" value={kpi.description} />
									</Grid>
								</>
							);
						})}
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Button variant="contained" color="primary">
				수정 완료
			</Button>
		</Stack>
	);
}
