// services/AuthService.js
// ES6 Class with constructor and methods (Requirement A.1)
import { database } from './firebase';
import { ref, push, set, get, child } from 'firebase/database';

class AuthService {
  constructor() {
    this.usersRef = 'users';
  }

  // CREATE - Register new user
  async signUp(fullName, email, password) {
    try {
      // Check if email already exists
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        return { success: false, error: 'Email already registered!' };
      }

      // Create new user
      const usersRef = ref(database, this.usersRef);
      const newUserRef = push(usersRef);
      
      const userData = {
        id: newUserRef.key,
        fullName: fullName,
        email: email.toLowerCase(),
        password: password, // In real app, hash this!
        createdAt: new Date().toISOString(),
      };

      await set(newUserRef, userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('SignUp Error:', error);
      return { success: false, error: error.message };
    }
  }

  // READ - Login user
  async login(email, password) {
    try {
      const user = await this.getUserByEmail(email.toLowerCase());
      
      if (!user) {
        return { success: false, error: 'User not found! Please sign up first.' };
      }

      if (user.password !== password) {
        return { success: false, error: 'Incorrect password!' };
      }

      return { success: true, user: user };
    } catch (error) {
      console.error('Login Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper - Get user by email
  async getUserByEmail(email) {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, this.usersRef));
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        // Use Object.values() and find() - Array methods (Requirement A.1)
        const userArray = Object.values(users);
        const foundUser = userArray.find(user => user.email === email.toLowerCase());
        return foundUser || null;
      }
      return null;
    } catch (error) {
      console.error('Get User Error:', error);
      return null;
    }
  }

  // READ - Get all users
  async getAllUsers() {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, this.usersRef));
      
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    } catch (error) {
      console.error('Get All Users Error:', error);
      return [];
    }
  }
}

// Export single instance
export default new AuthService();