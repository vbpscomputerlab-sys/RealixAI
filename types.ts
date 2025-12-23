
export interface DetectionResult {
  isDeepfake: boolean;
  confidence: number;
  reasoning: string;
  analysisPoints: {
    category: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export interface MediaFile {
  file: File;
  previewUrl: string;
  type: 'image' | 'video';
}
