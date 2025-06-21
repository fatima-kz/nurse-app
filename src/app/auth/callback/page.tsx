"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase' // Assuming this is your client-side Supabase client

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      
      if (event === 'SIGNED_IN') {
        subscription.unsubscribe()

          try {
            await import('@/entities/User').then(module => module.User.me())
            
            console.log("Profile exists, redirecting to dashboard.");
            router.push('/dashboard')

          } catch { // Changed from 'catch (profileError)' to just 'catch'
            console.log("No profile found, creating a new one...");
            try {
              const { User } = await import('@/entities/User')
              await User.updateMyUserData({
                registration_date: new Date().toISOString().split('T')[0],
                subscription_status: "trial",
                subscription_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                total_questions_answered: 0,
                best_score: 0
              })
              
              console.log("New profile created, redirecting to dashboard.");
              router.push('/dashboard')

            } catch (updateError) {
              console.error('Error creating user profile:', updateError)
              router.push('/dashboard')
            }
          }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication, please wait...</p>
      </div>
    </div>
  )
}