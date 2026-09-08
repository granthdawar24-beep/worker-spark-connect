export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bank_details: {
        Row: {
          account_holder_name: string
          account_last4: string
          bank_name: string
          branch: string | null
          created_at: string
          id: string
          ifsc: string
          verified: boolean
          verified_at: string | null
          worker_id: string
        }
        Insert: {
          account_holder_name: string
          account_last4: string
          bank_name: string
          branch?: string | null
          created_at?: string
          id?: string
          ifsc: string
          verified?: boolean
          verified_at?: string | null
          worker_id: string
        }
        Update: {
          account_holder_name?: string
          account_last4?: string
          bank_name?: string
          branch?: string | null
          created_at?: string
          id?: string
          ifsc?: string
          verified?: boolean
          verified_at?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      kyc_records: {
        Row: {
          created_at: string
          document_last4: string
          document_type: string
          id: string
          name_on_document: string
          route: string
          verified: boolean
          verified_at: string | null
          worker_id: string
        }
        Insert: {
          created_at?: string
          document_last4: string
          document_type: string
          id?: string
          name_on_document: string
          route: string
          verified?: boolean
          verified_at?: string | null
          worker_id: string
        }
        Update: {
          created_at?: string
          document_last4?: string
          document_type?: string
          id?: string
          name_on_document?: string
          route?: string
          verified?: boolean
          verified_at?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          amount_inr: number
          created_at: string
          id: string
          paid_at: string | null
          status: string
          valid_until: string | null
          worker_id: string
        }
        Insert: {
          amount_inr?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          status?: string
          valid_until?: string | null
          worker_id: string
        }
        Update: {
          amount_inr?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          status?: string
          valid_until?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      skill_claims: {
        Row: {
          certificate_name: string | null
          created_at: string
          evidence_notes: string | null
          id: string
          issuing_body: string | null
          route: string
          status: string
          trade: string
          worker_id: string
          years_experience: number | null
        }
        Insert: {
          certificate_name?: string | null
          created_at?: string
          evidence_notes?: string | null
          id?: string
          issuing_body?: string | null
          route: string
          status?: string
          trade: string
          worker_id: string
          years_experience?: number | null
        }
        Update: {
          certificate_name?: string | null
          created_at?: string
          evidence_notes?: string | null
          id?: string
          issuing_body?: string | null
          route?: string
          status?: string
          trade?: string
          worker_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      worker_profiles: {
        Row: {
          address: string | null
          category: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          mobile: string
          preferred_language: string
          stage: string
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id: string
          mobile: string
          preferred_language?: string
          stage?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          mobile?: string
          preferred_language?: string
          stage?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
