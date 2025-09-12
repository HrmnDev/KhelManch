import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Shield } from "lucide-react";

const EmailSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setCurrentEmail(user.email);
      }
    };
    getCurrentUser();
  }, []);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || !password) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both new email and current password.",
      });
      return;
    }

    if (newEmail === currentEmail) {
      toast({
        variant: "destructive",
        title: "Same email",
        description: "The new email is the same as your current email.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: password,
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Current password is incorrect.",
        });
        return;
      }

      // Update the email
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) throw error;

      toast({
        title: "Email update initiated",
        description: "Please check your new email address for a confirmation link.",
      });

      setNewEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Email update error:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Failed to update email address.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Email Settings">
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
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>
              Update your email address. You'll need to verify the new email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-email">Current Email</Label>
                <Input
                  id="current-email"
                  type="email"
                  value={currentEmail}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-email">New Email Address</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Current Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Required for security verification
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Email"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Important Notes:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• You'll receive a confirmation email at your new address</li>
            <li>• Click the link in the email to complete the change</li>
            <li>• Your current email remains active until confirmed</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default EmailSettings;