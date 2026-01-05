# 📧 Email Assistant App

A modern, AI-powered Email Assistant mobile application built with React Native and Expo. This app helps users manage their emails smartly with AI-generated replies, N8N workflow integration, and various device features.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0.30-black?style=flat-square&logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?style=flat-square&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📱 Screenshots

<div align="center">
  <img src="./screenshots/login.png" width="200" alt="Login Screen" />
  <img src="./screenshots/home.png" width="200" alt="Home Screen" />
  <img src="./screenshots/emails.png" width="200" alt="Emails Screen" />
  <img src="./screenshots/compose.png" width="200" alt="Compose Screen" />
</div>

---

## ✨ Features

### 🔐 Authentication
- User Registration with Firebase
- Secure Login System
- Session Management with AsyncStorage
- Password Validation

### 📬 Email Management
- View Email List with Categories
- Search & Filter Emails
- Compose New Emails
- View Email Details
- Quick Reply Actions

### 🤖 AI Features
- AI-Generated Email Replies
- Smart Compose Suggestions
- Quick Phrase Insertion
- Professional Response Templates

### 🎨 User Interface
- Modern Gradient Design
- Dark Mode Support
- Responsive Layout
- Bottom Tab Navigation
- Smooth Animations

### 📍 Device Features
- **GPS Location** - Find your current position
- **Camera** - Take or upload profile photos
- **Motion Sensor** - Shake to refresh emails
- **Gallery Access** - Upload images from device

### ⚙️ Settings
- Dark/Light Theme Toggle
- Notification Preferences
- Auto-Sync Options
- Profile Management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native + Expo |
| **Navigation** | React Navigation v7 |
| **UI Library** | React Native Paper |
| **State Management** | Context API |
| **Local Storage** | AsyncStorage |
| **Database** | Firebase Realtime Database |
| **Icons** | Expo Vector Icons, Ionicons |
| **Location** | Expo Location |
| **Camera** | Expo Camera |
| **Sensors** | Expo Sensors |
| **Image Picker** | Expo Image Picker |

---

## 📋 Requirements Implemented

### A. JavaScript & Code Structure ✅
- [x] ES6+ Class with Constructor (`services/AuthService.js`)
- [x] Arrow Functions (Throughout the app)
- [x] Array Methods - `map()`, `filter()` (`EmailListScreen.js`)
- [x] Multiple Modules/Files (Organized folder structure)

### B. UI & Components ✅
- [x] Functional Components with Hooks (All screens)
- [x] Class-based Component (`components/StatCard.js`)
- [x] View, Text, TextInput, Button components
- [x] FlatList for email list (`EmailListScreen.js`)
- [x] Custom StyleSheet with consistent design
- [x] Custom Reusable Components (`EmailCard.js`, `CustomButton.js`)
- [x] Icons throughout the UI

### C. Navigation & Application Structure ✅
- [x] React Navigation with 13 screens
- [x] Stack Navigator for screen flow
- [x] Bottom Tab Navigator for main sections
- [x] Custom Headers with gradients
- [x] Navigation Icons in tabs
- [x] Central Theme Management (`context/AppContext.js`)

### D. Data, APIs & State Management ✅
- [x] AsyncStorage for local data (`SettingsScreen.js`)
- [x] REST API Integration (`ComposeEmailScreen.js`, `EmailDetailScreen.js`)
- [x] Loading & Error States
- [x] Firebase CRUD Operations (`services/AuthService.js`)
- [x] Context API for Global State (`context/AppContext.js`)

### E. Device Features ✅
- [x] GPS Location Access (`MapScreen.js`)
- [x] Current Location Display
- [x] Additional Location Marker (Office)
- [x] Camera Integration (`CameraScreen.js`)
- [x] Photo Storage
- [x] Accelerometer Sensor (`SensorScreen.js`)
- [x] Shake Detection Feature

---

## 📁 Project Structure

# 📧 Email Assistant App

A modern, AI-powered Email Assistant mobile application built with React Native and Expo. This app helps users manage their emails smartly with AI-generated replies, N8N workflow integration, and various device features.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0.30-black?style=flat-square&logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?style=flat-square&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📱 Screenshots

<div align="center">
  <img src="./screenshots/login.png" width="200" alt="Login Screen" />
  <img src="./screenshots/home.png" width="200" alt="Home Screen" />
  <img src="./screenshots/emails.png" width="200" alt="Emails Screen" />
  <img src="./screenshots/compose.png" width="200" alt="Compose Screen" />
