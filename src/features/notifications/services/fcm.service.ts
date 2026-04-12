import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../../../config/firebase.config';
import { apiClient } from '../../../config/axios.config';

class FcmService {
  private readonly VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

  async requestPermissionAndGetToken(): Promise<string | null> {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }

      if (!this.VAPID_KEY || this.VAPID_KEY === 'YOUR_VAPID_KEY_HERE') {
        console.warn('VAPID Key is missing or using placeholder in .env');
        return null;
      }

      const token = await getToken(messaging, {
        vapidKey: this.VAPID_KEY,
      });

      if (token) {
        await this.registerTokenWithBackend(token);
        return token;
      } else {
        console.warn(
          'No registration token available. Request permission to generate one.',
        );
        return null;
      }
    } catch (error) {
      console.error('An error occurred while retrieving token:', error);
      return null;
    }
  }

  private async registerTokenWithBackend(token: string) {
    try {
      await apiClient.post('/notifications/token', { token });
      console.log('FCM Token registered with backend');
    } catch (error) {
      console.error('Failed to register FCM token with backend', error);
    }
  }

  onMessageListener() {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log('Foreground message received:', payload);
        resolve(payload);
      });
    });
  }
}

export const fcmService = new FcmService();
