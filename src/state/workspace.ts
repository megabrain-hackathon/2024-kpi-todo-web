import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { WorkspaceType } from '../type/workspace';

interface workspaceState {
	workspaces: WorkspaceType[];
	setWorkspaces: (workspaces: WorkspaceType[]) => void;
}

export const useWorkspace = create<workspaceState>()((set) => ({
	workspaces: [],
	setWorkspaces: (workspaces) => set({ workspaces }),
}));
