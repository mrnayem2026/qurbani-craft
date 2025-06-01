export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string
          user_id: string
          storage_path: string
          url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          storage_path: string
          url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          storage_path?: string
          url?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          status: string
          price_id: string
          current_period_end: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          status: string
          price_id: string
          current_period_end: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          status?: string
          price_id?: string
          current_period_end?: string
          created_at?: string
        }
      }
    }
  }
}

