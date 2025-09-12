import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Zap, Star, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
      
      <main className="p-4 pt-safe relative z-10 min-h-screen flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-sports-saffron/20 p-6 rounded-full">
              <Trophy className="h-16 w-16 text-sports-saffron" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Welcome to <span className="text-sports-saffron">KhelManch</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your athletic potential with AI-powered sports recommendations and comprehensive performance tracking
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-emerald text-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Target className="h-10 w-10 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Find Your Sport</h3>
              <p className="text-sm text-white/90">AI-powered analysis to match your abilities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-navy text-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Activity className="h-10 w-10 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-sm text-white/90">Monitor your athletic development</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-maroon text-white shadow-maroon">
            <CardContent className="p-6 text-center">
              <Zap className="h-10 w-10 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Compete & Win</h3>
              <p className="text-sm text-white/90">Challenge others on leaderboards</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/signup")}
            size="lg"
            className="bg-sports-saffron hover:bg-sports-saffron/90 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-glow hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Star className="h-6 w-6 mr-2" />
            Get Started
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Star className="h-8 w-8 text-sports-gold animate-pulse" />
        </div>
        <div className="absolute top-40 right-16 opacity-20">
          <Trophy className="h-10 w-10 text-sports-emerald animate-bounce" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-20">
          <Target className="h-6 w-6 text-sports-blue animate-pulse" />
        </div>
      </main>
    </div>
  );
};

export default Landing;