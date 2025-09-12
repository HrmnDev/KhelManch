import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const WeightMeasurement = () => {
  return (
    <Layout title="Weight Measurement">
      <div className="space-y-6">
        <Card className="bg-sports-teal text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Weight Measurement</h2>
            </div>
            <p className="text-white/90 mb-4">
              Track your weight for comprehensive fitness analysis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-8">
                <Heart className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                <h3 className="font-semibold text-lg mb-2">Weight Tracking</h3>
                <p className="text-muted-foreground">
                  Weight measurement functionality will be available soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WeightMeasurement;