import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Upload, PlayCircle, FileVideo } from "lucide-react";
import { useState } from "react";

const WeightLifting = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  return (
    <Layout title="Weight Lifting Analysis">
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-sports-teal to-sports-blue text-white shadow-card-sports">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Weight Lifting Analysis</h2>
            </div>
            <p className="text-white/90 mb-4">
              Upload your weight lifting video for AI-powered form analysis and personalized feedback
            </p>
          </CardContent>
        </Card>

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
                        Analyze Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        Drop your video here or click to browse
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
                    <li>• Ensure good lighting and clear visibility</li>
                    <li>• Include full body in frame</li>
                    <li>• Record complete lift from start to finish</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-sports-blue/10 to-sports-teal/10 rounded-lg p-4">
                  <h4 className="font-semibold text-sports-blue mb-2">Analysis Features:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Form assessment and corrections</li>
                    <li>• Rep counting and timing analysis</li>
                    <li>• Muscle activation insights</li>
                    <li>• Personalized improvement suggestions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Supported Exercises:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>• Squats</div>
                    <div>• Deadlifts</div>
                    <div>• Bench Press</div>
                    <div>• Overhead Press</div>
                    <div>• Rows</div>
                    <div>• Pull-ups</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WeightLifting;