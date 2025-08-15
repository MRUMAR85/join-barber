import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const ScreenCenter = () => (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<ActivityIndicator />
	</View>
);

const CustomerDashboard = () => <ScreenCenter />;
const OwnerDashboard = () => <ScreenCenter />;
const BarberDashboard = () => <ScreenCenter />;

const RoleRouter = () => {
	const { user } = useAuth();
	if (!user) return null;
	switch (user.account_type) {
		case 'customer':
			return <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} options={{ title: 'Dashboard' }} />;
		case 'barber_shop_owner':
			return <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} options={{ title: 'Shop Management' }} />;
		default:
			return <Stack.Screen name="BarberDashboard" component={BarberDashboard} options={{ title: 'Barber' }} />;
	}
};

export default function RootNavigator() {
	const { user, loading } = useAuth();

	if (loading) return <ScreenCenter />;

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{!user ? (
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
				) : (
					<RoleRouter />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}


