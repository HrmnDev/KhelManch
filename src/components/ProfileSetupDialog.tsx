import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAge?: number;
  currentGender?: string;
  onSave: () => void;
}

export const ProfileSetupDialog = ({
  open,
  onOpenChange,
  currentAge,
  currentGender,
  onSave
}: ProfileSetupDialogProps) => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentAge) setAge(currentAge.toString());
    if (currentGender) setGender(currentGender);
  }, [currentAge, currentGender, open]);

  const handleSave = async () => {
    if (!age || !gender) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const numericAge = parseInt(age);
    if (isNaN(numericAge) || numericAge < 13 || numericAge > 100) {
      toast({
        title: "Error",
        description: "Please enter a valid age between 13 and 100",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Set leaderboard visibility based on gender selection
      const isLeaderboardVisible = gender !== 'rather_not_say';

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          age: numericAge,
          gender: gender,
          is_leaderboard_visible: isLeaderboardVisible
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      onSave();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="13"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="rather_not_say">Rather not say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {gender === 'rather_not_say' && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Privacy Notice:</strong> If you select "Rather not say", you will not be visible on the public leaderboards. Your progress will still be tracked privately.
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-sports-emerald/10 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-sports-emerald">
                This information helps us provide personalized recommendations and age-appropriate leaderboards.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!age || !gender || isLoading}
              className="flex-1 bg-sports-emerald text-white hover:opacity-90"
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};