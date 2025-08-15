import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/authService';

type User = { id: number; first_name: string; last_name: string; email: string; role: 'Customer' | 'Shop' | 'Barber' };

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (payload: { first_name: string; last_name: string; email: string; phone: string; password: string; password_confirmation: string; role: User['role'] }) => Promise<{ success: boolean; message?: string; error?: string }>;
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
			// For web, we'll use a simple alert, for mobile we can use Alert.alert
			if (typeof window !== 'undefined') {
				// Web environment
				alert(`Welcome Back! Successfully logged in as ${res.user.first_name} ${res.user.last_name}`);
			} else {
				// Mobile environment
				Alert.alert(
					'Welcome Back!', 
					`Successfully logged in as ${res.user.first_name} ${res.user.last_name}`,
					[{ text: 'Continue', onPress: () => {} }]
				);
			}
		} else {
			const errorMessage = typeof res.error === 'string' ? res.error : 'Invalid email or password';
			if (typeof window !== 'undefined') {
				alert(`Login Failed: ${errorMessage}`);
			} else {
				Alert.alert('Login Failed', errorMessage);
			}
		}
	};

	const signUp = async (payload: { first_name: string; last_name: string; email: string; phone: string; password: string; password_confirmation: string; role: User['role'] }) => {
		setLoading(true);
		const res = await authService.signUp(payload);
		setLoading(false);
		if (res.ok) {
			// Don't set user, just show success message and clear form
			if (typeof window !== 'undefined') {
				// Web environment
				alert('Account Created Successfully! Please sign in with your email and password to continue.');
			} else {
				// Mobile environment
				Alert.alert(
					'Account Created Successfully!', 
					'Please sign in with your email and password to continue.',
					[
						{
							text: 'OK',
							onPress: () => {
								// This will trigger the form to switch to login mode
								// We'll handle this in the WelcomeScreen
							}
						}
					]
				);
			}
			return { success: true, message: 'Account created successfully' };
		} else {
			const errorText = typeof res.error === 'string'
				? res.error
				: Object.entries(res.error as Record<string, string[]>)
						.map(([k, v]) => `${k}: ${v.join(', ')}`)
						.join('\n');
			if (typeof window !== 'undefined') {
				alert(`Validation failed: ${errorText}`);
			} else {
				Alert.alert('Validation failed', errorText);
			}
			return { success: false, error: errorText };
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


