import { DependencyCheck, SystemMemoryInfo } from "../Entities/HealthInfo";

export interface IHealthDataProvider {
  checkDatabase(): Promise<DependencyCheck>;
  getSystemMetrics(): {
    memory: SystemMemoryInfo;
    uptimeSeconds: number;
    version: string;
  };
}
