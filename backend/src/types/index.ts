export interface RunRequest {
  code: string;
}

export interface TokenInfo {
  type: string;
  value: string;
  line: number;
  col: number;
}

export interface RunResponse {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsed: number;
  tokens?: TokenInfo[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  runtimeSpeed: number;
  testCasesPassed: number;
  submittedAt: string;
  rank?: number;
}

export interface LeaderboardSubmission {
  name: string;
  score: number;
  runtimeSpeed: number;
  testCasesPassed: number;
}
