import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

const PowerLifting = () => {
  return (
    <Layout title="Power Lifting Test">
      <div className="space-y-6">
        <Card className="bg-sports-teal text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Power Lifting Test</h2>
            </div>
            <p className="text-white/90 mb-4">
              Test your strength and power lifting capabilities
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-8">
                <Dumbbell className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                <h3 className="font-semibold text-lg mb-2">Strength Assessment</h3>
                <p className="text-muted-foreground mb-6">
                  Analyze your weight lifting technique with video upload
                </p>
                <button 
                  onClick={() => window.location.href = '/weight-lifting'}
                  className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Weight Lifting
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PowerLifting;