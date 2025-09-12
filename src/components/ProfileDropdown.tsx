import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  LogOut, 
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, user } = useUserProfile();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      
      // Force navigation and reload to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive", 
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-full active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sports-teal focus:ring-offset-2">
            <UserAvatar />
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 bg-background border-border">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Account</p>
              <p className="text-xs leading-none text-muted-foreground">
                Manage your profile settings
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate("/profile/avatar")} className="cursor-pointer">
            <Camera className="mr-2 h-4 w-4" />
            <span>Profile Photo</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate("/profile/email")} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            <span>Email Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate("/profile/password")} className="cursor-pointer">
            <Lock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate("/profile/mobile")} className="cursor-pointer">
            <Phone className="mr-2 h-4 w-4" />
            <span>Mobile Number</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;