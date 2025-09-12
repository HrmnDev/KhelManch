import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeaderboardEntry {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  level: number;
  xp: number;
  total_tests_completed: number;
  streak_days: number;
  total_points: number;
  badges_earned: number;
  rank_position: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeaderboard = async (sortBy: 'age' | 'level' | 'total_points' = 'total_points') => {
    try {
      let orderBy = 'total_points';
      if (sortBy === 'age') orderBy = 'age';
      if (sortBy === 'level') orderBy = 'level';

      const { data, error } = await supabase
        .from('sample_leaderboard')
        .select('*')
        .order(orderBy, { ascending: sortBy === 'age' })
        .order('total_points', { ascending: false }); // Secondary sort

      if (error) throw error;

      setLeaderboard(data || []);
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return {
    leaderboard,
    isLoading,
    fetchLeaderboard
  };
};