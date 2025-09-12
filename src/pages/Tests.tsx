import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Dumbbell, Zap, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tests = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Tests">
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">🏃‍♂️ Athletic Tests</h2>
            <p className="text-white/90">
              Comprehensive fitness and skill assessments to measure your athletic capabilities
            </p>
          </CardContent>
        </Card>

        {/* Quick Measurements */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Measurements</h3>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => navigate("/height-measurement")}>
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Height</h4>
                </CardContent>
              </Card>
            </button>
            <button onClick={() => navigate("/weight-measurement")}>
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Weight</h4>
                </CardContent>
              </Card>
            </button>
            <button onClick={() => navigate("/body-shape")}>
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-4 text-center min-h-[100px] flex flex-col justify-center">
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Body Shape</h4>
                </CardContent>
              </Card>
            </button>
          </div>
        </section>

        {/* Sport Tests */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sport Tests</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate("/power-lifting")}>
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-6 text-center min-h-[120px] flex flex-col justify-center">
                  <Dumbbell className="h-12 w-12 mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">Power Lifting</h4>
                </CardContent>
              </Card>
            </button>
            <button onClick={() => navigate("/athletic-test")}>
              <Card className="bg-sports-teal text-white shadow-card-sports active:scale-95 transition-all duration-200 hover:shadow-sports">
                <CardContent className="p-6 text-center min-h-[120px] flex flex-col justify-center">
                  <Zap className="h-12 w-12 mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">Athletic</h4>
                </CardContent>
              </Card>
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Tests;