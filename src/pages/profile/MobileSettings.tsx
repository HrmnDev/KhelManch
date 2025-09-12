import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Phone, Shield, Check } from "lucide-react";

const MobileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentMobile, setCurrentMobile] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const getCurrentUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();
          
          // Note: We'd need to add a mobile field to profiles table
          // For now, this is a placeholder
          setCurrentMobile((profile as any)?.mobile || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getCurrentUserProfile();
  }, []);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMobile) {
      toast({
        variant: "destructive",
        title: "Missing mobile number",
        description: "Please enter a mobile number.",
      });
      return;
    }

    // Basic mobile number validation
    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!mobileRegex.test(newMobile.replace(/\s/g, ""))) {
      toast({
        variant: "destructive",
        title: "Invalid mobile number",
        description: "Please enter a valid mobile number.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // This would typically involve sending an SMS verification
      // For demo purposes, we'll simulate the process
      
      // In a real implementation, you'd call an API or use a service like Twilio
      // const response = await fetch('/api/send-sms-verification', {
      //   method: 'POST',
      //   body: JSON.stringify({ mobile: newMobile })
      // });

      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsVerificationSent(true);
      toast({
        title: "Verification code sent",
        description: `A verification code has been sent to ${newMobile}`,
      });
    } catch (error: any) {
      console.error("Send verification error:", error);
      toast({
        variant: "destructive",
        title: "Failed to send verification",
        description: "Could not send verification code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast({
        variant: "destructive",
        title: "Missing verification code",
        description: "Please enter the verification code.",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // This would typically verify the SMS code with your backend
      // For demo purposes, we'll accept any 6-digit code
      
      if (verificationCode.length !== 6) {
        throw new Error("Verification code must be 6 digits");
      }

      // In a real implementation:
      // const response = await fetch('/api/verify-mobile', {
      //   method: 'POST',
      //   body: JSON.stringify({ mobile: newMobile, code: verificationCode })
      // });

      // Update profile with new mobile number
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Update the profiles table with the new mobile number
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ mobile: newMobile })
          .eq("user_id", user.id);
        
        if (updateError) {
          throw updateError;
        }
        
        setCurrentMobile(newMobile);
        setNewMobile("");
        setVerificationCode("");
        setIsVerificationSent(false);
        
        toast({
          title: "Mobile number verified",
          description: "Your mobile number has been successfully updated.",
        });
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Invalid verification code.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Layout title="Mobile Settings">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Mobile Number
            </CardTitle>
            <CardDescription>
              Add or update your mobile number for account security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isVerificationSent ? (
              <form onSubmit={handleSendVerification} className="space-y-4">
                {currentMobile && (
                  <div className="space-y-2">
                    <Label htmlFor="current-mobile">Current Mobile</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="current-mobile"
                        type="tel"
                        value={currentMobile}
                        disabled
                        className="bg-muted"
                      />
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="new-mobile">
                    {currentMobile ? "New Mobile Number" : "Mobile Number"}
                  </Label>
                  <Input
                    id="new-mobile"
                    type="tel"
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    placeholder="Enter mobile number (e.g., +1234567890)"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Include country code for international numbers
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Verification Code
                  </Label>
                  <Input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code sent to {newMobile}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsVerificationSent(false);
                      setVerificationCode("");
                    }}
                    className="flex-1"
                  >
                    Change Number
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify"}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSendVerification}
                  disabled={isLoading}
                  className="w-full text-sm"
                >
                  Resend Code
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Why add a mobile number?</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Enhanced account security with 2FA</li>
            <li>• Account recovery options</li>
            <li>• Important notifications and alerts</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MobileSettings;