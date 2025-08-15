import React from 'react';
import { Text, TextInput, View, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps & { label: string; error?: string };

export default function TextInputField({ label, error, style, ...rest }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				placeholderTextColor="#9CA3AF"
				style={[styles.input, style, error ? styles.inputError : null]}
				{...rest}
			/>
			{!!error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 14 },
	label: { fontSize: 14, color: '#111827', marginBottom: 6 },
	input: {
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
		backgroundColor: '#fff',
	},
	inputError: { borderColor: '#EF4444' },
	error: { color: '#EF4444', marginTop: 6, fontSize: 12 },
});


