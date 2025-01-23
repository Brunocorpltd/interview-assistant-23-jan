export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          user_role: string | null
          roles: string[] | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          user_role?: string | null
          roles?: string[] | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          user_role?: string | null
          roles?: string[] | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // ... other tables remain the same
    }
  }
}