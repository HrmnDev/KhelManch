import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  Activity, 
  Dumbbell, 
  Heart, 
  Timer, 
  Zap,
  Play,
  Menu,
  User,
  House
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Menu className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">SportsAssess</h1>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-sports-teal text-white">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Sports Recommendation Card */}
        <Card className="mb-6 bg-gradient-sports text-white shadow-sports overflow-hidden relative mx-auto max-w-sm">
          <CardContent className="p-4 h-32">
            <div className="text-center">
              <h2 className="text-lg font-bold mb-3">Sports Recommendation System</h2>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-sports-orange hover:bg-sports-orange/90 text-white border-0"
              >
                Click Here
              </Button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -right-2 -top-2 opacity-10">
              <div className="flex flex-wrap gap-1">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Measurements Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Measurements</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200 flex-shrink-0 w-32">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Height</h4>
              </CardContent>
            </Card>
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200 flex-shrink-0 w-32">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Weight</h4>
              </CardContent>
            </Card>
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200 flex-shrink-0 w-32">
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Body Shape</h4>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sport Test Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Sport Test</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200 flex-shrink-0 w-32">
              <CardContent className="p-4 text-center">
                <Dumbbell className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Dead Lift</h4>
              </CardContent>
            </Card>
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200 flex-shrink-0 w-32">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Athletic</h4>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress and Leaderboards Section */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-3" />
                <h4 className="font-semibold text-lg">My Progress</h4>
              </CardContent>
            </Card>
            <Card className="bg-sports-teal text-white shadow-card-sports hover:shadow-sports transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-3" />
                <h4 className="font-semibold text-lg">Leaderboards</h4>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-4 z-50">
        <button className="flex flex-col items-center gap-1 p-2 text-sports-teal">
          <House className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-2 text-foreground/60">
          <Activity className="h-6 w-6" />
          <span className="text-xs font-medium">Tests</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-2 text-foreground/60">
          <Target className="h-6 w-6" />
          <span className="text-xs font-medium">Progress</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-2 text-foreground/60">
          <Trophy className="h-6 w-6" />
          <span className="text-xs font-medium">Leaderboard</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
