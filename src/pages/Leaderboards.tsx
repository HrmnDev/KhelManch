import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Filter, Users, Crown, Flame, Target } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useState } from "react";

const Leaderboards = () => {
  const { leaderboard, isLoading, fetchLeaderboard } = useLeaderboard();
  const [sortBy, setSortBy] = useState<'age' | 'level' | 'total_points'>('total_points');

  const handleSortChange = (newSortBy: 'age' | 'level' | 'total_points') => {
    setSortBy(newSortBy);
    fetchLeaderboard(newSortBy);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-sports-gold" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-sports-gold text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Layout title="Leaderboards">
      <div className="min-h-screen bg-background relative">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
        
        <div className="relative z-10 space-y-6">
          {/* Hero Section */}
          <Card className="bg-gradient-emerald text-white shadow-card-sports overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">🏆 Leaderboards</h2>
                  <p className="text-white/90">Compete with athletes worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>{leaderboard.length} Active Athletes</span>
              </div>
            </CardContent>
          </Card>

          {/* Sort Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Sort By
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={sortBy === 'total_points' ? 'default' : 'outline'}
                  onClick={() => handleSortChange('total_points')}
                  className={sortBy === 'total_points' ? 'bg-sports-emerald' : ''}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Total Points
                </Button>
                <Button
                  variant={sortBy === 'level' ? 'default' : 'outline'}
                  onClick={() => handleSortChange('level')}
                  className={sortBy === 'level' ? 'bg-sports-gold' : ''}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Level
                </Button>
                <Button
                  variant={sortBy === 'age' ? 'default' : 'outline'}
                  onClick={() => handleSortChange('age')}
                  className={sortBy === 'age' ? 'bg-sports-navy' : ''}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Age
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <div className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">Loading leaderboard...</div>
                </CardContent>
              </Card>
            ) : (
              leaderboard.map((entry, index) => (
                <Card key={entry.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                          {getRankIcon(entry.rank_position)}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg">{entry.full_name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {entry.age} years old
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${entry.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}
                            >
                              {entry.gender === 'male' ? '♂' : '♀'} {entry.gender}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-sports-emerald">
                              {entry.total_points.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">Points</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-sports-gold">
                              Lv.{entry.level}
                            </div>
                            <div className="text-xs text-muted-foreground">{entry.xp} XP</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-sports-navy">
                              <Flame className="h-4 w-4" />
                              <span className="font-bold">{entry.streak_days}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Streak</div>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex gap-2 justify-end">
                          <Badge className={getRankBadgeColor(entry.rank_position)}>
                            Rank #{entry.rank_position}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {entry.badges_earned} badges
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {leaderboard.length === 0 && !isLoading && (
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Leaderboard Data</h3>
                <p className="text-muted-foreground">Complete your profile and start testing to appear on the leaderboards!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboards;