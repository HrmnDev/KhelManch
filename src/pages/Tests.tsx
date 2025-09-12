import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Dumbbell, Zap, Heart, User, Target, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tests = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Tests">
      <div className="min-h-screen bg-background relative">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
        
        <div className="relative z-10 space-y-6">
          {/* Hero Section */}
          <Card className="bg-gradient-emerald text-white shadow-card-sports overflow-hidden relative hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 min-h-[140px] flex items-center justify-center rounded relative">
              {/* Sports Background Image */}
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
                <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight text-white drop-shadow-lg">🏃‍♂️ Athletic Tests</h2>
                <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed drop-shadow-md">
                  Comprehensive fitness and skill assessments to measure your athletic capabilities
                </p>
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

          {/* Quick Measurements */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
              <Activity className="h-5 w-5 text-sports-navy" />
              Quick Measurements
            </h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1">
              <button className="flex-shrink-0 group" onClick={() => navigate("/height-measurement")}>
                <Card className="bg-sports-navy text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-48 sm:w-52 relative overflow-hidden">
                  <CardContent className="p-6 text-center min-h-[160px] flex flex-col justify-center relative z-10">
                    <Activity className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 group-hover:animate-pulse" />
                    <h4 className="font-semibold text-base sm:text-lg mb-2">Height</h4>
                    <div className="text-xs text-white/60 mt-1">+10 XP</div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </button>
              <button className="flex-shrink-0 group" onClick={() => navigate("/weight-measurement")}>
                <Card className="bg-sports-maroon text-white shadow-maroon hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-48 sm:w-52 relative overflow-hidden">
                  <CardContent className="p-6 text-center min-h-[160px] flex flex-col justify-center relative z-10">
                    <Heart className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 group-hover:animate-pulse" />
                    <h4 className="font-semibold text-base sm:text-lg mb-2">Weight</h4>
                    <div className="text-xs text-white/60 mt-1">+10 XP</div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </button>
              <button className="flex-shrink-0 group" onClick={() => navigate("/body-shape")}>
                <Card className="bg-sports-emerald text-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-48 sm:w-52 relative overflow-hidden">
                  <CardContent className="p-6 text-center min-h-[160px] flex flex-col justify-center relative z-10">
                    <User className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 group-hover:animate-pulse" />
                    <h4 className="font-semibold text-base sm:text-lg mb-2">Body Shape</h4>
                    <div className="text-xs text-white/60 mt-1">+15 XP</div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </button>
            </div>
          </section>

          {/* Sport Tests */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
              <Zap className="h-5 w-5 text-sports-gold" />
              Sport Tests
            </h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1">
              <button className="flex-shrink-0 group" onClick={() => navigate("/power-lifting")}>
                <Card className="bg-sports-terracotta text-white shadow-maroon hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-48 sm:w-52 relative overflow-hidden">
                  <CardContent className="p-6 text-center min-h-[160px] flex flex-col justify-center relative z-10">
                    <Dumbbell className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 group-hover:animate-pulse" />
                    <h4 className="font-semibold text-base sm:text-lg mb-2">Power Lifting</h4>
                    <div className="text-xs text-white/60 mt-1">+25 XP</div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </button>
              <button className="flex-shrink-0 group" onClick={() => navigate("/athletic-test")}>
                <Card className="bg-sports-gold text-white shadow-gold hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 w-48 sm:w-52 relative overflow-hidden">
                  <CardContent className="p-6 text-center min-h-[160px] flex flex-col justify-center relative z-10">
                    <Zap className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 group-hover:animate-pulse" />
                    <h4 className="font-semibold text-base sm:text-lg mb-2">Athletic</h4>
                    <div className="text-xs text-white/60 mt-1">+30 XP</div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Tests;