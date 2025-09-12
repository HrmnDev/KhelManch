import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

const AthleticTest = () => {
  return (
    <Layout title="Athletic Test">
      <div className="space-y-6">
        <Card className="bg-sports-teal text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Athletic Test</h2>
            </div>
            <p className="text-white/90 mb-4">
              Comprehensive athletic performance assessment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-8">
                <Zap className="h-16 w-16 mx-auto mb-4 text-sports-teal" />
                <h3 className="font-semibold text-lg mb-2">Performance Assessment</h3>
                <p className="text-muted-foreground">
                  Athletic test functionality will be available soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AthleticTest;