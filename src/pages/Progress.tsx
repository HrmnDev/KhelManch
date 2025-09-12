import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Award } from "lucide-react";

const Progress = () => {
  return (
    <Layout title="My Progress">
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8" />
              <h2 className="text-2xl font-bold">My Progress</h2>
            </div>
            <p className="text-white/90 mb-4">
              Track your athletic development and achievements
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-sports-teal" />
              <h3 className="font-semibold text-lg mb-2">Performance Metrics</h3>
              <p className="text-muted-foreground">Track your improvement over time</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-3 text-sports-teal" />
              <h3 className="font-semibold text-lg mb-2">Achievements</h3>
              <p className="text-muted-foreground">View your earned badges and milestones</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-muted-foreground">Progress tracking will be available soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Progress;