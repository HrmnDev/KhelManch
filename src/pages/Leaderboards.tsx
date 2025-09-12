import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";

const Leaderboards = () => {
  return (
    <Layout title="Leaderboards">
      <div className="space-y-6">
        <Card className="bg-gradient-sports text-white shadow-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Leaderboards</h2>
            </div>
            <p className="text-white/90 mb-4">
              Compete with athletes nationwide and climb the rankings
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Crown className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
              <h3 className="font-semibold text-lg mb-2">Overall Rankings</h3>
              <p className="text-muted-foreground">Top performers across all sports</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Medal className="h-12 w-12 mx-auto mb-3 text-sports-teal" />
              <h3 className="font-semibold text-lg mb-2">Sport Specific</h3>
              <p className="text-muted-foreground">Rankings by individual sports</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card-sports">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold text-lg mb-2">Regional</h3>
              <p className="text-muted-foreground">Compete with local athletes</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-card-sports">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Top Athletes</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-muted-foreground">Leaderboard data will be available soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboards;