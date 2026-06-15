export interface RunResponse {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsed: number;
  tokens?: TokenInfo[];
}

export interface TokenInfo {
  type: string;
  value: string;
  line: number;
  col: number;
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

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
  color: string;
};

export type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

export type DocSection = {
  id: string;
  title: string;
  icon: string;
};
