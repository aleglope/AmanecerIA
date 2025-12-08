import { supabase } from "../supabaseClient";
import { RepositoryError } from "../types/errors";

export interface MoodEntry {
  id: string;
  created_at: string;
  mood_emoji: string;
  mood_label: string;
}

/**
 * Repository interface for mood-related operations
 */
export interface MoodRepository {
  getMoodHistoryDates(userId: string): Promise<string[]>;
  getMoodHistory(userId: string, limit?: number): Promise<MoodEntry[]>;
}

/**
 * Supabase implementation of MoodRepository
 */
class SupabaseMoodRepository implements MoodRepository {
  async getMoodHistoryDates(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("mood_history")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new RepositoryError(
        `Failed to fetch mood history dates: ${error.message}`,
        error.code
      );
    }

    return data ? data.map((m) => m.created_at) : [];
  }

  async getMoodHistory(
    userId: string,
    limit: number = 10
  ): Promise<MoodEntry[]> {
    const { data, error } = await supabase
      .from("mood_history")
      .select("id, created_at, mood_emoji, mood_label")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new RepositoryError(
        `Failed to fetch mood history: ${error.message}`,
        error.code
      );
    }

    return data || [];
  }
}

/**
 * Singleton instance of the mood repository
 */
export const moodRepository: MoodRepository = new SupabaseMoodRepository();
