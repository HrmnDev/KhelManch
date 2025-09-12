import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

interface UserAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const UserAvatar = ({ className = "", size = "md" }: UserAvatarProps) => {
  const { profile } = useUserProfile();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-16 w-16",
    xl: "h-32 w-32"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8", 
    xl: "h-16 w-16"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage 
        src={profile?.avatar_url || undefined} 
        alt="Profile picture"
      />
      <AvatarFallback className="bg-sports-teal text-white">
        <User className={iconSizes[size]} />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;