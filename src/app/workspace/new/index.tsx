import React, { useState } from 'react';
import { Container, Dialog, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
function VerticalTabs() {
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

function InputWithIcon() {
	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField id="input-with-sx" label="Title" variant="standard" />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField id="input-with-sx" label="Sub Title" variant="standard" />
			</Box>
		</Box>
	);
}

function AlignItemsList() {
	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" sx={{ width: '100%' }} />
		</List>
	);
}

const Step1Component = () => {
	return (
		<Typography>
			<InputWithIcon />
		</Typography>
	);
};

// Step2Component.jsx
const Step2Component = () => {
	return (
		<Typography>
			<p>Start date</p>
			<BasicDatePicker />
			<p>End date</p>
			<BasicDatePicker />
		</Typography>
	);
};

// Step3Component.jsx
const Step3Component = () => {
	return (
		<Typography>
			<VerticalTabs />
		</Typography>
	);
};
const steps = ['Basic Info', 'Select Date', 'Select Goals'];

function HorizontalNonLinearStepper({
	onClose,
	addComponent,
}: {
	onClose: () => void;
	addComponent: () => void;
}) {
	const stepComponents = [Step1Component, Step2Component, Step3Component];
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState<{
		[k: number]: boolean;
	}>({});

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
		onClose(); // 추가: 닫기 버튼 클릭 시 다이얼로그를 닫습니다.
		addComponent();
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
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleClose}>Finish</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
							<Stack direction={'column'} alignItems="left">
								{React.createElement(stepComponents[activeStep])}
							</Stack>
						</Typography>
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
									></Typography>
								) : (
									<Button onClick={handleComplete}>
										{completedSteps() === totalSteps()
											? 'Finish'
											: 'Complete Step'}
									</Button>
								))}
						</Box>
					</React.Fragment>
				)}
			</div>
		</Box>
	);
}

const DemoPaper = styled(Paper)(({ theme }) => ({
	width: 500,
	height: 300,
	padding: theme.spacing(2),
	...theme.typography.body2,
	textAlign: 'center',
}));

function BasicDatePicker() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DatePicker']}>
				<DatePicker label="Basic date picker" />
			</DemoContainer>
		</LocalizationProvider>
	);
}

function MyComponent() {
	const [open, setOpen] = useState(false);
	const [components, setComponents] = useState<Array<React.ReactNode>>([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const addComponent = () => {
		setComponents((prevComponents) => [
			...prevComponents,
			<AlignItemsList key={Date.now()} />,
		]);
	};

	function Variants() {
		return (
			<Stack direction="row" spacing={2}>
				<DemoPaper
					variant="outlined"
					sx={{ overflow: 'auto', maxHeight: '300px' }}
				>
					<Stack direction={'column'} alignItems="flex-start">
						{components}
					</Stack>
				</DemoPaper>
			</Stack>
		);
	}

	return (
		<div>
			<Stack direction={'column'} alignItems="center" spacing={3}>
				<Variants></Variants>
				<Fab onClick={handleOpen} color="primary" aria-label="add">
					<AddIcon />
				</Fab>
				<Dialog
					open={open}
					onClose={handleClose}
					PaperProps={{ style: { width: '700px' } }}
				>
					<HorizontalNonLinearStepper
						onClose={handleClose}
						addComponent={addComponent}
					/>
				</Dialog>
			</Stack>
		</div>
	);
}

export function NewWorkspace() {
	return (
		<Container maxWidth="sm">
			<Stack direction={'column'} alignItems="center">
				<MyComponent />
			</Stack>
		</Container>
	);
}
