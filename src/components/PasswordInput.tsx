import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextInputField from './TextInputField';

export default function PasswordInput(props: any) {
	const [secure, setSecure] = useState(true);
	return (
		<View>
			<TextInputField
				{...props}
				secureTextEntry={secure}
				rightIcon={
					<Pressable onPress={() => setSecure((v) => !v)}>
						<Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} />
					</Pressable>
				}
			/>
		</View>
	);
}


