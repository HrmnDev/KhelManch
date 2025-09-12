import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trophy, Target, Activity, Dumbbell, Heart, Timer, Zap, Play, Menu, User, House, Star, Crown, Flame, TrendingUp, Award, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { AchievementBadge } from "@/components/AchievementBadge";
import { StatCard } from "@/components/StatCard";
const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Mock user data - in real app this would come from state/API
  const userData = {
    level: 12,
    xp: 2850,
    maxXp: 3000,
    streak: 7,
    totalPoints: 15420,
    completedTests: 23,
    achievements: 8
  };

  return <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
      
      {/* Header with Gamified User Stats */}
      <header className="flex items-center justify-between p-4 pt-safe border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 rounded-lg active:bg-gray-100 transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">KhelManch</h1>
            <div className="flex items-center gap-2 text-xs">
              <Crown className="h-3 w-3 text-sports-blue" />
              <span className="font-semibold text-sports-blue">Level {userData.level}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2 bg-muted/50 px-2 py-1 rounded-lg">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="scale-75"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Daily Streak */}
          <div className="hidden sm:flex items-center gap-1 bg-sports-blue/10 text-sports-blue px-2 py-1 rounded-lg">
            <Flame className="h-4 w-4" />
            <span className="font-bold text-sm">{userData.streak}</span>
          </div>
          
          {/* XP Display */}
          <div className="hidden sm:block min-w-[80px]">
            <ProgressBar 
              value={userData.xp} 
              max={userData.maxXp} 
              color="emerald" 
              showPercentage={false}
              className="text-xs"
            />
            <div className="text-xs text-center mt-1 font-semibold text-sports-blue">
              {userData.xp}/{userData.maxXp} XP
            </div>
          </div>
          
          <button className="p-1 rounded-full active:bg-gray-100 transition-colors relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-sports-saffron text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-sports-emerald hover:bg-sports-emerald text-[10px] font-bold">
              {userData.achievements}
            </Badge>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 pt-safe relative z-10">
        
        {/* Mobile Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:hidden">
          <div className="flex items-center gap-2 bg-sports-blue/10 text-sports-blue p-3 rounded-lg">
            <Flame className="h-5 w-5" />
            <div>
              <div className="font-bold">{userData.streak} Days</div>
              <div className="text-xs opacity-75">Streak</div>
            </div>
          </div>
          <div className="bg-sports-grey/10 text-sports-grey p-3 rounded-lg">
            <div className="font-bold">{userData.totalPoints.toLocaleString()}</div>
            <div className="text-xs opacity-75">Total Points</div>
          </div>
        </div>

        {/* Sports Recommendation Card */}
        <button className="w-full mb-6 group" onClick={() => navigate("/sport-recommendation")}>
          <Card className="bg-gradient-emerald text-white shadow-card-sports overflow-hidden relative hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95">
            <CardContent className="p-6 min-h-[140px] flex items-center justify-center rounded relative">
              {/* Sports Background Image - More Prominent */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 rounded-lg"
                style={{ backgroundImage: 'url(/lovable-uploads/005f6371-8cfa-48cb-8694-f2e1e1c2a90f.png)' }}
              />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-sports-emerald/80 to-sports-teal/80 rounded-lg" />
              
              <div className="text-center w-full relative z-20">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight text-white drop-shadow-lg">🎯 Find Your Perfect Sport</h2>
                <p className="text-sm sm:text-base text-white/95 mb-4 font-medium leading-relaxed drop-shadow-md">
                  AI-powered analysis matches your unique abilities to the ideal sports for maximum success
                </p>
                <div className="bg-white/25 hover:bg-white/35 backdrop-blur-md text-white border-2 border-white/40 min-h-[44px] px-6 text-base font-semibold rounded-md flex items-center justify-center transition-all group-hover:bg-white/45 shadow-lg">
                  <Zap className="h-5 w-5 mr-2 text-white" />
                  Discover My Sport
                </div>
              </div>
              
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-80 z-30">
                <div className="flex flex-wrap gap-2">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300 animate-pulse" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-200 text-yellow-200 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard 
            icon={Target}
            label="Completed"
            value={userData.completedTests}
            trend="up"
            trendValue="+3"
            color="emerald"
          />
          <StatCard 
            icon={TrendingUp}
            label="Rank"
            value="#142"
            trend="up" 
            trendValue="+25"
            color="gold"
          />
          <StatCard 
            icon={Award}
            label="Badges"
            value={userData.achievements}
            color="saffron"
          />
        </div>


        {/* Achievement Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground px-1 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-sports-gold" />
            Recent Achievements
          </h3>
          <Button variant="ghost" size="sm" className="text-sports-blue hover:bg-sports-blue/10">
            View All
          </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
            <AchievementBadge
              icon={Flame}
              title="Week Warrior"
              description="7-day streak!"
              unlocked={true}
              className="flex-shrink-0 w-48"
            />
            <AchievementBadge
              icon={Dumbbell}
              title="Strength Master"
              description="Complete 5 power tests"
              unlocked={false}
              progress={3}
              maxProgress={5}
              className="flex-shrink-0 w-48"
            />
            <AchievementBadge
              icon={Target}
              title="Precision Pro"
              description="Perfect assessment score"
              unlocked={false}
              progress={2}
              maxProgress={3}
              className="flex-shrink-0 w-48"
            />
          </div>
        </section>

        {/* Quick Measurements Section */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
            <Activity className="h-5 w-5 text-sports-navy" />
            Quick Measurements
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
            <button className="flex-shrink-0 group" onClick={() => navigate("/height-measurement")}>
              <Card className="bg-sports-navy text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-40 sm:w-44 relative overflow-hidden">
                <CardContent className="p-4 text-center min-h-[140px] flex flex-col justify-center relative z-10">
                  <Activity className="h-9 w-9 sm:h-10 sm:w-10 mx-auto mb-2 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-base">Height</h4>
                  <div className="text-[10px] text-white/60 mt-1">+10 XP</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
            <button className="flex-shrink-0 group" onClick={() => navigate("/weight-measurement")}>
              <Card className="bg-sports-maroon text-white shadow-maroon hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-40 sm:w-44 relative overflow-hidden">
                <CardContent className="p-4 text-center min-h-[140px] flex flex-col justify-center relative z-10">
                  <Heart className="h-9 w-9 sm:h-10 sm:w-10 mx-auto mb-2 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-base">Weight</h4>
                  <div className="text-[10px] text-white/60 mt-1">+10 XP</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
            <button className="flex-shrink-0 group" onClick={() => navigate("/body-shape")}>
              <Card className="bg-sports-emerald text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-40 sm:w-44 relative overflow-hidden">
                <CardContent className="p-4 text-center min-h-[140px] flex flex-col justify-center relative z-10">
                  <User className="h-9 w-9 sm:h-10 sm:w-10 mx-auto mb-2 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-base">Body Shape</h4>
                  <div className="text-[10px] text-white/60 mt-1">+15 XP</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
          </div>
        </section>

        {/* Sport Test Section */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
            <Zap className="h-5 w-5 text-sports-gold" />
            Sport Tests
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
            <button className="flex-shrink-0 group" onClick={() => navigate("/power-lifting")}>
              <Card className="bg-sports-terracotta text-white shadow-maroon hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-40 sm:w-44 relative overflow-hidden">
                <CardContent className="p-4 text-center min-h-[140px] flex flex-col justify-center relative z-10">
                  <Dumbbell className="h-9 w-9 sm:h-10 sm:w-10 mx-auto mb-2 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-base">Power Lifting</h4>
                  <div className="text-[10px] text-white/60 mt-1">+25 XP</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
            <button className="flex-shrink-0 group" onClick={() => navigate("/athletic-test")}>
              <Card className="bg-sports-gold text-white shadow-gold hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-40 sm:w-44 relative overflow-hidden">
                <CardContent className="p-4 text-center min-h-[140px] flex flex-col justify-center relative z-10">
                  <Zap className="h-9 w-9 sm:h-10 sm:w-10 mx-auto mb-2 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-base">Athletic</h4>
                  <div className="text-[10px] text-white/60 mt-1">+30 XP</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
          </div>
        </section>

        {/* Progress and Leaderboards Section */}
        <section className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full group" onClick={() => navigate("/progress")}>
              <Card className="bg-gradient-navy text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden">
                <CardContent className="p-4 sm:p-6 text-center min-h-[120px] flex flex-col justify-center relative z-10">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-lg">My Progress</h4>
                  <div className="text-xs text-white/60 mt-1">Track improvement</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
            <button className="w-full group" onClick={() => navigate("/leaderboards")}>
              <Card className="bg-gradient-maroon text-white shadow-maroon hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden">
                <CardContent className="p-4 sm:p-6 text-center min-h-[120px] flex flex-col justify-center relative z-10">
                  <Trophy className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 group-hover:animate-pulse" />
                  <h4 className="font-semibold text-sm sm:text-lg">Leaderboards</h4>
                  <div className="text-xs text-white/60 mt-1">Rank #142</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 pb-safe bg-white/95 backdrop-blur-sm border-t flex items-center justify-around px-2 z-50 shadow-lg">
        <button className="flex flex-col items-center gap-1 p-3 text-sports-saffron min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors">
          <House className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button 
          onClick={() => navigate("/tests")}
          className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors"
        >
          <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Tests</span>
        </button>
        
        <button 
          onClick={() => navigate("/progress")}
          className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors"
        >
          <Target className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Progress</span>
        </button>
        
        <button 
          onClick={() => navigate("/leaderboards")}
          className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors"
        >
          <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Board</span>
        </button>
      </div>
    </div>;
};
export default Index;