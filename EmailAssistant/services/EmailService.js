// services/EmailService.js
// ES6 Class for Email CRUD operations
import { database } from './firebase';
import { ref, push, set, get, remove, update, child } from 'firebase/database';

class EmailService {
  constructor() {
    this.emailsRef = 'emails';
  }

  // CREATE - Save new email
  async createEmail(emailData) {
    try {
      const emailsRef = ref(database, this.emailsRef);
      const newEmailRef = push(emailsRef);
      
      const email = {
        id: newEmailRef.key,
        ...emailData,
        createdAt: new Date().toISOString(),
      };

      await set(newEmailRef, email);
      return { success: true, email: email };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // READ - Get all emails
  async getAllEmails() {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, this.emailsRef));
      
      if (snapshot.exists()) {
        // Convert to array using Object.values()
        return Object.values(snapshot.val());
      }
      return [];
    } catch (error) {
      console.error('Get Emails Error:', error);
      return [];
    }
  }

  // UPDATE - Update email
  async updateEmail(emailId, updateData) {
    try {
      const emailRef = ref(database, `${this.emailsRef}/${emailId}`);
      await update(emailRef, updateData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // DELETE - Delete email
  async deleteEmail(emailId) {
    try {
      const emailRef = ref(database, `${this.emailsRef}/${emailId}`);
      await remove(emailRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Filter emails by category using filter()
  filterByCategory(emails, category) {
    return emails.filter(email => email.category === category);
  }

  // Get email subjects using map()
  getSubjects(emails) {
    return emails.map(email => email.subject);
  }
}

export default new EmailService();