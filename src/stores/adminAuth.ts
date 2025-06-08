import { defineStore } from 'pinia'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '@/config/firebase-config'

interface AdminUser {
  uid: string
  email: string
  name: string
}

// Constants
const SESSION_KEY = 'admin_session_timestamp'
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000

export const useAdminAuth = defineStore('adminAuth', {
  state: () => ({
    admin: null as AdminUser | null,
    isLoading: false,
    error: null as string | null,
    isInitialized: false,
  }),

  actions: {
    async init() {
      if (this.isInitialized) return

      const auth = getAuth(app)
      await setPersistence(auth, browserLocalPersistence)

      // Check session expiration
      if (this.isSessionExpired()) {
        await this.signOut()
        return
      }

      // Listen for auth state changes
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const db = getFirestore(app)
            const adminDoc = await getDoc(doc(db, 'admins', user.uid))

            if (adminDoc.exists() && adminDoc.data().role === 'admin') {
              this.admin = {
                uid: user.uid,
                email: user.email!,
                name: adminDoc.data().name,
              }
              // Update session timestamp
              this.updateSessionTimestamp()
            } else {
              this.admin = null
              await firebaseSignOut(auth)
            }
          } catch (error) {
            console.error('Error checking admin status:', error)
            this.admin = null
          }
        } else {
          this.admin = null
        }
        this.isInitialized = true
      })
    },

    async signIn(email: string, password: string) {
      this.isLoading = true
      this.error = null

      try {
        const auth = getAuth(app)
        const db = getFirestore(app)

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid))

        if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
          await firebaseSignOut(auth)
          throw new Error('Not authorized as admin')
        }

        this.admin = {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          name: adminDoc.data().name,
        }

        // Set session timestamp
        this.updateSessionTimestamp()
      } catch (error) {
        console.error('Sign in error:', error)
        if (error instanceof Error) {
          if (error.message.includes('auth/invalid-credential')) {
            this.error = 'Invalid email or password'
          } else if (error.message.includes('auth/too-many-requests')) {
            this.error = 'Too many failed attempts. Please try again later'
          } else if (error.message.includes('auth/network-request-failed')) {
            this.error = 'Network error. Please check your connection'
          } else if (error.message === 'Not authorized as admin') {
            this.error = 'You are not authorized to access the admin portal'
          } else {
            this.error = `Authentication error: ${error.message}`
          }
        } else {
          this.error = 'An unexpected error occurred during sign in'
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async signOut() {
      const auth = getAuth(app)
      await firebaseSignOut(auth)
      this.admin = null
      this.clearSessionTimestamp()
    },

    async checkAdminStatus() {
      // Wait for initialization if not initialized
      if (!this.isInitialized) {
        await this.init()
      }

      // Check session expiration
      if (this.isSessionExpired()) {
        await this.signOut()
        return false
      }

      if (this.admin) return true

      const auth = getAuth(app)
      const user = auth.currentUser

      if (!user) return false

      try {
        const db = getFirestore(app)
        const adminDoc = await getDoc(doc(db, 'admins', user.uid))

        if (adminDoc.exists() && adminDoc.data().role === 'admin') {
          this.admin = {
            uid: user.uid,
            email: user.email!,
            name: adminDoc.data().name,
          }
          return true
        }

        return false
      } catch (error) {
        console.error('Error checking admin status:', error)
        return false
      }
    },

    // Session management helpers
    updateSessionTimestamp() {
      localStorage.setItem(SESSION_KEY, Date.now().toString())
    },

    clearSessionTimestamp() {
      localStorage.removeItem(SESSION_KEY)
    },

    isSessionExpired(): boolean {
      const timestamp = localStorage.getItem(SESSION_KEY)
      if (!timestamp) return true

      const now = Date.now()
      const sessionAge = now - parseInt(timestamp)
      return sessionAge > SESSION_TIMEOUT
    },
  },
})
