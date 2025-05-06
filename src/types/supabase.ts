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
      profiles: {
        Row: {
          id: string
          email: string
          updated_at: string
          name: string
          title: string
          bio: string
          avatar_url: string | null
        }
        Insert: {
          id: string
          email: string
          updated_at?: string
          name: string
          title: string
          bio: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          updated_at?: string
          name?: string
          title?: string
          bio?: string
          avatar_url?: string | null
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          proficiency: number
          profile_id: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          proficiency: number
          profile_id: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          proficiency?: number
          profile_id?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          link_url: string | null
          profile_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          link_url?: string | null
          profile_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          link_url?: string | null
          profile_id?: string
          created_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          start_date: string
          end_date: string | null
          description: string
          profile_id: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          start_date: string
          end_date?: string | null
          description: string
          profile_id: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          start_date?: string
          end_date?: string | null
          description?: string
          profile_id?: string
        }
      }
    }
  }
}