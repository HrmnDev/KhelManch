import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Target, Activity, Menu, User, House } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "KhelManch" }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-sports-pattern opacity-40 pointer-events-none z-0" />
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-safe border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 rounded-lg active:bg-gray-100 transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        </div>
        <button className="p-1 rounded-full active:bg-gray-100 transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-sports-teal text-white">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 pt-safe relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 pb-safe bg-white/95 backdrop-blur-sm border-t flex items-center justify-around px-2 z-50 shadow-lg">
        <button 
          onClick={() => navigate("/")}
          className={`flex flex-col items-center gap-1 p-3 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors ${
            isActive("/") ? "text-sports-teal" : "text-foreground/60"
          }`}
        >
          <House className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button 
          onClick={() => navigate("/tests")}
          className={`flex flex-col items-center gap-1 p-3 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors ${
            isActive("/tests") ? "text-sports-teal" : "text-foreground/60"
          }`}
        >
          <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Tests</span>
        </button>
        
        <button 
          onClick={() => navigate("/progress")}
          className={`flex flex-col items-center gap-1 p-3 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors ${
            isActive("/progress") ? "text-sports-teal" : "text-foreground/60"
          }`}
        >
          <Target className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Progress</span>
        </button>
        
        <button 
          onClick={() => navigate("/leaderboards")}
          className={`flex flex-col items-center gap-1 p-3 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors ${
            isActive("/leaderboards") ? "text-sports-teal" : "text-foreground/60"
          }`}
        >
          <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Board</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;