"use client"

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/entities/User'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true);  
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log('Checking initial session...')
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      console.log('Initial session:', session)
      // Fetch profile directly if user exists
      if (session?.user) {
        try {
          const { User } = await import('@/entities/User')
          console.log('Fetching user profile for:', session.user.email)
          const profile = await User.me()
          setUserProfile(profile)
          console.log('Fetched user profile:', profile)
        } catch (error) {
          console.error('Failed to fetch profile:', error)
          setUserProfile(null)
        }
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Fetch profile directly - no need for refreshUser
          try {
            const { User } = await import('@/entities/User')
            const profile = await User.me()
            setUserProfile(profile)
          } catch (error) {
            console.error('Failed to fetch profile:', error)
            setUserProfile(null)
          }
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    console.log('Signing out user from AuthProvider:', user?.email || 'Unknown User')
    await supabase.auth.signOut()
    setUser(null)
    setUserProfile(null)
  }
  const value = {
    user,
    userProfile,
    loading,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
