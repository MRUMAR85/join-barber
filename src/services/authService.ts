import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/config';

type AccountType = 'customer' | 'barber_shop_owner' | 'barber';

type SignUpRequest = {
	full_name: string;
	email: string;
	password: string;
	account_type: AccountType;
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
			const res = await fetch(`${BASE_URL}/api/auth/register`, {
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
			const res = await fetch(`${BASE_URL}/api/auth/login`, {
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
			return { ok: false, error: (result as ApiError).message || 'Invalid credentials' };
		} catch {
			return { ok: false, error: 'Connection failed' };
		}
	},
	signOut: async () => {
		await AsyncStorage.multiRemove(['userToken', 'userData']);
	},
	restore: async () => {
		const [[, token], [, user]] = await AsyncStorage.multiGet(['userToken', 'userData']);
		return { token, user: user ? JSON.parse(user) : null };
	},
};


