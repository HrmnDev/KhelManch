import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, User, ArrowUp } from "lucide-react";

const AthleticTest = () => {
  return (
    <Layout title="Athletic Test">
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Athletic Test</h2>
            </div>
            <p className="text-white/90 mb-4">
              Analyze your athletic performance with video-based AI assessment
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="bg-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-sports-teal/10 to-sports-blue/10 rounded-xl p-12">
                  <Zap className="h-20 w-20 mx-auto mb-6 text-sports-teal" />
                  <h3 className="font-bold text-xl mb-4">Sprint Analysis</h3>
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                    Analyze your sprint technique and speed performance with advanced AI tracking
                  </p>
                  <button 
                    onClick={() => window.location.href = '/sprints'}
                    className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg w-full hover:from-sports-blue hover:to-sports-teal"
                  >
                    Start Sprints
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-sports-emerald/10 to-sports-teal/10 rounded-xl p-12">
                  <ArrowUp className="h-20 w-20 mx-auto mb-6 text-sports-emerald" />
                  <h3 className="font-bold text-xl mb-4">Jump Analysis</h3>
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                    Measure your vertical jump height and explosive power capabilities
                  </p>
                  <button 
                    onClick={() => window.location.href = '/jump-analysis'}
                    className="bg-gradient-to-r from-sports-emerald to-sports-teal text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg w-full hover:from-sports-teal hover:to-sports-emerald"
                  >
                    Start Jump Test
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports hover:shadow-glow transition-all duration-300 hover:scale-105 lg:col-span-2 xl:col-span-1">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-sports-navy/10 to-sports-grey/10 rounded-xl p-12">
                  <User className="h-20 w-20 mx-auto mb-6 text-sports-navy" />
                  <h3 className="font-bold text-xl mb-4">Core Strength</h3>
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                    Test your core strength and endurance with sit-ups analysis and form tracking
                  </p>
                  <button 
                    onClick={() => window.location.href = '/sit-ups'}
                    className="bg-gradient-to-r from-sports-navy to-sports-grey text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg w-full hover:from-sports-grey hover:to-sports-navy"
                  >
                    Start Sit-Ups
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AthleticTest;