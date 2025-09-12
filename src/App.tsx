import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Assessment from "./pages/Assessment";
import SportRecommendation from "./pages/SportRecommendation";
import Progress from "./pages/Progress";
import Leaderboards from "./pages/Leaderboards";
import Tests from "./pages/Tests";
import HeightMeasurement from "./pages/HeightMeasurement";
import WeightMeasurement from "./pages/WeightMeasurement";
import BodyShape from "./pages/BodyShape";
import PowerLifting from "./pages/PowerLifting";
import WeightLifting from "./pages/WeightLifting";
import AthleticTest from "./pages/AthleticTest";
import Sprints from "./pages/Sprints";
import SitUps from "./pages/SitUps";
import JumpAnalysis from "./pages/JumpAnalysis";
import EmailSettings from "./pages/profile/EmailSettings";
import PasswordSettings from "./pages/profile/PasswordSettings";
import MobileSettings from "./pages/profile/MobileSettings";
import AvatarSettings from "./pages/profile/AvatarSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/sport-recommendation" element={<ProtectedRoute><SportRecommendation /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/leaderboards" element={<ProtectedRoute><Leaderboards /></ProtectedRoute>} />
          <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
          <Route path="/height-measurement" element={<ProtectedRoute><HeightMeasurement /></ProtectedRoute>} />
          <Route path="/weight-measurement" element={<ProtectedRoute><WeightMeasurement /></ProtectedRoute>} />
          <Route path="/body-shape" element={<ProtectedRoute><BodyShape /></ProtectedRoute>} />
          <Route path="/power-lifting" element={<ProtectedRoute><PowerLifting /></ProtectedRoute>} />
          <Route path="/weight-lifting" element={<ProtectedRoute><WeightLifting /></ProtectedRoute>} />
          <Route path="/athletic-test" element={<ProtectedRoute><AthleticTest /></ProtectedRoute>} />
          <Route path="/sprints" element={<ProtectedRoute><Sprints /></ProtectedRoute>} />
          <Route path="/sit-ups" element={<ProtectedRoute><SitUps /></ProtectedRoute>} />
          <Route path="/jump-analysis" element={<ProtectedRoute><JumpAnalysis /></ProtectedRoute>} />
          <Route path="/profile/email" element={<ProtectedRoute><EmailSettings /></ProtectedRoute>} />
          <Route path="/profile/password" element={<ProtectedRoute><PasswordSettings /></ProtectedRoute>} />
          <Route path="/profile/mobile" element={<ProtectedRoute><MobileSettings /></ProtectedRoute>} />
          <Route path="/profile/avatar" element={<ProtectedRoute><AvatarSettings /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
