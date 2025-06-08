import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '@/config/firebase-config'

interface AdminUser {
  uid: string
  email: string
  name: string
}

export const useAdminAuth = defineStore('adminAuth', {
  state: () => ({
    admin: null as AdminUser | null,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
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
      } catch (error) {
        console.error('Sign in error:', error) // Add detailed error logging
        if (error instanceof Error) {
          // Handle Firebase Auth specific errors
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
      this.isLoading = true
      this.error = null

      try {
        const auth = getAuth(app)
        await firebaseSignOut(auth)
        this.admin = null
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to sign out'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async checkAdminStatus() {
      const auth = getAuth(app)
      const user = auth.currentUser

      if (!user) return false

      try {
        const db = getFirestore(app)
        const adminDoc = await getDoc(doc(db, 'admins', user.uid))

        if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
          await firebaseSignOut(auth)
          return false
        }

        this.admin = {
          uid: user.uid,
          email: user.email!,
          name: adminDoc.data().name,
        }
        return true
      } catch {
        return false
      }
    },
  },
})
