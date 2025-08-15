export const validateFullName = (v: string) => {
	if (!v?.trim()) return 'Full name is required';
	if (v.trim().length < 2) return 'Full name must be at least 2 characters';
	return '';
};

export const validateEmail = (v: string) => {
	if (!v?.trim()) return 'Email is required';
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(v.trim().toLowerCase())) return 'Enter a valid email address';
	return '';
};

export const validatePassword = (v: string) => {
	if (!v) return 'Password is required';
	if (v.length < 8) return 'Password must be at least 8 characters';
	return '';
};