</div>

---

## ✨ Features

### 🔐 Authentication
- User Registration with Firebase
- Secure Login System
- Session Management with AsyncStorage
- Password Validation

### 📬 Email Management
- View Email List with Categories
- Search & Filter Emails
- Compose New Emails
- View Email Details
- Quick Reply Actions

### 🤖 AI Features
- AI-Generated Email Replies
- Smart Compose Suggestions
- Quick Phrase Insertion
- Professional Response Templates

### 🎨 User Interface
- Modern Gradient Design
- Dark Mode Support
- Responsive Layout
- Bottom Tab Navigation
- Smooth Animations

### 📍 Device Features
- **GPS Location** - Find your current position
- **Camera** - Take or upload profile photos
- **Motion Sensor** - Shake to refresh emails
- **Gallery Access** - Upload images from device

### ⚙️ Settings
- Dark/Light Theme Toggle
- Notification Preferences
- Auto-Sync Options
- Profile Management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native + Expo |
| **Navigation** | React Navigation v7 |
| **UI Library** | React Native Paper |
| **State Management** | Context API |
| **Local Storage** | AsyncStorage |
| **Database** | Firebase Realtime Database |
| **Icons** | Expo Vector Icons, Ionicons |
| **Location** | Expo Location |
| **Camera** | Expo Camera |
| **Sensors** | Expo Sensors |
| **Image Picker** | Expo Image Picker |

---

## 📋 Requirements Implemented

### A. JavaScript & Code Structure ✅
- [x] ES6+ Class with Constructor (`services/AuthService.js`)
- [x] Arrow Functions (Throughout the app)
- [x] Array Methods - `map()`, `filter()` (`EmailListScreen.js`)
- [x] Multiple Modules/Files (Organized folder structure)

### B. UI & Components ✅
- [x] Functional Components with Hooks (All screens)
- [x] Class-based Component (`components/StatCard.js`)
- [x] View, Text, TextInput, Button components
- [x] FlatList for email list (`EmailListScreen.js`)
- [x] Custom StyleSheet with consistent design
- [x] Custom Reusable Components (`EmailCard.js`, `CustomButton.js`)
- [x] Icons throughout the UI

### C. Navigation & Application Structure ✅
- [x] React Navigation with 13 screens
- [x] Stack Navigator for screen flow
- [x] Bottom Tab Navigator for main sections
- [x] Custom Headers with gradients
- [x] Navigation Icons in tabs
- [x] Central Theme Management (`context/AppContext.js`)

### D. Data, APIs & State Management ✅
- [x] AsyncStorage for local data (`SettingsScreen.js`)
- [x] REST API Integration (`ComposeEmailScreen.js`, `EmailDetailScreen.js`)
- [x] Loading & Error States
- [x] Firebase CRUD Operations (`services/AuthService.js`)
- [x] Context API for Global State (`context/AppContext.js`)

### E. Device Features ✅
- [x] GPS Location Access (`MapScreen.js`)
- [x] Current Location Display
- [x] Additional Location Marker (Office)
- [x] Camera Integration (`CameraScreen.js`)
- [x] Photo Storage
- [x] Accelerometer Sensor (`SensorScreen.js`)
- [x] Shake Detection Feature

---

## 📁 Project Structure

# 📧 Email Assistant App

A modern, AI-powered Email Assistant mobile application built with React Native and Expo. This app helps users manage their emails smartly with AI-generated replies, N8N workflow integration, and various device features.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0.30-black?style=flat-square&logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?style=flat-square&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📱 Screenshots

<div align="center">
  <img src="./screenshots/login.png" width="200" alt="Login Screen" />
  <img src="./screenshots/home.png" width="200" alt="Home Screen" />
  <img src="./screenshots/emails.png" width="200" alt="Emails Screen" />
  <img src="./screenshots/compose.png" width="200" alt="Compose Screen" />
</div>

---

## ✨ Features

### 🔐 Authentication
- User Registration with Firebase
- Secure Login System
- Session Management with AsyncStorage
- Password Validation

### 📬 Email Management
- View Email List with Categories
- Search & Filter Emails
- Compose New Emails
- View Email Details
- Quick Reply Actions

