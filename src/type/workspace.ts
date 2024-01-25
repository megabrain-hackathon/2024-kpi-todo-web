type WorkspaceType = {
	id: string;
	title: string;
	description: string | null;
	frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
	owner: string;
	created_at: string;
	start_date: string;
	end_date: string;
	admin_id: number;
	updated_at: string;
};

export type { WorkspaceType };
