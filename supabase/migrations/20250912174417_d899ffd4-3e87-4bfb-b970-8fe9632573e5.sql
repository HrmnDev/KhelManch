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

-- Create sample leaderboard table for demo purposes (not tied to real users)
CREATE TABLE public.sample_leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  total_tests_completed INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  badges_earned INTEGER DEFAULT 0,
  rank_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample leaderboard data
INSERT INTO public.sample_leaderboard (full_name, age, gender, level, xp, total_tests_completed, streak_days, total_points, badges_earned, rank_position) VALUES
  ('Alex Johnson', 25, 'male', 15, 4250, 28, 12, 18750, 12, 1),
  ('Sarah Chen', 28, 'female', 12, 3680, 22, 8, 16200, 9, 2),
  ('Mike Rodriguez', 22, 'male', 18, 5120, 35, 15, 22400, 15, 3),
  ('Emma Thompson', 31, 'female', 10, 2950, 18, 5, 13850, 7, 4),
  ('David Kim', 26, 'male', 14, 3890, 26, 10, 17250, 11, 5),
  ('Lisa Wang', 24, 'female', 16, 4420, 31, 14, 19600, 13, 6),
  ('Ryan O Connor', 29, 'male', 8, 2240, 14, 3, 11200, 5, 7),
  ('Priya Patel', 27, 'female', 13, 3560, 24, 7, 16100, 10, 8),
  ('James Wilson', 23, 'male', 20, 5680, 42, 18, 25200, 18, 9),
  ('Maria Garcia', 30, 'female', 9, 2650, 16, 4, 12400, 6, 10);

-- Enable RLS on sample_leaderboard (viewable by everyone)
ALTER TABLE public.sample_leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sample leaderboard is viewable by everyone" 
ON public.sample_leaderboard 
FOR SELECT 
USING (true);