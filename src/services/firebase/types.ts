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
}

export interface FirebaseService {
  submitFeedback: (feedback: Omit<Feedback, 'createdAt'>) => Promise<void>
  // Add more methods as needed
}
