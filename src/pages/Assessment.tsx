import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const Assessment = () => {
  return (
    <Layout title="Assessment">
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">🏆 Athletic Assessment</h2>
            <p className="text-white/90 mb-4">
              Complete your comprehensive fitness assessment to showcase your athletic potential
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm">Assessment content will be available soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Assessment;