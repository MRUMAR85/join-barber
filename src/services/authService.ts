import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/config';

type AccountType = 'customer' | 'barber_shop_owner' | 'barber';

type SignUpRequest = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	password: string;
	password_confirmation: string;
	role: 'Customer' | 'Shop' | 'Barber';
};

type ApiSuccess<T> = { success: true; data: T; message?: string };
type ApiError = { success: false; message: string; errors?: Record<string, string[]> };

const parse = async <T>(res: Response): Promise<ApiSuccess<T> | ApiError> => {
	try {
		const json = await res.json();
		return json;
	} catch {
		return { success: false, message: 'Invalid server response' };
	}
};

export const authService = {
	signUp: async (payload: SignUpRequest) => {
		try {
			const res = await fetch(`${BASE_URL}/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const result = await parse<{ user: any; token: string }>(res);
			if ((result as ApiSuccess<any>).success) {
				const { token, user } = (result as ApiSuccess<any>).data;
				await AsyncStorage.multiSet([
					['userToken', token],
					['userData', JSON.stringify(user)],
				]);
				return { ok: true, user };
			}
			return { ok: false, error: (result as ApiError).errors || (result as ApiError).message };
		} catch {
			return { ok: false, error: 'Network error occurred' };
		}
	},
	signIn: async (payload: { email: string; password: string }) => {
		try {
			console.log('Attempting sign in with:', { email: payload.email, url: `${BASE_URL}/auth/login` });
			const res = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			console.log('Sign in response status:', res.status);
			const result = await parse<{ user: any; token: string }>(res);
			console.log('Sign in result:', result);
			if ((result as ApiSuccess<any>).success) {
				const { token, user } = (result as ApiSuccess<any>).data;
				await AsyncStorage.multiSet([
					['userToken', token],
					['userData', JSON.stringify(user)],
				]);
				console.log('User data stored, returning success');
				return { ok: true, user };
			}
			console.log('Sign in failed:', (result as ApiError).message);
			return { ok: false, error: (result as ApiError).message || 'Invalid credentials' };
		} catch (error) {
			console.log('Sign in error:', error);
			return { ok: false, error: 'Connection failed' };
		}
	},
	signOut: async () => {
		try {
			// Call logout endpoint if token exists
			const token = await AsyncStorage.getItem('userToken');
			if (token) {
				await fetch(`${BASE_URL}/auth/logout`, {
					method: 'POST',
					headers: { 
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				});
			}
		} catch (error) {
			console.log('Logout error:', error);
		} finally {
			await AsyncStorage.multiRemove(['userToken', 'userData']);
		}
	},
	restore: async () => {
		const [[, token], [, user]] = await AsyncStorage.multiGet(['userToken', 'userData']);
		return { token, user: user ? JSON.parse(user) : null };
	},
};


