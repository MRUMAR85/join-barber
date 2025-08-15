import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <StatusBar style="dark" />
            <RootNavigator />
        </AuthProvider>
    );
}


