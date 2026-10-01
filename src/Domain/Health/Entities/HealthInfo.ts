export type HealthStatus = "UP" | "DEGRADED" | "DOWN";

export interface SystemMemoryInfo {
  usedMb: number;
  totalMb: number;
  percentage: number;
}

export interface DependencyCheck {
  status: HealthStatus;
  latencyMs: number;
  message?: string;
}

export interface HealthInfo {
  status: HealthStatus;
  serviceName: string;
  version: string;
  uptimeSeconds: number;
  timestamp: string;
  responseTimeMs: number;
  checks: {
    database: DependencyCheck;
    memory: SystemMemoryInfo;
  };
}
