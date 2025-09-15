import React, { useEffect, useRef, useState } from 'react';
import * as mediapipePose from '@mediapipe/pose';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera as CameraIcon, Square, RotateCcw } from 'lucide-react';
import { DeadliftAnalyzer, SitupAnalyzer, AnalysisResult } from '@/utils/exerciseAnalyzers';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ExerciseAnalysisProps {
  exerciseType: 'deadlift' | 'situp';
  onAnalysisComplete?: (results: AnalysisResult) => void;
}

const ExerciseAnalysis: React.FC<ExerciseAnalysisProps> = ({ exerciseType, onAnalysisComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [pose, setPose] = useState<Pose | null>(null);
  const [camera, setCamera] = useState<cam.Camera | null>(null);
  const analyzerRef = useRef<DeadliftAnalyzer | SitupAnalyzer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('ExerciseAnalysis useEffect starting');
    console.log('mediapipePose:', mediapipePose);
    console.log('Pose constructor:', Pose);
    
    // Initialize analyzer based on exercise type
    if (exerciseType === 'deadlift') {
      analyzerRef.current = new DeadliftAnalyzer();
    } else {
      analyzerRef.current = new SitupAnalyzer();
    }

    try {
      // Initialize MediaPipe Pose
      console.log('Creating new Pose instance...');
      const poseInstance = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`,
      });
      console.log('Pose instance created successfully:', poseInstance);

      poseInstance.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseInstance.onResults((results) => {
        if (analyzerRef.current && results.poseLandmarks && isAnalyzing) {
          const posePoints = analyzerRef.current.getPosePoints(results);
          if (posePoints) {
            const analysisResult = analyzerRef.current.analyzeForm(posePoints);
            if (analysisResult) {
              setAnalysis(analysisResult);
              drawResults(results, analysisResult);
            }
          }
        } else if (isAnalyzing) {
          drawResults(results, null);
        }
      });

      setPose(poseInstance);
      console.log('Pose setup completed successfully');
    } catch (error) {
      console.error('Error initializing MediaPipe Pose:', error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize pose detection. Please refresh and try again.",
        variant: "destructive",
      });
    }

    return () => {
      console.log('Cleaning up pose instance');
      if (pose) {
        pose.close();
      }
    };
  }, [exerciseType, isAnalyzing]);

  const drawResults = (results: any, analysisResult: AnalysisResult | null) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks && analysisResult) {
      // Draw pose landmarks
      const landmarks = results.poseLandmarks;
      
      // Key points to draw
      const keyPoints = [
        { idx: 11, color: '#ff0000' }, // left shoulder
        { idx: 12, color: '#ff0000' }, // right shoulder
        { idx: 23, color: '#00ff00' }, // left hip
        { idx: 24, color: '#00ff00' }, // right hip
        { idx: 25, color: '#0000ff' }, // left knee
        { idx: 26, color: '#0000ff' }, // right knee
      ];

      // Draw landmarks
      keyPoints.forEach(({ idx, color }) => {
        const landmark = landmarks[idx];
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw connections
      const connections = [
        [11, 23], // left shoulder to left hip
        [12, 24], // right shoulder to right hip
        [23, 25], // left hip to left knee
        [24, 26], // right hip to right knee
        [11, 12], // shoulders
        [23, 24], // hips
      ];

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      connections.forEach(([start, end]) => {
        const startLandmark = landmarks[start];
        const endLandmark = landmarks[end];
        
        ctx.beginPath();
        ctx.moveTo(startLandmark.x * canvas.width, startLandmark.y * canvas.height);
        ctx.lineTo(endLandmark.x * canvas.width, endLandmark.y * canvas.height);
        ctx.stroke();
      });

      // Draw analysis info
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 40px Arial';
      ctx.fillText(`REPS: ${analysisResult.rep_count}`, 20, 60);
      
      ctx.fillStyle = '#ffff00';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`Stage: ${analysisResult.current_stage.toUpperCase()}`, 20, 110);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      const angleLabel = exerciseType === 'deadlift' ? 'Hip Angle' : 'Torso Angle';
      ctx.fillText(`${angleLabel}: ${analysisResult.angle.toFixed(0)}°`, 20, 150);

      // Draw feedback
      if (analysisResult.form_feedback.length > 0) {
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 20px Arial';
        analysisResult.form_feedback.forEach((feedback, idx) => {
          ctx.fillText(feedback, 20, 190 + idx * 30);
        });
      }
    } else if (isAnalyzing) {
      // No pose detected
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 30px Arial';
      const instruction = exerciseType === 'deadlift' 
        ? 'Position yourself facing the camera' 
        : 'Position yourself sideways to the camera';
      ctx.fillText(instruction, 20, 60);
    }
  };

  const startAnalysis = async () => {
    try {
      if (!pose) return;

      const video = videoRef.current;
      if (!video) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }
      });

      video.srcObject = stream;
      video.play();

      const cameraInstance = new cam.Camera(video, {
        onFrame: async () => {
          if (pose && video.videoWidth > 0 && video.videoHeight > 0) {
            await pose.send({ image: video });
          }
        },
        width: 1280,
        height: 720,
      });

      cameraInstance.start();
      setCamera(cameraInstance);
      setIsAnalyzing(true);
      setIsRecording(true);

      toast({
        title: "Analysis Started",
        description: `${exerciseType === 'deadlift' ? 'Deadlift' : 'Sit-up'} analysis is now active`,
      });
    } catch (error) {
      console.error('Error starting analysis:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopAnalysis = () => {
    if (camera) {
      camera.stop();
    }
    
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }

    setIsAnalyzing(false);
    setIsRecording(false);
    
    if (analysis && onAnalysisComplete) {
      onAnalysisComplete(analysis);
      saveAnalysisResults();
    }

    toast({
      title: "Analysis Stopped",
      description: analysis ? `Completed ${analysis.rep_count} reps` : "Session ended",
    });
  };

  const resetAnalysis = () => {
    if (analyzerRef.current) {
      analyzerRef.current.reset();
      setAnalysis(null);
      
      toast({
        title: "Analysis Reset",
        description: "Rep count and analysis data cleared",
      });
    }
  };

  const saveAnalysisResults = async () => {
    if (!analysis) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('videos').insert({
        user_id: user.id,
        title: `${exerciseType === 'deadlift' ? 'Deadlift' : 'Sit-up'} Analysis - ${new Date().toLocaleDateString()}`,
        description: `Real-time analysis session`,
        file_path: 'live_analysis',
        exercise_type: exerciseType,
        rep_count: analysis.rep_count,
        form_score: analysis.angle,
        feedback_points: analysis.form_feedback,
        analysis_results: {
          total_reps: analysis.rep_count,
          avg_angle: analysis.angle,
          feedback: analysis.form_feedback,
          exercise_type: exerciseType
        },
        status: 'analyzed'
      });

      if (error) throw error;

      toast({
        title: "Results Saved",
        description: "Analysis results have been saved to your profile",
      });
    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: "Save Error",
        description: "Unable to save analysis results",
        variant: "destructive",
      });
    }
  };

  const instructions = exerciseType === 'deadlift' 
    ? [
        "Stand facing the camera with feet hip-width apart",
        "Keep your full body visible in the frame",
        "Perform deadlifts with proper form",
        "The system will automatically count your reps"
      ]
    : [
        "Lie sideways to the camera on a mat",
        "Keep your full body visible in the frame", 
        "Perform sit-ups with hands behind head",
        "The system will automatically count your reps"
      ];

  return (
    <div className="space-y-6">
      {/* Camera Feed */}
      <Card className="bg-white shadow-card-sports">
        <CardContent className="p-6">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {!isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center text-white">
                  <CameraIcon className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Ready to start analysis</p>
                  <p className="text-sm opacity-75">Click start when you're in position</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {!isRecording ? (
              <Button 
                onClick={startAnalysis}
                className="bg-gradient-to-r from-sports-teal to-sports-blue text-white px-8 py-3"
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                Start Analysis
              </Button>
            ) : (
              <>
                <Button 
                  onClick={stopAnalysis}
                  variant="destructive"
                  className="px-8 py-3"
                >
                  <Square className="h-5 w-5 mr-2" />
                  Stop Analysis
                </Button>
                <Button 
                  onClick={resetAnalysis}
                  variant="outline"
                  className="px-8 py-3"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="bg-gradient-to-r from-sports-teal/10 to-sports-blue/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Live Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-sports-teal">{analysis.rep_count}</div>
                <div className="text-sm text-gray-600">Total Reps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sports-blue">{analysis.angle.toFixed(0)}°</div>
                <div className="text-sm text-gray-600">
                  {exerciseType === 'deadlift' ? 'Hip Angle' : 'Torso Angle'}
                </div>
              </div>
              <div className="text-center">
                <Badge 
                  variant={analysis.current_stage === 'up' ? 'default' : 'secondary'}
                  className="text-lg px-4 py-2"
                >
                  {analysis.current_stage.toUpperCase()}
                </Badge>
                <div className="text-sm text-gray-600 mt-1">Current Stage</div>
              </div>
            </div>
            
            {analysis.form_feedback.length > 0 && (
              <div className="mt-4 p-4 bg-white/50 rounded-lg">
                <h4 className="font-semibold mb-2">Form Feedback:</h4>
                {analysis.form_feedback.map((feedback, idx) => (
                  <p key={idx} className="text-sports-teal font-medium">{feedback}</p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-white shadow-card-sports">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Setup Instructions</h3>
          <ul className="space-y-2">
            {instructions.map((instruction, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-sports-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseAnalysis;