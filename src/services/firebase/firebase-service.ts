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
import { v4 as uuidv4 } from 'uuid'

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
      if (filters?.hasNotes) {
        q = query(q, where('notes', '!=', []))
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
        feedbacks.push(feedback)
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
    const feedbackRef = doc(this.feedbackCollection, feedbackId)
    const noteWithMeta = {
      id: uuidv4(),
      content: note.content,
      createdAt: Timestamp.now(),
      adminId: note.adminId,
      adminName: note.adminName,
    }
    await updateDoc(feedbackRef, {
      notes: arrayUnion(noteWithMeta),
      updatedAt: Timestamp.now(),
    })
  }

  async deleteNote(feedbackId: string, noteId: string) {
    const feedbackRef = doc(this.feedbackCollection, feedbackId)
    // Get current notes
    const feedbackSnap = await getDocs(
      query(this.feedbackCollection, where('__name__', '==', feedbackId)),
    )
    const feedbackDoc = feedbackSnap.docs[0]
    if (!feedbackDoc) return
    const notes = feedbackDoc.data().notes || []
    const updatedNotes = notes.filter((n: any) => n.id !== noteId)
    await updateDoc(feedbackRef, {
      notes: updatedNotes,
      updatedAt: Timestamp.now(),
    })
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
