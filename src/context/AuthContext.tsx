import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/authService';

type User = { id: number; full_name: string; email: string; account_type: 'customer' | 'barber_shop_owner' | 'barber' };

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (payload: { full_name: string; email: string; password: string; account_type: User['account_type'] }) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { user } = await authService.restore();
			setUser(user);
			setLoading(false);
		})();
	}, []);

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		const res = await authService.signIn({ email, password });
		setLoading(false);
		if (res.ok) {
			setUser(res.user);
			Alert.alert('Login successful');
		} else {
			Alert.alert('Error', typeof res.error === 'string' ? res.error : 'Invalid email or password');
		}
	};

	const signUp = async (payload: { full_name: string; email: string; password: string; account_type: User['account_type'] }) => {
		setLoading(true);
		const res = await authService.signUp(payload);
		setLoading(false);
		if (res.ok) {
			setUser(res.user);
			Alert.alert('Account created successfully');
		} else {
			const errorText = typeof res.error === 'string'
				? res.error
				: Object.entries(res.error as Record<string, string[]>)
						.map(([k, v]) => `${k}: ${v.join(', ')}`)
						.join('\n');
			Alert.alert('Validation failed', errorText);
		}
	};

	const signOut = async () => {
		await authService.signOut();
		setUser(null);
	};

	const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};


