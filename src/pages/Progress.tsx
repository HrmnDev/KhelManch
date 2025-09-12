import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Target, Flame, Star, Calendar, BarChart3, Trophy, Zap } from "lucide-react";
import { useUserStats } from "@/hooks/useUserStats";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ProfileSetupDialog } from "@/components/ProfileSetupDialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Progress = () => {
  const { stats, isLoading } = useUserStats();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      setProfile(data);
      
      // Show profile setup if age or gender is missing
      if (!data?.age || !data?.gender) {
        setShowProfileSetup(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const mockPerformanceData = [
    { month: 'Jan', points: 850 },
    { month: 'Feb', points: 1200 },
    { month: 'Mar', points: 1580 },
    { month: 'Apr', points: 2100 },
    { month: 'May', points: 2850 },
    { month: 'Jun', points: 3420 }
  ];

  const mockRecentAchievements = [
    { id: '1', title: 'First Steps', description: 'Complete your first test', unlocked: true, date: '2024-01-15' },
    { id: '2', title: 'Week Warrior', description: '7-day streak achieved!', unlocked: true, date: '2024-01-22' },
    { id: '3', title: 'Height Hunter', description: 'Record your height', unlocked: true, date: '2024-01-20' },
    { id: '4', title: 'Strength Master', description: 'Complete 5 power tests', unlocked: false, progress: 3, maxProgress: 5 },
    { id: '5', title: 'Speed Demon', description: 'Achieve sub-12s sprint', unlocked: false, progress: 0, maxProgress: 1 },
    { id: '6', title: 'Precision Pro', description: 'Perfect assessment score', unlocked: false, progress: 2, maxProgress: 3 }
  ];

  return (
    <Layout title="My Progress">
      <div className="min-h-screen bg-background relative">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
        
        <div className="relative z-10 space-y-6">
          {/* Hero Stats Section */}
          <Card className="bg-gradient-emerald text-white shadow-card-sports overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">📊 My Progress</h2>
                  <p className="text-white/90">Track your athletic development journey</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{stats?.level || 1}</div>
                  <div className="text-sm text-white/80">Level</div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Experience Points</span>
                  <span>{stats?.xp || 0}/3000 XP</span>
                </div>
                <ProgressBar 
                  value={((stats?.xp || 0) / 3000) * 100} 
                  className="h-3 bg-white/20"
                />
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats?.streak_days || 0}</div>
                  <div className="text-xs text-white/80 flex items-center justify-center gap-1">
                    <Flame className="h-3 w-3" />
                    Day Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats?.total_tests_completed || 0}</div>
                  <div className="text-xs text-white/80 flex items-center justify-center gap-1">
                    <Target className="h-3 w-3" />
                    Tests Done
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats?.badges_earned || 0}</div>
                  <div className="text-xs text-white/80 flex items-center justify-center gap-1">
                    <Award className="h-3 w-3" />
                    Badges
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sports-emerald" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Progress Chart (Mock) */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Monthly Points Progress
                  </h4>
                  <div className="space-y-3">
                    {mockPerformanceData.map((data, index) => (
                      <div key={data.month} className="flex items-center gap-3">
                        <div className="w-8 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <div className="bg-muted rounded-full h-6 relative overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-sports-emerald to-sports-teal h-full rounded-full transition-all duration-500"
                              style={{ width: `${(data.points / 4000) * 100}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {data.points}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Breakdown */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Total Points</div>
                        <div className="text-sm text-muted-foreground">All-time earned</div>
                      </div>
                      <div className="text-2xl font-bold text-sports-emerald">
                        {stats?.total_points?.toLocaleString() || '0'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Rank Position</div>
                        <div className="text-sm text-muted-foreground">Global ranking</div>
                      </div>
                      <div className="text-2xl font-bold text-sports-gold">
                        #{stats?.rank_position || 'N/A'}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Next Milestone</div>
                        <div className="text-sm text-muted-foreground">Points to next level</div>
                      </div>
                      <div className="text-lg font-bold text-sports-navy">
                        {3000 - (stats?.xp || 0)} XP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-sports-gold" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {mockRecentAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    icon={achievement.title === 'Week Warrior' ? Flame : 
                          achievement.title === 'Speed Demon' ? Zap :
                          achievement.title === 'Precision Pro' ? Target : Star}
                    title={achievement.title}
                    description={achievement.description}
                    unlocked={achievement.unlocked}
                    progress={achievement.progress}
                    maxProgress={achievement.maxProgress}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          {(!profile?.age || !profile?.gender) && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">Complete Your Profile</h3>
                    <p className="text-sm text-yellow-700">
                      Add your age and gender to unlock leaderboards and personalized recommendations.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowProfileSetup(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <ProfileSetupDialog
          open={showProfileSetup}
          onOpenChange={setShowProfileSetup}
          currentAge={profile?.age}
          currentGender={profile?.gender}
          onSave={fetchProfile}
        />
      </div>
    </Layout>
  );
};

export default Progress;