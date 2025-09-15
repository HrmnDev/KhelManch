// Exercise Analysis Utilities
import { Pose } from '@mediapipe/pose';

export interface PosePoints {
  left_shoulder: [number, number];
  left_hip: [number, number];
  left_knee: [number, number];
  right_shoulder: [number, number];
  right_hip: [number, number];
  right_knee: [number, number];
  nose?: [number, number];
}

export interface AnalysisResult {
  rep_count: number;
  current_stage: string;
  angle: number;
  form_feedback: string[];
}

export class DeadliftAnalyzer {
  private rep_count = 0;
  private current_stage = "up";
  private hip_angles: number[] = [];
  private form_feedback: string[] = [];
  private last_feedback_time = 0;
  
  private readonly UP_THRESHOLD = 160;
  private readonly DOWN_THRESHOLD = 130;
  private readonly MAX_HISTORY = 5;

  calculateAngle(a: [number, number], b: [number, number], c: [number, number]): number | null {
    try {
      const radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
      let angle = Math.abs(radians * 180.0 / Math.PI);
      
      if (angle > 180.0) {
        angle = 360 - angle;
      }
      
      return angle;
    } catch {
      return null;
    }
  }

  getPosePoints(landmarks: any): PosePoints | null {
    if (!landmarks?.landmark) return null;
    
    try {
      return {
        left_shoulder: [landmarks.landmark[11].x, landmarks.landmark[11].y],
        left_hip: [landmarks.landmark[23].x, landmarks.landmark[23].y],
        left_knee: [landmarks.landmark[25].x, landmarks.landmark[25].y],
        right_shoulder: [landmarks.landmark[12].x, landmarks.landmark[12].y],
        right_hip: [landmarks.landmark[24].x, landmarks.landmark[24].y],
        right_knee: [landmarks.landmark[26].x, landmarks.landmark[26].y],
      };
    } catch {
      return null;
    }
  }

  analyzeForm(pose_points: PosePoints): AnalysisResult | null {
    if (!pose_points) return null;

    const left_hip_angle = this.calculateAngle(
      pose_points.left_shoulder,
      pose_points.left_hip,
      pose_points.left_knee
    );
    
    const right_hip_angle = this.calculateAngle(
      pose_points.right_shoulder,
      pose_points.right_hip,
      pose_points.right_knee
    );

    if (left_hip_angle === null || right_hip_angle === null) return null;

    const hip_angle = (left_hip_angle + right_hip_angle) / 2;
    
    // Store for smoothing
    this.hip_angles.push(hip_angle);
    if (this.hip_angles.length > this.MAX_HISTORY) {
      this.hip_angles.shift();
    }
    
    if (this.hip_angles.length < 3) return null;

    const smooth_hip_angle = this.hip_angles.reduce((a, b) => a + b, 0) / this.hip_angles.length;

    // Rep counting logic
    if (this.current_stage === "up" && smooth_hip_angle < this.DOWN_THRESHOLD) {
      this.current_stage = "down";
    } else if (this.current_stage === "down" && smooth_hip_angle > this.UP_THRESHOLD) {
      this.current_stage = "up";
      this.rep_count += 1;
    }

    // Form feedback
    this.form_feedback = [];
    const current_time = Date.now();
    
    if (current_time - this.last_feedback_time > 2000) {
      if (smooth_hip_angle < 120) {
        this.form_feedback.push("Good depth!");
      } else if (this.current_stage === "down" && smooth_hip_angle > 140) {
        this.form_feedback.push("Go deeper - hinge at hips");
      }
      this.last_feedback_time = current_time;
    }

    return {
      rep_count: this.rep_count,
      current_stage: this.current_stage,
      angle: smooth_hip_angle,
      form_feedback: this.form_feedback
    };
  }

  reset() {
    this.rep_count = 0;
    this.current_stage = "up";
    this.hip_angles = [];
    this.form_feedback = [];
  }
}

export class SitupAnalyzer {
  private rep_count = 0;
  private current_stage = "down";
  private torso_angles: number[] = [];
  private form_feedback: string[] = [];
  private last_feedback_time = 0;
  
