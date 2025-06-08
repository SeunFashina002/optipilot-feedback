import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  where,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { app } from '@/config/firebase-config'
import type { Feedback, FeedbackWithId, FeedbackNote, FirebaseService } from './types'

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
        createdAt: Timestamp.now(),
        status: 'pending',
        updatedAt: Timestamp.now(),
        notes: [],
      }
      await addDoc(this.feedbackCollection, feedbackData)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      throw new Error('Failed to submit feedback')
    }
  }

  async getFeedbacks(filters?: {
    type?: string
    status?: string
    hasNotes?: boolean
  }): Promise<FeedbackWithId[]> {
    try {
      let q = query(this.feedbackCollection, orderBy('createdAt', 'desc'))

      // Apply filters if provided
      if (filters?.type) {
        q = query(q, where('type', '==', filters.type))
      }
      if (filters?.status) {
        q = query(q, where('status', '==', filters.status))
      }

      const querySnapshot = await getDocs(q)
      const feedbacks: FeedbackWithId[] = []

      for (const doc of querySnapshot.docs) {
        const data = doc.data()
        const feedback: FeedbackWithId = {
          id: doc.id,
          type: data.type,
          rating: data.rating,
          text: data.text,
          wantsResponse: data.wantsResponse,
          contactInfo: data.contactInfo,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          status: data.status || 'pending',
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
          notes:
            data.notes?.map((note: DocumentData) => ({
              id: note.id,
              content: note.content,
              createdAt: note.createdAt?.toDate?.() || new Date(),
              adminId: note.adminId,
              adminName: note.adminName,
            })) || [],
        }

        // Filter by hasNotes if specified
        if (filters?.hasNotes) {
          if (feedback.notes && feedback.notes.length > 0) {
            feedbacks.push(feedback)
          }
        } else {
          feedbacks.push(feedback)
        }
      }

      return feedbacks
    } catch (error: any) {
      console.error('Error fetching feedbacks:', error)
      if (error.code === 'failed-precondition' && error.message.includes('index')) {
        throw new Error(
          'The database is still setting up indexes. Please try again in a few minutes.',
        )
      }
      throw error
    }
  }

  async updateFeedbackStatus(feedbackId: string, status: string): Promise<void> {
    try {
      const feedbackRef = doc(this.feedbackCollection, feedbackId)
      await updateDoc(feedbackRef, {
        status,
        updatedAt: Timestamp.now(),
      })
    } catch (error) {
      console.error('Error updating feedback status:', error)
      throw new Error('Failed to update feedback status')
    }
  }

  async addNote(feedbackId: string, note: Omit<FeedbackNote, 'id' | 'createdAt'>): Promise<void> {
    try {
      const feedbackRef = doc(this.feedbackCollection, feedbackId)
      const noteWithTimestamp = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: Timestamp.now(),
      }
      await updateDoc(feedbackRef, {
        notes: arrayUnion(noteWithTimestamp),
        updatedAt: Timestamp.now(),
      })
    } catch (error) {
      console.error('Error adding note:', error)
      throw new Error('Failed to add note')
    }
  }

  getFeedbackCounts(feedbacks: FeedbackWithId[]): {
    total: number
    byType: { bug: number; feature: number; other: number }
    byStatus: { pending: number; 'in-progress': number; resolved: number; closed: number }
  } {
    const counts = {
      total: feedbacks.length,
      byType: {
        bug: 0,
        feature: 0,
        other: 0,
      },
      byStatus: {
        pending: 0,
        'in-progress': 0,
        resolved: 0,
        closed: 0,
      },
    }

    feedbacks.forEach((feedback) => {
      counts.byType[feedback.type]++
      counts.byStatus[feedback.status]++
    })

    return counts
  }
}

// Export a singleton instance
export const firebaseService = new FirebaseServiceImpl()
