import React from 'react';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function RecipeReviewCard() {
	const [expanded, setExpanded] = React.useState(false);
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 10 : prevProgress + 10,
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	function LinearProgressWithLabel(
		props: LinearProgressProps & { value: number },
	) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress variant="indeterminate" {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">{`${Math.round(
						props.value,
					)}%`}</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<>
			{/* CardContent에 프로그레스 바 추가 */}
			<CardContent>
				<LinearProgressWithLabel value={progress} />
			</CardContent>
			{/* CardActions에서 아래로 팽창시키는 버튼만 남기고 나머지 코드 삭제 */}
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'center', // 아이템을 가운데로 정렬
				}}
				disableSpacing
			>
				<IconButton
					aria-expanded={expanded}
					onClick={handleExpandClick}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
		</>
	);
}

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function BasicStack() {
	return (
		<Box sx={{ width: '100%' }}>
			<Item>
				<Stack spacing={2}>
					<RecipeReviewCard />
					<RecipeReviewCard />
					<RecipeReviewCard />
				</Stack>
			</Item>
		</Box>
	);
}

function MajorKPI() {
	return (
		<h1 style={{ fontWeight: 'bold', fontSize: '4rem' }}>
			<BasicStack />
		</h1>
	);
}

export default MajorKPI;
