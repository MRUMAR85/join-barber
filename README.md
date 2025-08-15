# Join Barber - React Native App

A modern React Native application for barbershop queue management and customer booking.

## 🚀 Features

- **Authentication System**: Sign up/Sign in with email validation
- **Multi-Role Support**: Customer, Barber Shop Owner, and Barber accounts
- **Form Validation**: Real-time validation with error messages
- **Secure Storage**: JWT token persistence with AsyncStorage
- **Role-Based Navigation**: Different dashboards for each user type
- **Modern UI**: Clean, responsive design with smooth transitions

## 📱 Screenshots

- Welcome screen with Sign In/Sign Up tabs
- Account type selection (Customer, Shop Owner, Barber)
- Form validation with error handling
- Loading states and success messages

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Storage**: AsyncStorage for token persistence
- **Styling**: StyleSheet with modern design
- **Icons**: Expo Vector Icons (Ionicons)
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd join-barber
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Run on Device/Simulator
- **iOS**: Press `i` in terminal (Mac only)
- **Android**: Press `a` in terminal
- **Web**: Press `w` in terminal
- **Mobile**: Scan QR code with Expo Go app

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/constants/config.ts`:
```typescript
export const BASE_URL = 'https://your-api.example.com';
```

### Environment Variables
Create a `.env` file for sensitive data:
```env
API_BASE_URL=https://your-api.example.com
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TextInputField.tsx
│   ├── PasswordInput.tsx
│   └── AccountTypeCard.tsx
├── context/            # React Context providers
│   └── AuthContext.tsx
├── navigation/         # Navigation configuration
│   └── RootNavigator.tsx
├── screens/           # Screen components
│   └── WelcomeScreen.tsx
├── services/          # API services
│   └── authService.ts
├── utils/             # Utility functions
│   └── validation.ts
└── constants/         # App constants
    └── config.ts
```

## 🔐 Authentication Flow

### Sign Up Process
1. User fills out registration form
2. Validates required fields (name, email, password)
3. Selects account type (Customer/Shop Owner/Barber)
4. Submits to `/api/auth/register`
5. Stores JWT token and user data
6. Navigates to role-specific dashboard

### Sign In Process
1. User enters email and password
2. Validates credentials
3. Submits to `/api/auth/login`
4. Stores JWT token and user data
5. Navigates to role-specific dashboard

## 🎨 UI Components

### TextInputField
- Custom styled input with label and error handling
- Supports all TextInput props
- Error message display

### PasswordInput
- Password field with show/hide toggle
- Eye icon for visibility control
- Secure text entry

### AccountTypeCard
- Selectable cards for account type
- Visual feedback for selection
- Icon and description for each type

## 📱 Platform Support

- ✅ iOS (iPhone/iPad)
- ✅ Android (Phone/Tablet)
- ✅ Web (Progressive Web App)

## 🚀 Deployment

### Mobile App Deployment

#### Option 1: Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for platforms
eas build --platform ios
eas build --platform android
```

#### Option 2: App Stores
- **iOS**: Submit to Apple App Store
- **Android**: Submit to Google Play Store

### Web Deployment

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `web-build`
4. Deploy automatically on push

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `web-build`

## 🔧 Development

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator (Mac only)
- `npm run web` - Run web version
- `npm run build` - Build for production

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean
   ```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ using React Native and Expo
