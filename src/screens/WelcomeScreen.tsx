import React, { useMemo, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TextInputField from '../components/TextInputField';
import AccountTypeCard from '../components/AccountTypeCard';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateFirstName, validateLastName, validatePhone, validatePassword } from '../utils/validation';

type Mode = 'signin' | 'signup';
type AccountType = 'Customer' | 'Shop' | 'Barber';

export default function WelcomeScreen() {
    const [mode, setMode] = useState<Mode>('signup');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [type, setType] = useState<AccountType>('Barber');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { signIn, signUp, loading } = useAuth();

    const title = useMemo(() => (mode === 'signin' ? 'Sign In' : 'Sign Up'), [mode]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (mode === 'signup') {
            const e1 = validateFirstName(firstName);
            if (e1) next.first_name = e1;
            const e2 = validateLastName(lastName);
            if (e2) next.last_name = e2;
            const e3 = validatePhone(phone);
            if (e3) next.phone = e3;
        }
        const e4 = validateEmail(email);
        if (e4) next.email = e4;
        const e5 = validatePassword(password);
        if (e5) next.password = e5;
        if (mode === 'signup' && password !== passwordConfirmation) {
            next.password_confirmation = 'Passwords do not match';
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = async () => {
        if (!validate()) return;
        if (mode === 'signin') {
            await signIn(email.trim(), password);
        } else {
            await signUp({
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password,
                password_confirmation: passwordConfirmation,
                role: type,
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
                            <>
                                <TextInputField
                                    label="First Name"
                                    value={firstName}
                                    onChangeText={(t) => {
                                        setFirstName(t);
                                        if (errors.first_name) setErrors((e) => ({ ...e, first_name: '' }));
                                    }}
                                    placeholder="John"
                                    autoCapitalize="words"
                                    error={errors.first_name}
                                />
                                <TextInputField
                                    label="Last Name"
                                    value={lastName}
                                    onChangeText={(t) => {
                                        setLastName(t);
                                        if (errors.last_name) setErrors((e) => ({ ...e, last_name: '' }));
                                    }}
                                    placeholder="Doe"
                                    autoCapitalize="words"
                                    error={errors.last_name}
                                />
                                <TextInputField
                                    label="Phone Number"
                                    value={phone}
                                    onChangeText={(t) => {
                                        setPhone(t);
                                        if (errors.phone) setErrors((e) => ({ ...e, phone: '' }));
                                    }}
                                    placeholder="03347882314"
                                    keyboardType="phone-pad"
                                    error={errors.phone}
                                />
                            </>
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
                            <PasswordInput
                                label="Confirm Password"
                                value={passwordConfirmation}
                                onChangeText={(t: string) => {
                                    setPasswordConfirmation(t);
                                    if (errors.password_confirmation) setErrors((e) => ({ ...e, password_confirmation: '' }));
                                }}
                                placeholder="Confirm your password"
                                autoCapitalize="none"
                                error={errors.password_confirmation}
                            />
                        )}

                        {mode === 'signup' && (
                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.sectionLabel}>Account Type</Text>
                                <AccountTypeCard
                                    title="Customer"
                                    subtitle="Join queues at barbershops"
                                    icon="person-outline"
                                    selected={type === 'Customer'}
                                    onPress={() => setType('Customer')}
                                />
                                <AccountTypeCard
                                    title="Shop Owner"
                                    subtitle="Manage your barbershop and queues"
                                    icon="storefront-outline"
                                    selected={type === 'Shop'}
                                    onPress={() => setType('Shop')}
                                />
                                <AccountTypeCard
                                    title="Barber"
                                    subtitle="Work at a barbershop and serve customers"
                                    icon="cut-outline"
                                    selected={type === 'Barber'}
                                    onPress={() => setType('Barber')}
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


