import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-sports-pattern opacity-80 pointer-events-none z-0" />
      
      {/* Header */}
      <header className="flex items-center p-4 pt-safe relative z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-foreground">Join KhelManch</h1>
      </header>

      <main className="p-4 pt-8 relative z-10 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-sports-saffron/20 p-4 rounded-full">
              <Users className="h-12 w-12 text-sports-saffron" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Role</h2>
          <p className="text-muted-foreground">Select how you'd like to use KhelManch</p>
        </div>

        <div className="space-y-4">
          {/* Student Option */}
          <Card className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 border-2 hover:border-sports-saffron/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="bg-sports-saffron/10 p-3 rounded-lg">
                  <User className="h-6 w-6 text-sports-saffron" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Sign in as Student</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Discover sports and track your progress
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => navigate("/auth")}
                className="w-full bg-sports-saffron hover:bg-sports-saffron/90 text-white"
                size="lg"
              >
                Continue as Student
              </Button>
            </CardContent>
          </Card>

          {/* Faculty Option (Disabled) */}
          <Card className="opacity-50 cursor-not-allowed border-2 border-muted/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Sign in as Faculty</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Manage students and analyze performance
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                disabled
                className="w-full"
                variant="outline"
                size="lg"
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Faculty access will be available soon. Students can start exploring immediately!
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;