  private readonly UP_THRESHOLD = 45;
  private readonly DOWN_THRESHOLD = 20;
  private readonly MAX_HISTORY = 5;

  calculateAngle(a: [number, number], b: [number, number], c: [number, number]): number | null {
    try {
      const radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
      let angle = Math.abs(radians * 180.0 / Math.PI);
      
      if (angle > 180.0) {
        angle = 360 - angle;
      }
      
      return angle;
    } catch {
      return null;
    }
  }

  getPosePoints(landmarks: any): PosePoints | null {
    if (!landmarks?.landmark) return null;
    
    try {
      return {
        left_shoulder: [landmarks.landmark[11].x, landmarks.landmark[11].y],
        left_hip: [landmarks.landmark[23].x, landmarks.landmark[23].y],
        left_knee: [landmarks.landmark[25].x, landmarks.landmark[25].y],
        right_shoulder: [landmarks.landmark[12].x, landmarks.landmark[12].y],
        right_hip: [landmarks.landmark[24].x, landmarks.landmark[24].y],
        right_knee: [landmarks.landmark[26].x, landmarks.landmark[26].y],
        nose: [landmarks.landmark[0].x, landmarks.landmark[0].y],
      };
    } catch {
      return null;
    }
  }

  analyzeForm(pose_points: PosePoints): AnalysisResult | null {
    if (!pose_points) return null;

    // Calculate torso angle (shoulder to hip vs horizontal)
    const avg_shoulder: [number, number] = [
      (pose_points.left_shoulder[0] + pose_points.right_shoulder[0]) / 2,
      (pose_points.left_shoulder[1] + pose_points.right_shoulder[1]) / 2
    ];
    
    const avg_hip: [number, number] = [
      (pose_points.left_hip[0] + pose_points.right_hip[0]) / 2,
      (pose_points.left_hip[1] + pose_points.right_hip[1]) / 2
    ];

    // Create horizontal reference point
    const horizontal_point: [number, number] = [avg_hip[0] + 0.2, avg_hip[1]];
    
    const torso_angle = this.calculateAngle(avg_shoulder, avg_hip, horizontal_point);
    
    if (torso_angle === null) return null;

    // Adjust angle so that lying down is ~0° and sitting up is ~90°
    let adjusted_angle = torso_angle;
    if (avg_shoulder[1] <= avg_hip[1]) { // Shoulder above hip (sitting up)
      adjusted_angle = 90 - torso_angle;
    }
    
    adjusted_angle = Math.max(0, Math.min(90, adjusted_angle));

    // Store for smoothing
    this.torso_angles.push(adjusted_angle);
    if (this.torso_angles.length > this.MAX_HISTORY) {
      this.torso_angles.shift();
    }
    
    if (this.torso_angles.length < 3) return null;

    const smooth_torso_angle = this.torso_angles.reduce((a, b) => a + b, 0) / this.torso_angles.length;

    // Rep counting logic
    if (this.current_stage === "down" && smooth_torso_angle > this.UP_THRESHOLD) {
      this.current_stage = "up";
    } else if (this.current_stage === "up" && smooth_torso_angle < this.DOWN_THRESHOLD) {
      this.current_stage = "down";
      this.rep_count += 1;
    }

    // Form feedback
    this.form_feedback = [];
    const current_time = Date.now();
    
    if (current_time - this.last_feedback_time > 2000) {
      if (this.current_stage === "up" && smooth_torso_angle > 50) {
        this.form_feedback.push("Good sit-up!");
      } else if (this.current_stage === "up" && smooth_torso_angle < 35) {
        this.form_feedback.push("Sit up higher!");
      } else if (this.current_stage === "down" && smooth_torso_angle > 25) {
        this.form_feedback.push("Lie down completely!");
      }
      this.last_feedback_time = current_time;
    }

    return {
      rep_count: this.rep_count,
      current_stage: this.current_stage,
      angle: smooth_torso_angle,
      form_feedback: this.form_feedback
    };
  }

  reset() {
    this.rep_count = 0;
    this.current_stage = "down";
    this.torso_angles = [];
    this.form_feedback = [];
  }
}