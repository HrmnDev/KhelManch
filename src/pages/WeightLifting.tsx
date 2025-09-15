import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Upload, PlayCircle, FileVideo, Camera } from "lucide-react";
import { useState } from "react";
import ExerciseAnalysis from "@/components/ExerciseAnalysis";
import { AnalysisResult } from "@/utils/exerciseAnalyzers";

const WeightLifting = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setSelectedVideo(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
    }
  };

  const handleAnalysisComplete = (results: AnalysisResult) => {
    setAnalysisResults(results);
  };

  return (
    <Layout title="Weight Lifting Analysis">
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Deadlift Analysis</h2>
            </div>
            <p className="text-white/90 mb-4">
              Upload your deadlift video or use live analysis for AI-powered form analysis and rep counting
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Live Analysis
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Video Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <ExerciseAnalysis 
              exerciseType="deadlift" 
              onAnalysisComplete={handleAnalysisComplete}
            />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Upload Section */}
              <Card className="bg-white shadow-card-sports">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-sports-teal" />
                    Upload Video
                  </h3>
                  
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-sports-teal bg-sports-teal/5' 
                        : 'border-gray-300 hover:border-sports-teal'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {selectedVideo ? (
                      <div className="space-y-4">
                        <FileVideo className="h-12 w-12 mx-auto text-sports-teal" />
                        <div>
                          <p className="font-semibold text-gray-800">{selectedVideo.name}</p>
                          <p className="text-sm text-gray-600">
                            {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedVideo(null)}
                          className="text-sm text-sports-teal hover:underline"
                        >
                          Choose different video
                        </button>
                        <div className="pt-4">
                          <button className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                            Analyze Deadlift
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-lg font-semibold text-gray-700">
                            Drop your deadlift video here or click to browse
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Supports MP4, MOV, AVI files up to 100MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileInput}
                          className="hidden"
                          id="video-upload"
                        />
                        <label
                          htmlFor="video-upload"
                          className="inline-block bg-gradient-to-r from-sports-teal to-sports-blue text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          Choose Video
                        </label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instructions Section */}
              <Card className="bg-white shadow-card-sports">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-sports-teal" />
                    Instructions
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-sports-teal/10 to-sports-blue/10 rounded-lg p-4">
                      <h4 className="font-semibold text-sports-teal mb-2">Video Recording Tips:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Record from the side view for best analysis</li>
                        <li>• Ensure full body is visible in frame</li>
                        <li>• Good lighting and clear visibility</li>
                        <li>• Record complete lift from start to finish</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-sports-blue/10 to-sports-teal/10 rounded-lg p-4">
                      <h4 className="font-semibold text-sports-blue mb-2">Analysis Features:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Automatic rep counting</li>
                        <li>• Hip angle analysis and form assessment</li>
                        <li>• Real-time feedback on depth and technique</li>
                        <li>• Personalized improvement suggestions</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Form Guidelines:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Stand facing camera for live analysis</li>
                        <li>• Hip angle {'>'} 160° = UP position</li>
                        <li>• Hip angle {'<'} 130° = DOWN position</li>
                        <li>• Focus on hip hinge movement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WeightLifting;