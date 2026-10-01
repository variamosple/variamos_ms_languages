import os from "node:os";
import { Config } from "../../Config";
import { DependencyCheck, SystemMemoryInfo } from "../../Domain/Health/Entities/HealthInfo";
import { IHealthDataProvider } from "../../Domain/Health/Repository/IHealthDataProvider";
import sequelizeVariamos from "../dataBase/VariamosORM";

export class HealthDataProvider implements IHealthDataProvider {
  public async checkDatabase(): Promise<DependencyCheck> {
    const start = Date.now();
    try {
      await sequelizeVariamos.authenticate();
      return {
        status: "UP",
        latencyMs: Date.now() - start,
      };
    } catch (error) {
      return {
        status: "DOWN",
        latencyMs: Date.now() - start,
        message: (error as Error).message,
      };
    }
  }

  public getSystemMetrics(): {
    memory: SystemMemoryInfo;
    uptimeSeconds: number;
    version: string;
  } {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    return {
      version: Config.VERSION || "1.0.0",
      uptimeSeconds: Math.floor(process.uptime()),
      memory: {
        usedMb: Math.round(usedMemory / (1024 * 1024)),
        totalMb: Math.round(totalMemory / (1024 * 1024)),
        percentage: Number(((usedMemory / totalMemory) * 100).toFixed(1)),
      },
    };
  }
}
