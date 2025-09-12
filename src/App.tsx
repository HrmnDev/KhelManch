import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/sport-recommendation" element={<SportRecommendation />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/height-measurement" element={<HeightMeasurement />} />
          <Route path="/weight-measurement" element={<WeightMeasurement />} />
          <Route path="/body-shape" element={<BodyShape />} />
          <Route path="/power-lifting" element={<PowerLifting />} />
          <Route path="/weight-lifting" element={<WeightLifting />} />
          <Route path="/athletic-test" element={<AthleticTest />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/sit-ups" element={<SitUps />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
