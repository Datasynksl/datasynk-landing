export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      datasets: {
        Row: {
          id: string
          name: string
          description: string
          file_path: string
          file_type: string
          size: number | null
          parameters: Json | null
          sample_data: Json | null
          tags: string[] | null
          created_at: string
          updated_at: string | null
          access_count: number
          view_count: number
        }
        Insert: {
          id?: string
          name: string
          description: string
          file_path: string
          file_type: string
          size?: number | null
          parameters?: Json | null
          sample_data?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string | null
          access_count?: number
          view_count?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string
          file_path?: string
          file_type?: string
          size?: number | null
          parameters?: Json | null
          sample_data?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string | null
          access_count?: number
          view_count?: number
        }
      }
    }
  }
}

