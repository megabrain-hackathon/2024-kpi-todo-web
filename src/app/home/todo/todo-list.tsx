import * as React from 'react';
import clsx from 'clsx';
import {
	Chip,
	Avatar,
	Checkbox,
	ListItemAvatar,
	ListItemText,
	ListItemButton,
	ListItem,
	List,
	Box,
	Stack,
	IconButton,
	TextField,
	Button,
	Typography,
	StyledComponentProps,
	GlobalStylesProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
	TreeItem,
	TreeItemProps,
	useTreeItem,
	TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
import ConfirmationDialog from './todo-dialog';
import { Add, Preview } from '@mui/icons-material';
import { MuiChipsInput } from 'mui-chips-input';

const template = [
	{
		title: 'Task 1',
		due_to: '2024-12-31',
		status: 'todo',
		children: [
			{
				title: 'Subtask 1.1',
				due_to: '2024-12-31',
				status: 'todo',
			},
			{
				title: 'Subtask 1.2',
				due_to: '2024-12-31',
				status: 'ongoing',
			},
		],
	},
	{
		title: 'Task 2',
		due_to: '2024-12-31',
		status: 'ongoing',
		children: [
			{
				title: 'Subtask 2.1',
				due_to: '2024-12-31',
				status: 'complete',
			},
			{
				title: 'Subtask 2.2',
				due_to: '2024-12-31',
				status: 'todo',
			},
		],
	},
	{
		title: 'Task 3',
		due_to: '2024-12-31',
		status: 'complete',
	},
	{
		title: 'Task 4',
		due_to: '2024-12-31',
		status: 'todo',
	},
	{
		title: 'Task 5',
		due_to: '2024-12-31',
		status: 'ongoing',
		children: [
			{
				title: 'Subtask 5.1',
				due_to: '2024-12-31',
				status: 'complete',
			},
		],
	},
	{
		title: 'Task 6',
		due_to: '2024-12-31',
		status: 'complete',
	},
	{
		title: 'Task 7',
		due_to: '2024-12-31',
		status: 'todo',
	},
	{
		title: 'Task 8',
		due_to: '2024-12-31',
		status: 'ongoing',
	},
	{
		title: 'Task 9',
		due_to: '2024-12-31',
		status: 'complete',
	},
	{
		title: 'Task 10',
		due_to: '2024-12-31',
		status: 'todo',
	},
];

type taskType = {
	title: string;
	due_to: string;
	status: string;
};

function TodoList() {
	// 입력된 텍스트와 작업 목록을 관리하는 상태
	const [text, setText] = React.useState<{
		value: string;
		parent?: string;
	}>({
		value: '',
	});
	const [tasks, setTasks] = React.useState(template);

	// 텍스트 입력 시 호출되는 이벤트 핸들러
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText((prev) => {
			return { ...prev, value: e.target.value };
		});
	};
	const Task = ({
		task,
		isChild = false,
	}: {
		task: taskType;
		isChild?: boolean;
	}) => (
		<ListItem sx={{ pl: isChild ? 2 : 0 }}>
			{!isChild && (
				<IconButton
					onClick={() => {
						setText((prev) => {
							return { ...prev, parent: task.title };
						});
					}}
				>
					<Add />
				</IconButton>
			)}
			<ListItemButton onClick={() => ConfirmationDialog()}>
				{/* 작업 내용 */}
				<ListItemText primary={task.title} />

				{task.status === 'todo' ? (
					<Chip label="할 일" color="default" variant="filled" />
				) : task.status === 'ongoing' ? (
					<Chip label="진행중" color="success" variant="filled" />
				) : (
					<Chip label="완료" color="primary" variant="outlined" />
				)}
			</ListItemButton>
		</ListItem>
	);

	// "추가하기" 버튼 클릭 시 호출되는 이벤트 핸들러
	const addTask = () => {
		const trimedText = text.value.trim();
		if (trimedText !== '') {
			if (!text.parent) {
				if (!tasks.find((task) => task.title === text.value)) {
					setTasks((prevTasks) => [
						...prevTasks,
						{
							title: trimedText,
							due_to: '2024-12-12',
							status: 'todo',
						},
					]);
					setText({
						value: '',
					});
				}
			} else {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.title === text.parent
							? {
									...task,
									children: [
										...(task.children || []), // 이 부분은 children이 없을 때를 고려해 추가했습니다.
										{
											title: trimedText,
											due_to: '2024-12-12',
											status: 'todo',
										},
									],
								}
							: task,
					),
				);
			}
			setText({
				value: '',
			});
		}
	};

	return (
		<Stack direction={'column'}>
			<TextField
				value={text.value}
				onChange={onChange}
				onKeyDown={(e) => {
					if (e.nativeEvent.isComposing) {
						e.stopPropagation();
					}
					if (e.key === 'Enter') {
						addTask();
					}
				}}
				InputProps={{
					startAdornment: text.parent && (
						<Chip
							label={text.parent}
							onDelete={() => {
								// Chip을 삭제할 때 해당 작업을 선택 해제
								setText((prev) => {
									return { ...prev, parent: undefined };
								});
							}}
						/>
					),
				}}
			/>
			{<Box></Box>}
			<TreeView
				aria-label="icon expansion"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
			>
				<List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
					{/* 작업 목록 */}
					{tasks.map((task, index) => (
						<>
							<Task task={task} />
							{task.children?.map((childtask) => (
								<Task task={childtask} isChild />
							))}
						</>
					))}
				</List>
			</TreeView>
		</Stack>
	);
}

export default TodoList;
