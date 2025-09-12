-- Create measurements table to store user physical data
CREATE TABLE public.measurements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  measurement_type TEXT NOT NULL, -- 'height', 'weight', 'body_shape', etc.
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL, -- 'cm', 'kg', 'ft', 'lbs', etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own measurements" 
ON public.measurements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own measurements" 
ON public.measurements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own measurements" 
ON public.measurements 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own measurements" 
ON public.measurements 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_measurements_updated_at
BEFORE UPDATE ON public.measurements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create unique constraint to prevent duplicate measurement types per user
CREATE UNIQUE INDEX measurements_user_type_unique 
ON public.measurements (user_id, measurement_type);