import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { app } from '@/config/firebase-config'
import type { Feedback, FirebaseService } from './types'

class FirebaseServiceImpl implements FirebaseService {
  private db = getFirestore(app)
  private feedbackCollection = collection(this.db, 'feedback')

  async submitFeedback(feedback: Omit<Feedback, 'createdAt'>): Promise<void> {
    try {
      const feedbackData = {
        type: feedback.type,
        rating: feedback.rating,
        text: feedback.text,
        wantsResponse: feedback.wantsResponse,
        ...(feedback.contactInfo && { contactInfo: feedback.contactInfo }),
        createdAt: new Date(),
      }
      await addDoc(this.feedbackCollection, feedbackData)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      throw new Error('Failed to submit feedback')
    }
  }
}

// Export a singleton instance
export const firebaseService = new FirebaseServiceImpl()
