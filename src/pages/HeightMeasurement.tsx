import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const HeightMeasurement = () => {
  return (
    <Layout title="Height Measurement">
      <div className="space-y-6">
        <Card className="bg-sports-teal text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Height Measurement</h2>
            </div>
            <p className="text-white/90 mb-4">
              Accurate height measurement for athletic assessment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-8">
                <Activity className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                <h3 className="font-semibold text-lg mb-2">Height Measurement Tool</h3>
                <p className="text-muted-foreground">
                  Height measurement functionality will be available soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HeightMeasurement;