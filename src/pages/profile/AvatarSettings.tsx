import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Camera, Upload, Trash2, User } from "lucide-react";

const AvatarSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getCurrentUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("user_id", user.id)
            .single();
          
          if (profile?.avatar_url) {
            setCurrentAvatar(profile.avatar_url);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getCurrentUserProfile();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleAvatarUpload(file);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file.",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
      });
      return;
    }

    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Delete existing avatar if it exists
      if (currentAvatar) {
        const oldFileName = currentAvatar.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldFileName}`]);
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setCurrentAvatar(publicUrl);
      toast({
        title: "Avatar updated",
        description: "Your profile photo has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Failed to upload avatar.",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!currentAvatar) return;

    setIsDeleting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Delete from storage
      const fileName = currentAvatar.split('/').pop();
      if (fileName) {
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([`${user.id}/${fileName}`]);

        if (deleteError) throw deleteError;
      }

      // Update profile to remove avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setCurrentAvatar("");
      toast({
        title: "Avatar removed",
        description: "Your profile photo has been removed.",
      });
    } catch (error: any) {
      console.error("Avatar delete error:", error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message || "Failed to remove avatar.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Layout title="Profile Photo">
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
              <Camera className="h-5 w-5" />
              Profile Photo
            </CardTitle>
            <CardDescription>
              Upload or change your profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Avatar Display */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={currentAvatar} />
                <AvatarFallback className="bg-sports-teal text-white text-2xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <div className="text-sm text-center text-muted-foreground">
                {currentAvatar ? "Current profile photo" : "No profile photo set"}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : currentAvatar ? "Change Photo" : "Upload Photo"}
              </Button>

              {currentAvatar && (
                <Button
                  variant="destructive"
                  onClick={handleRemoveAvatar}
                  disabled={isDeleting}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Removing..." : "Remove Photo"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Photo Guidelines:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use a clear, recent photo of yourself</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Supported formats: JPG, PNG, WEBP</li>
            <li>• Square images work best</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AvatarSettings;