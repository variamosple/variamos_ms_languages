import { HealthInfo, HealthStatus } from "../Entities/HealthInfo";
import { IHealthDataProvider } from "../Repository/IHealthDataProvider";

export class HealthQueryUseCase {
  private readonly healthDataProvider: IHealthDataProvider;

  constructor(healthDataProvider: IHealthDataProvider) {
    this.healthDataProvider = healthDataProvider;
  }

  public async getHealth(): Promise<HealthInfo> {
    const startTime = Date.now();
    const dbCheck = await this.healthDataProvider.checkDatabase();
    const systemMetrics = this.healthDataProvider.getSystemMetrics();

    const overallStatus: HealthStatus = dbCheck.status === "UP" ? "UP" : "DEGRADED";

    return {
      status: overallStatus,
      serviceName: "variamos_ms_languages",
      version: systemMetrics.version,
      uptimeSeconds: systemMetrics.uptimeSeconds,
      timestamp: new Date().toISOString(),
      responseTimeMs: Date.now() - startTime,
      checks: {
        database: dbCheck,
        memory: systemMetrics.memory,
      },
    };
  }
}
