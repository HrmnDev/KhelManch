-- Create table for storing account deletion verification codes
CREATE TABLE public.delete_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on delete_codes (only edge functions should access this)
ALTER TABLE public.delete_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to prevent public access (only service role can access)
CREATE POLICY "Only service role can access delete codes" 
ON public.delete_codes 
USING (false);