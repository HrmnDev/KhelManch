import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Activity, Dumbbell, Heart, Timer, Zap, Play, Menu, User, House } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-sports-pattern opacity-40 pointer-events-none z-0" />
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-safe border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 rounded-lg active:bg-gray-100 transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">SportsAssess</h1>
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
        {/* Hero Assessment Section */}
        <button className="w-full mb-6">
          <Card className="bg-sports-orange border-sports-orange shadow-card-sports overflow-hidden relative active:scale-95 transition-all duration-200 hover:shadow-sports">
            <CardContent className="p-8 min-h-[180px] flex items-center justify-center bg-sports-orange">
              <div className="text-center w-full space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-black mb-1 text-white leading-none tracking-tight">UNLEASH</h2>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white/95 leading-none">Your Potential</h2>
                </div>
                <p className="text-xl sm:text-2xl font-bold mb-3 text-white bg-white/20 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                  GET DISCOVERED
                </p>
                <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed font-medium max-w-sm mx-auto">
                  Join thousands of athletes showcasing their skills through comprehensive fitness assessments
                </p>
                <div className="bg-white hover:bg-white/95 text-sports-orange border-0 min-h-[50px] px-10 text-lg font-bold rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  START ASSESSMENT
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Sports Recommendation Card */}
        <button className="w-full mb-6">
          <Card className="bg-gradient-sports text-white shadow-sports overflow-hidden relative active:scale-95 transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-8 min-h-[160px] flex items-center justify-center rounded">
              <div className="text-center w-full space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight tracking-wide">FIND YOUR</h2>
                  <h3 className="text-xl sm:text-2xl font-bold text-white/95 leading-tight">Perfect Sport</h3>
                </div>
                <p className="text-sm sm:text-base text-white/85 font-medium mb-4 max-w-xs mx-auto leading-relaxed">
                  AI-powered matching based on your unique athletic profile
                </p>
                <div className="bg-sports-orange hover:bg-sports-orange/90 text-white border-0 min-h-[48px] px-8 text-base font-bold rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  DISCOVER SPORTS
                </div>
              </div>
              {/* Enhanced Decorative Elements */}
              <div className="absolute -right-3 -top-3 opacity-20">
                <div className="flex flex-wrap gap-2">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                  <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Quick Measurements Section */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1">Quick Measurements</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
            <button className="flex-shrink-0">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports w-28 sm:w-32">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Activity className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-xs sm:text-sm">Height</h4>
                </CardContent>
              </Card>
            </button>
            <button className="flex-shrink-0">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports w-28 sm:w-32">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Heart className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-xs sm:text-sm">Weight</h4>
                </CardContent>
              </Card>
            </button>
            <button className="flex-shrink-0">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports w-28 sm:w-32">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <User className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-xs sm:text-sm">Body Shape</h4>
                </CardContent>
              </Card>
            </button>
          </div>
        </section>

        {/* Sport Test Section */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1">Sport Test</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
            <button className="flex-shrink-0">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports w-28 sm:w-32">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Dumbbell className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-xs sm:text-sm">Dead Lift</h4>
                </CardContent>
              </Card>
            </button>
            <button className="flex-shrink-0">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports w-28 sm:w-32">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-xs sm:text-sm">Athletic</h4>
                </CardContent>
              </Card>
            </button>
          </div>
        </section>

        {/* Progress and Leaderboards Section */}
        <section className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-4 sm:p-6 text-center min-h-[120px] flex flex-col justify-center">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-sm sm:text-lg">My Progress</h4>
                </CardContent>
              </Card>
            </button>
            <button className="w-full">
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-4 sm:p-6 text-center min-h-[120px] flex flex-col justify-center">
                  <Trophy className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-sm sm:text-lg">Leaderboards</h4>
                </CardContent>
              </Card>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 pb-safe bg-white/95 backdrop-blur-sm border-t flex items-center justify-around px-2 z-50 shadow-lg">
        <button className="flex flex-col items-center gap-1 p-3 text-sports-teal min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors">
          <House className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors">
          <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Tests</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors">
          <Target className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Progress</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 p-3 text-foreground/60 min-h-[44px] min-w-[44px] rounded-lg active:bg-gray-100 transition-colors">
          <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs font-medium">Board</span>
        </button>
      </div>
    </div>;
};
export default Index;