import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserStats {
  id: string;
  user_id: string;
  level: number;
  xp: number;
  total_tests_completed: number;
  streak_days: number;
  total_points: number;
  rank_position?: number;
  badges_earned: number;
  created_at: string;
  updated_at: string;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Create initial stats for new users
        const { data: newStats, error: createError } = await supabase
          .from('user_stats')
          .insert({
            user_id: user.id,
            level: 1,
            xp: 0,
            total_tests_completed: 0,
            streak_days: 0,
            total_points: 0,
            badges_earned: 0
          })
          .select()
          .single();

        if (createError) throw createError;
        setStats(newStats);
      } else {
        setStats(data);
      }
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
      toast({
        title: "Error",
        description: "Failed to load user statistics",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = async (updates: Partial<UserStats>): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setStats(data);
    } catch (error: any) {
      console.error('Error updating user stats:', error);
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    updateStats,
    fetchStats
  };
};