import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Mail, Shield, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AccountDeletionFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail?: string;
}

export const AccountDeletionFlow = ({ 
  open, 
  onOpenChange, 
  userEmail 
}: AccountDeletionFlowProps) => {
  const [step, setStep] = useState<'warning' | 'send-code' | 'verify-code'>('warning');
  const [email, setEmail] = useState(userEmail || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendCode = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-delete-code', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Verification code sent",
        description: `A 6-digit verification code has been sent to ${email}`,
      });

      setStep('verify-code');
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('delete-account', {
        body: { 
          email,
          code: verificationCode
        }
      });

      if (error) throw error;

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted",
      });

      // Force logout and redirect
      await supabase.auth.signOut();
      window.location.href = '/';
      
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive"
      });
      
      // If code is invalid, allow user to try again
      if (error.message?.includes('Invalid') || error.message?.includes('expired')) {
        setVerificationCode('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setStep('warning');
    setEmail(userEmail || '');
    setVerificationCode('');
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen);
        if (!newOpen) resetFlow();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'warning' && (
            <>
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  <strong>Warning:</strong> This action is permanent and cannot be undone. 
                  All your data, progress, achievements, and measurements will be permanently deleted.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="font-medium">What will be deleted:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Your user account and profile</li>
                  <li>• All test results and measurements</li>
                  <li>• Progress tracking and statistics</li>
                  <li>• Achievements and badges</li>
                  <li>• Leaderboard rankings</li>
                  <li>• All uploaded videos and files</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setStep('send-code')}
                  className="flex-1"
                >
                  Continue with Deletion
                </Button>
              </div>
            </>
          )}

          {step === 'send-code' && (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Security verification required</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  For security, we'll send a verification code to your email address. 
                  You'll need this code to complete the account deletion.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('warning')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || !email}
                  className="flex-1"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isLoading ? 'Sending...' : 'Send Code'}
                </Button>
              </div>
            </>
          )}

          {step === 'verify-code' && (
            <>
              <div className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    We've sent a 6-digit verification code to <strong>{email}</strong>. 
                    Check your email and enter the code below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setVerificationCode(value);
                    }}
                    placeholder="Enter 6-digit code"
                    className="text-center font-mono text-lg tracking-wider"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setStep('send-code')}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                    disabled={isLoading}
                  >
                    Didn't receive the code? Send again
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('send-code')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isLoading ? 'Deleting...' : 'Delete Account'}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};