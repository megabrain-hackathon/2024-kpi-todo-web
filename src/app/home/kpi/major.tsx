import React from 'react';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

interface RecipeMethodProps {
	expanded: boolean;
	onExpandClick: () => void;
}

const RecipeMethod: React.FC<RecipeMethodProps> = ({
	expanded,
	onExpandClick,
}) => {
	return (
		<Collapse in={expanded} timeout="auto" unmountOnExit>
			<CardContent>
				<Typography paragraph>Method:</Typography>
			</CardContent>
		</Collapse>
	);
};

// RecipeReviewCard 컴포넌트 정의
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

	return (
		<Card sx={{ maxWidth: 345 }}>
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
			{/* RecipeMethod 컴포넌트는 그대로 유지됩니다. */}
			<RecipeMethod expanded={expanded} onExpandClick={handleExpandClick} />
		</Card>
	);
}
function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number },
) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

function LinearWithValueLabel() {
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

	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgressWithLabel value={progress} />
		</Box>
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
