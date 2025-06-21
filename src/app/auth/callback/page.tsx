"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase' // Assuming this is your client-side Supabase client

export default function AuthCallback() {
  const router = useRouter()
  useEffect(() => {
    const supabase = createClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) =>{
      if (event === 'SIGNED_IN') {
        console.log("User signed in, redirecting to dashboard...");
        subscription.unsubscribe()
        router.push('/dashboard')
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