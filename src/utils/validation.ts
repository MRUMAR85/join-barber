export const validateFirstName = (v: string) => {
	if (!v?.trim()) return 'First name is required';
	if (v.trim().length < 2) return 'First name must be at least 2 characters';
	return '';
};

export const validateLastName = (v: string) => {
	if (!v?.trim()) return 'Last name is required';
	if (v.trim().length < 2) return 'Last name must be at least 2 characters';
	return '';
};

export const validatePhone = (v: string) => {
	if (!v?.trim()) return 'Phone number is required';
	if (v.trim().length < 10) return 'Phone number must be at least 10 digits';
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


