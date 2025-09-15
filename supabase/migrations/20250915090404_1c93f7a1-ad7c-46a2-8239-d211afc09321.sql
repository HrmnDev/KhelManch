-- Add analysis-specific fields to videos table
ALTER TABLE public.videos 
ADD COLUMN IF NOT EXISTS exercise_type TEXT CHECK (exercise_type IN ('deadlift', 'situp', 'general')),
ADD COLUMN IF NOT EXISTS rep_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS form_score NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS feedback_points JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS pose_data JSONB DEFAULT '{}'::jsonb;

-- Update existing videos to have exercise_type as general if null
UPDATE public.videos 
SET exercise_type = 'general' 
WHERE exercise_type IS NULL;