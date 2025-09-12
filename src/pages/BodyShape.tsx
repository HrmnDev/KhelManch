import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const BodyShape = () => {
  return (
    <Layout title="Body Shape Analysis">
      <div className="space-y-6">
        <Card className="bg-sports-teal text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Body Shape Analysis</h2>
            </div>
            <p className="text-white/90 mb-4">
              Analyze your body composition for optimal sport recommendations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-8">
                <User className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                <h3 className="font-semibold text-lg mb-2">Body Composition Analysis</h3>
                <p className="text-muted-foreground">
                  Body shape analysis functionality will be available soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BodyShape;