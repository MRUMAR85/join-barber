import React, { useMemo, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TextInputField from '../components/TextInputField';
import AccountTypeCard from '../components/AccountTypeCard';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateFullName, validatePassword } from '../utils/validation';

type Mode = 'signin' | 'signup';
type AccountType = 'customer' | 'barber_shop_owner' | 'barber';

export default function WelcomeScreen() {
    const [mode, setMode] = useState<Mode>('signup');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState<AccountType>('barber');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { signIn, signUp, loading } = useAuth();

    const title = useMemo(() => (mode === 'signin' ? 'Sign In' : 'Sign Up'), [mode]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (mode === 'signup') {
            const e1 = validateFullName(fullName);
            if (e1) next.full_name = e1;
        }
        const e2 = validateEmail(email);
        if (e2) next.email = e2;
        const e3 = validatePassword(password);
        if (e3) next.password = e3;
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = async () => {
        if (!validate()) return;
        if (mode === 'signin') {
            await signIn(email.trim(), password);
        } else {
            await signUp({
                full_name: fullName.trim(),
                email: email.trim(),
                password,
                account_type: type,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>
                        <Text style={styles.heading}>Welcome to Join Barber</Text>
                        <Text style={styles.subheading}>Sign in to manage your barbershop or join a queue</Text>

                        <View style={styles.tabs}>
                            <Pressable onPress={() => setMode('signin')} style={[styles.tab, mode === 'signin' && styles.tabActive]}>
                                <Text style={[styles.tabText, mode === 'signin' && styles.tabTextActive]}>Sign In</Text>
                            </Pressable>
                            <Pressable onPress={() => setMode('signup')} style={[styles.tab, mode === 'signup' && styles.tabActive]}>
                                <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>Sign Up</Text>
                            </Pressable>
                        </View>

                        {mode === 'signup' && (
                            <TextInputField
                                label="Full Name"
                                value={fullName}
                                onChangeText={(t) => {
                                    setFullName(t);
                                    if (errors.full_name) setErrors((e) => ({ ...e, full_name: '' }));
                                }}
                                placeholder="John Doe"
                                autoCapitalize="words"
                                error={errors.full_name}
                            />
                        )}

                        <TextInputField
                            label="Email"
                            value={email}
                            onChangeText={(t) => {
                                setEmail(t);
                                if (errors.email) setErrors((e) => ({ ...e, email: '' }));
                            }}
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={errors.email}
                        />

                        <PasswordInput
                            label="Password"
                            value={password}
                            onChangeText={(t: string) => {
                                setPassword(t);
                                if (errors.password) setErrors((e) => ({ ...e, password: '' }));
                            }}
                            placeholder="Minimum 8 characters"
                            autoCapitalize="none"
                            error={errors.password}
                        />

                        {mode === 'signup' && (
                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.sectionLabel}>Account Type</Text>
                                <AccountTypeCard
                                    title="Customer"
                                    subtitle="Join queues at barbershops"
                                    icon="person-outline"
                                    selected={type === 'customer'}
                                    onPress={() => setType('customer')}
                                />
                                <AccountTypeCard
                                    title="Barber Shop Owner"
                                    subtitle="Manage your barbershop and queues"
                                    icon="storefront-outline"
                                    selected={type === 'barber_shop_owner'}
                                    onPress={() => setType('barber_shop_owner')}
                                />
                                <AccountTypeCard
                                    title="Barber"
                                    subtitle="Work at a barbershop and serve customers"
                                    icon="cut-outline"
                                    selected={type === 'barber'}
                                    onPress={() => setType('barber')}
                                />
                            </View>
                        )}

                        <Pressable onPress={submit} disabled={loading} style={[styles.button, loading && { opacity: 0.7 }]}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>}
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    heading: { fontSize: 22, fontWeight: '700', color: '#111827' },
    subheading: { color: '#6B7280', marginTop: 4, marginBottom: 16 },
    tabs: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 16 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    tabActive: { backgroundColor: '#111827' },
    tabText: { color: '#111827', fontWeight: '600' },
    tabTextActive: { color: '#fff' },
    sectionLabel: { fontSize: 14, color: '#111827', marginBottom: 8, marginTop: 8 },
    button: {
        backgroundColor: '#111827',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});


