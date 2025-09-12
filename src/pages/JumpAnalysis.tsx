import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, Camera, Play, BarChart3, Trophy } from "lucide-react";

const JumpAnalysis = () => {
  return (
    <Layout title="Jump Analysis">
      <div className="min-h-screen bg-background relative">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
        
        <div className="relative z-10 space-y-6">
          {/* Hero Section */}
          <Card className="bg-gradient-emerald text-white shadow-card-sports overflow-hidden relative hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 min-h-[140px] flex items-center justify-center rounded relative">
              <div className="text-center w-full relative z-20">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <ArrowUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight text-white drop-shadow-lg">🚀 Jump Analysis</h2>
                <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed drop-shadow-md">
                  Measure your vertical jump height and explosive power with AI-powered video analysis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Section */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
              <Camera className="h-5 w-5 text-sports-emerald" />
              How It Works
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-white shadow-card-sports">
                <CardContent className="p-6 text-center">
                  <div className="bg-sports-emerald/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sports-emerald font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Setup Camera</h4>
                  <p className="text-muted-foreground text-sm">
                    Position your phone camera to capture your full body during the jump
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-card-sports">
                <CardContent className="p-6 text-center">
                  <div className="bg-sports-emerald/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sports-emerald font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Record Jump</h4>
                  <p className="text-muted-foreground text-sm">
                    Perform 3 vertical jumps with maximum effort
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-card-sports">
                <CardContent className="p-6 text-center">
                  <div className="bg-sports-emerald/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sports-emerald font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Get Results</h4>
                  <p className="text-muted-foreground text-sm">
                    AI analyzes your jump height, form, and power metrics
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What We Measure Section */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground px-1 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sports-gold" />
              What We Measure
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-sports-emerald/5 to-sports-teal/5 border-sports-emerald/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sports-emerald/20 p-3 rounded-lg">
                      <ArrowUp className="h-6 w-6 text-sports-emerald" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Jump Height</h4>
                      <p className="text-muted-foreground text-sm">
                        Maximum vertical distance achieved during your jump
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sports-gold/5 to-sports-saffron/5 border-sports-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sports-gold/20 p-3 rounded-lg">
                      <Trophy className="h-6 w-6 text-sports-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Explosive Power</h4>
                      <p className="text-muted-foreground text-sm">
                        Rate of force development and takeoff velocity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sports-navy/5 to-sports-blue/5 border-sports-navy/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sports-navy/20 p-3 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-sports-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Landing Form</h4>
                      <p className="text-muted-foreground text-sm">
                        Analysis of landing technique and injury risk factors
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sports-teal/5 to-sports-emerald/5 border-sports-teal/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sports-teal/20 p-3 rounded-lg">
                      <Camera className="h-6 w-6 text-sports-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Jump Consistency</h4>
                      <p className="text-muted-foreground text-sm">
                        Variation between attempts and performance reliability
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Start Test Button */}
          <section className="text-center py-8">
            <Button 
              size="lg" 
              className="bg-gradient-emerald text-white hover:shadow-glow text-lg px-12 py-6 h-auto rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              <Play className="h-6 w-6 mr-3" />
              Start Jump Analysis
            </Button>
            <p className="text-muted-foreground text-sm mt-4">
              Earn 35 XP for completing this test
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default JumpAnalysis;