import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, User } from "lucide-react";

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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="bg-gray-50 rounded-lg p-8">
                  <Zap className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                  <h3 className="font-semibold text-lg mb-2">Sprint Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Analyze your sprint technique and speed performance
                  </p>
                  <button 
                    onClick={() => window.location.href = '/sprints'}
                    className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Sprints
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="bg-gray-50 rounded-lg p-8">
                  <User className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                  <h3 className="font-semibold text-lg mb-2">Core Strength</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your core strength with sit-ups analysis
                  </p>
                  <button 
                    onClick={() => window.location.href = '/sit-ups'}
                    className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Sit-Ups
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