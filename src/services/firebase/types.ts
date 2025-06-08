export interface Feedback {
  type: 'bug' | 'feature' | 'other'
  rating: 'terrible' | 'bad' | 'okay' | 'good' | 'amazing'
  text: string
  wantsResponse: boolean
  contactInfo?: {
    name: string
    email: string
  }
  createdAt: Date
  status: 'pending' | 'in-progress' | 'resolved' | 'closed'
  updatedAt: Date
}

export interface FeedbackNote {
  id: string
  content: string
  createdAt: Date
  adminId: string
  adminName: string
}

export interface FeedbackWithId extends Feedback {
  id: string
  notes: FeedbackNote[]
}

export interface FirebaseService {
  submitFeedback(feedback: Omit<Feedback, 'createdAt'>): Promise<void>
  getFeedbacks(filters?: {
    type?: string
    status?: string
    hasNotes?: boolean
  }): Promise<FeedbackWithId[]>
  updateFeedbackStatus(feedbackId: string, status: string): Promise<void>
  addNote(feedbackId: string, note: Omit<FeedbackNote, 'id' | 'createdAt'>): Promise<void>
  getFeedbackCounts(feedbacks: FeedbackWithId[]): {
    total: number
    byType: { bug: number; feature: number; other: number }
    byStatus: { pending: number; 'in-progress': number; resolved: number; closed: number }
  }
  // Add more methods as needed
}
