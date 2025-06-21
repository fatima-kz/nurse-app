// import { createClient } from '@/lib/supabase'

// export interface UserProfile {
//   id: string
//   email: string
//   full_name: string
//   registration_date?: string
//   subscription_status?: 'trial' | 'active' | 'expired'
//   subscription_end_date?: string
//   total_questions_answered?: number
//   best_score?: number
//   created_at?: string
//   updated_at?: string
// }

// export class User {  static async login() {
//     const supabase = createClient()
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`
//       }
//     })
    
//     if (error) throw error
//     return data
//   }
//   static async logout() {
//     const supabase = createClient()
//     const { error } = await supabase.auth.signOut()
//     if (error) throw error
//   }
//   static async me(): Promise<UserProfile> {
//     const supabase = createClient()
//     const { data: { user }, error: authError } = await supabase.auth.getUser()
    
//     if (authError || !user) {
//       throw new Error('Not authenticated')
//     }

//     // Get or create user profile
//     let { data: profile, error } = await supabase
//       .from('users')
//       .select('*')
//       .eq('id', user.id)
//       .single()

//     if (error && error.code === 'PGRST116') {
//       // User doesn't exist, create profile
//       const newProfile = {
//         id: user.id,
//         email: user.email!,
//         full_name: user.user_metadata?.full_name || user.email!,
//         registration_date: new Date().toISOString().split('T')[0],
//         subscription_status: 'trial' as const,
//         subscription_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         total_questions_answered: 0,
//         best_score: 0
//       }

//       const { data: createdProfile, error: createError } = await supabase
//         .from('users')
//         .insert(newProfile)
//         .select()
//         .single()

//       if (createError) throw createError
//       profile = createdProfile
//     } else if (error) {
//       throw error
//     }

//     return profile
//   }
//   static async updateMyUserData(updates: Partial<UserProfile>) {
//     const supabase = createClient()
//     const { data: { user }, error: authError } = await supabase.auth.getUser()
    
//     if (authError || !user) {
//       throw new Error('Not authenticated')
//     }

//     const { data, error } = await supabase
//       .from('users')
//       .update(updates)
//       .eq('id', user.id)
//       .select()
//       .single()

//     if (error) throw error
//     return data
//   }
// }

import { createClient } from '@/lib/supabase'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  registration_date?: string
  subscription_status?: 'trial' | 'active' | 'expired'
  subscription_end_date?: string
  total_questions_answered?: number
  best_score?: number
  created_at?: string
  updated_at?: string
}

export class User { 
  static async login() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    return data
  }

  static async logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  static async me(): Promise<UserProfile> {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Not authenticated')
    }

    // Get or create user profile
    let { data: profile } = await supabase // 'profile' needs to remain 'let'
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    const { error } = await supabase // Declare 'error' as 'const' separately
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error && error.code === 'PGRST116') {
      // User doesn't exist, create profile
      const newProfile = {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email!,
        registration_date: new Date().toISOString().split('T')[0],
        subscription_status: 'trial' as const,
        subscription_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total_questions_answered: 0,
        best_score: 0
      }

      const { data: createdProfile, error: createError } = await supabase
        .from('users')
        .insert(newProfile)
        .select()
        .single()

      if (createError) throw createError
      profile = createdProfile as UserProfile // Reassign 'profile'
    } else if (error) {
      throw error
    }

    // Supabase .single() can return null if no row is found.
    // If 'profile' is still null here, it means something went wrong,
    // or the initial select didn't find anything AND the create failed or wasn't needed.
    // Ensure 'profile' is indeed a UserProfile before returning.
    if (!profile) {
        throw new Error("User profile could not be loaded or created.");
    }

    return profile
  }

  static async updateMyUserData(updates: Partial<UserProfile>) {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Not authenticated')
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  }
}