### 🤖 AI Features
- AI-Generated Email Replies
- Smart Compose Suggestions
- Quick Phrase Insertion
- Professional Response Templates

### 🎨 User Interface
- Modern Gradient Design
- Dark Mode Support
- Responsive Layout
- Bottom Tab Navigation
- Smooth Animations

### 📍 Device Features
- **GPS Location** - Find your current position
- **Camera** - Take or upload profile photos
- **Motion Sensor** - Shake to refresh emails
- **Gallery Access** - Upload images from device

### ⚙️ Settings
- Dark/Light Theme Toggle
- Notification Preferences
- Auto-Sync Options
- Profile Management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native + Expo |
| **Navigation** | React Navigation v7 |
| **UI Library** | React Native Paper |
| **State Management** | Context API |
| **Local Storage** | AsyncStorage |
| **Database** | Firebase Realtime Database |
| **Icons** | Expo Vector Icons, Ionicons |
| **Location** | Expo Location |
| **Camera** | Expo Camera |
| **Sensors** | Expo Sensors |
| **Image Picker** | Expo Image Picker |

---

## 📋 Requirements Implemented

### A. JavaScript & Code Structure ✅
- [x] ES6+ Class with Constructor (`services/AuthService.js`)
- [x] Arrow Functions (Throughout the app)
- [x] Array Methods - `map()`, `filter()` (`EmailListScreen.js`)
- [x] Multiple Modules/Files (Organized folder structure)

### B. UI & Components ✅
- [x] Functional Components with Hooks (All screens)
- [x] Class-based Component (`components/StatCard.js`)
- [x] View, Text, TextInput, Button components
- [x] FlatList for email list (`EmailListScreen.js`)
- [x] Custom StyleSheet with consistent design
- [x] Custom Reusable Components (`EmailCard.js`, `CustomButton.js`)
- [x] Icons throughout the UI

### C. Navigation & Application Structure ✅
- [x] React Navigation with 13 screens
- [x] Stack Navigator for screen flow
- [x] Bottom Tab Navigator for main sections
- [x] Custom Headers with gradients
- [x] Navigation Icons in tabs
- [x] Central Theme Management (`context/AppContext.js`)

### D. Data, APIs & State Management ✅
- [x] AsyncStorage for local data (`SettingsScreen.js`)
- [x] REST API Integration (`ComposeEmailScreen.js`, `EmailDetailScreen.js`)
- [x] Loading & Error States
- [x] Firebase CRUD Operations (`services/AuthService.js`)
- [x] Context API for Global State (`context/AppContext.js`)

### E. Device Features ✅
- [x] GPS Location Access (`MapScreen.js`)
- [x] Current Location Display
- [x] Additional Location Marker (Office)
- [x] Camera Integration (`CameraScreen.js`)
- [x] Photo Storage
- [x] Accelerometer Sensor (`SensorScreen.js`)
- [x] Shake Detection Feature

---

## 📁 Project Structure

EmailAssistant/
├── 📄 App.js # Main entry point with navigation
├── 📄 index.js # App registration
├── 📄 package.json # Dependencies
├── 📄 app.json # Expo configuration
│
├── 📁 Screens/ # All app screens
│ ├── LoginScreen.js # User login
│ ├── SignUpScreen.js # User registration
│ ├── HomeScreen.js # Dashboard
│ ├── EmailListScreen.js # Email inbox
│ ├── EmailDetailScreen.js # View email
│ ├── ComposeEmailScreen.js # Write email
│ ├── WorkflowScreen.js # N8N workflow
│ ├── NotificationsScreen.js # Notifications
│ ├── SettingsScreen.js # App settings
│ ├── ProfileScreen.js # User profile
│ ├── MapScreen.js # GPS location
│ ├── CameraScreen.js # Camera feature
│ └── SensorScreen.js # Motion sensor
│
├── 📁 components/ # Reusable components
│ ├── EmailCard.js # Email list item
│ ├── CustomButton.js # Gradient button
│ └── StatCard.js # Statistics card (Class component)
│
├── 📁 context/ # Global state
│ └── AppContext.js # Theme & user context
│
├── 📁 services/ # Backend services
│ ├── firebase.js # Firebase configuration
│ ├── AuthService.js # Authentication logic
│ └── EmailService.js # Email CRUD operations
│
└── 📁 assets/ # Images and icons
├── icon.png
├── splash-icon.png
└── adaptive-icon.png