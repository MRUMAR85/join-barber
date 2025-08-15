import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
	title: string;
	subtitle: string;
	icon: keyof typeof Ionicons.glyphMap;
	selected?: boolean;
	onPress?: () => void;
};

export default function AccountTypeCard({ title, subtitle, icon, selected, onPress }: Props) {
	return (
		<Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
			<View style={styles.row}>
				<Ionicons name={icon} size={22} color="#111827" />
				<Text style={styles.title}>{title}</Text>
			</View>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 14,
		padding: 16,
		marginBottom: 12,
		backgroundColor: '#fff',
	},
	cardSelected: {
		borderColor: '#111827',
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 6,
		elevation: 2,
	},
	row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
	title: { marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#111827' },
	subtitle: { color: '#6B7280', fontSize: 13 },
});


