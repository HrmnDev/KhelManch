import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const SportRecommendation = () => {
  return (
    <Layout title="Sport Recommendation">
      <div className="space-y-6">
        <Card className="bg-gradient-sports text-white shadow-sports">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">🎯 Find Your Perfect Sport</h2>
            <p className="text-white/90 mb-4">
              AI-powered analysis to match your unique abilities with the ideal sports
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm">Sport recommendation system will be available soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SportRecommendation;