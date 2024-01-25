import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';

interface AuthState {
	session: Session | undefined;
	setSession: (session: Session | undefined) => void;
}

export const useAuthSession = create<AuthState>()((set) => ({
	session: undefined,
	setSession: (session) => set({ session }),
}));
