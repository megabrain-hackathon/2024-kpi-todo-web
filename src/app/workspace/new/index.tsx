import React, { useReducer, useState } from 'react';
import { MenuItem, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { supabase } from '../../../auth/supabase';
import { useAuthSession } from '../../../state/auth';

const initialState = {
	title: '',
	description: '',
	start_date: '',
	end_date: '',
	frequency: 'monthly',
	activeStep: 0,
	completed: {},
};

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'SET_FIELD':
			return { ...state, [action.field]: action.value };
		case 'SET_STEP':
			return { ...state, activeStep: action.step };
		case 'COMPLETE_STEP':
			const newCompleted = { ...state.completed, [state.activeStep]: true };
			return { ...state, completed: newCompleted };
		default:
			return state;
	}
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{/* 변경된 내용 시작 */}
					{children === 'Item One' && <Typography>내용 1</Typography>}
					{children === 'Item Two' && <Typography>내용 2</Typography>}
					{children === 'Item Three' && <Typography>내용 3</Typography>}
					{/* 변경된 내용 끝 */}
				</Box>
			)}
		</div>
	);
}
function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const steps = ['정보 입력', '주기 설정', 'KPI 설정'];

export default function NewWorkspaceDialogContent({
	onClose,
}: {
	onClose: () => void;
}) {
	const [value, setValue] = useReducer(reducer, initialState);
	function Step1Component() {
		return (
			<Box sx={{ '& > :not(style)': { m: 1 } }}>
				<TextField
					label="title"
					variant="standard"
					defaultValue={value.title}
					onChange={(newValue) => {
						setValue({
							...value,
							title: newValue.target.value,
						});
					}}
				/>
				<TextField
					label="description"
					variant="standard"
					defaultValue={value.description}
					onChange={(newValue) => {
						setValue({
							...value,
							description: newValue.target.value,
						});
					}}
				/>
			</Box>
		);
	}

	// Step2Component.jsx
	function Step2Component() {
		return (
			<>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<p>Start date</p>
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							label="Basic date picker"
							value={value.start_date}
							onChange={(newValue) => {
								if (newValue)
									setValue({
										...value,
										start_date: newValue.toString(),
									});
							}}
						/>
					</DemoContainer>
					<p>End date</p>
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							label="Basic date picker"
							value={value.end_date}
							onChange={(newValue) => {
								if (newValue)
									setValue({
										...value,
										end_date: newValue.toString(),
									});
							}}
						/>
					</DemoContainer>
				</LocalizationProvider>
				<Select
					value={value.frequency}
					onChange={(newValue) => {
						if (newValue)
							setValue({
								...value,
								frequency: newValue.target.value,
							});
					}}
				>
					<MenuItem value="weekly">주간</MenuItem>
					<MenuItem value="monthly">월간</MenuItem>
					<MenuItem value="quarterly">분기</MenuItem>
					<MenuItem value="yearly">연간</MenuItem>
				</Select>
			</>
		);
	}

	function Step3Component() {
		const [value, setValue] = React.useState(0);

		const handleChange = (event: React.SyntheticEvent, newValue: number) => {
			setValue(newValue);
		};

		return (
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: 'background.paper',
					display: 'flex',
					height: 224,
				}}
			>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					<Tab label="Item One" {...a11yProps(0)} />
					<Tab label="Item Two" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
				</Tabs>
				{/* 변경된 내용 시작 */}
				<TabPanel value={value} index={0}>
					Item One
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
				{/* 변경된 내용 끝 */}
			</Box>
		);
	}

	const stepComponents = [Step1Component, Step2Component, Step3Component];
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState<{
		[index: number]: boolean;
	}>({});
	const { session } = useAuthSession();

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
					// find the first step that has been completed
					steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleClose = () => {
		if (session)
			supabase.from('workspace').insert([
				{
					title: value.title,
					description: value.description,
					start_date: value.start_date,
					end_date: value.end_date,
					frequency: value.frequency,
					admin_id: session.user.id,
				},
			]);
		onClose(); // 추가: 닫기 버튼 클릭 시 다이얼로그를 닫습니다.
	};

	return (
		<Box
			sx={{
				width: '100%',
				marginTop: '16px',
				marginBottom: '16px',
			}}
		>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label} completed={completed[index]}>
						<StepButton color="inherit" onClick={handleStep(index)}>
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<div>
				{allStepsCompleted() ? (
					<>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleClose}>Finish</Button>
						</Box>
					</>
				) : (
					<>
						<Stack
							direction="column"
							alignItems="left"
							sx={{ mt: 2, mb: 1, py: 1 }}
						>
							{React.createElement(stepComponents[activeStep])}
						</Stack>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleNext} sx={{ mr: 1 }}>
								Next
							</Button>
							{activeStep !== steps.length &&
								(completed[activeStep] ? (
									<Typography
										variant="caption"
										sx={{ display: 'inline-block' }}
									/>
								) : (
									<Button onClick={handleComplete}>
										{completedSteps() === totalSteps()
											? 'Finish'
											: 'Complete Step'}
									</Button>
								))}
						</Box>
					</>
				)}
			</div>
		</Box>
	);
}
