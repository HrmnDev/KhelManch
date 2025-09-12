-- Add age and gender to profiles table
ALTER TABLE public.profiles 
ADD COLUMN age INTEGER,
ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'rather_not_say')),
ADD COLUMN is_leaderboard_visible BOOLEAN DEFAULT true;

-- Create user_stats table for progress tracking
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  total_tests_completed INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  rank_position INTEGER,
  badges_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on user_stats
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for user_stats
CREATE POLICY "Users can view their own stats" 
ON public.user_stats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" 
ON public.user_stats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
ON public.user_stats 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for leaderboard visibility (users can see stats of others who opted in)
CREATE POLICY "Leaderboard stats are visible to all" 
ON public.user_stats 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = user_stats.user_id 
    AND p.is_leaderboard_visible = true 
    AND p.gender != 'rather_not_say'
  )
);

-- Create trigger for user_stats timestamps
CREATE TRIGGER update_user_stats_updated_at
BEFORE UPDATE ON public.user_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample users and their stats for leaderboard
INSERT INTO public.profiles (user_id, full_name, age, gender, is_leaderboard_visible) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Alex Johnson', 25, 'male', true),
  ('00000000-0000-0000-0000-000000000002', 'Sarah Chen', 28, 'female', true),
  ('00000000-0000-0000-0000-000000000003', 'Mike Rodriguez', 22, 'male', true),
  ('00000000-0000-0000-0000-000000000004', 'Emma Thompson', 31, 'female', true),
  ('00000000-0000-0000-0000-000000000005', 'David Kim', 26, 'male', true),
  ('00000000-0000-0000-0000-000000000006', 'Lisa Wang', 24, 'female', true),
  ('00000000-0000-0000-0000-000000000007', 'Ryan O Connor', 29, 'male', true),
  ('00000000-0000-0000-0000-000000000008', 'Priya Patel', 27, 'female', true),
  ('00000000-0000-0000-0000-000000000009', 'James Wilson', 23, 'male', true),
  ('00000000-0000-0000-0000-000000000010', 'Maria Garcia', 30, 'female', true);

-- Insert corresponding user stats for sample users
INSERT INTO public.user_stats (user_id, level, xp, total_tests_completed, streak_days, total_points, badges_earned, rank_position) VALUES
  ('00000000-0000-0000-0000-000000000001', 15, 4250, 28, 12, 18750, 12, 1),
  ('00000000-0000-0000-0000-000000000002', 12, 3680, 22, 8, 16200, 9, 2),
  ('00000000-0000-0000-0000-000000000003', 18, 5120, 35, 15, 22400, 15, 3),
  ('00000000-0000-0000-0000-000000000004', 10, 2950, 18, 5, 13850, 7, 4),
  ('00000000-0000-0000-0000-000000000005', 14, 3890, 26, 10, 17250, 11, 5),
  ('00000000-0000-0000-0000-000000000006', 16, 4420, 31, 14, 19600, 13, 6),
  ('00000000-0000-0000-0000-000000000007', 8, 2240, 14, 3, 11200, 5, 7),
  ('00000000-0000-0000-0000-000000000008', 13, 3560, 24, 7, 16100, 10, 8),
  ('00000000-0000-0000-0000-000000000009', 20, 5680, 42, 18, 25200, 18, 9),
  ('00000000-0000-0000-0000-000000000010', 9, 2650, 16, 4, 12400, 6, 10);