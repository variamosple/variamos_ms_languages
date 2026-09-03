import assert from "assert";
import { HealthQueryUseCase } from "./HealthQueryUseCase";
import { IHealthDataProvider } from "../Repository/IHealthDataProvider";

async function runTests() {
  console.log("Running HealthQueryUseCase tests...");

  // Test 1: UP
  {
    const mockProvider: IHealthDataProvider = {
      checkDatabase: async () => ({ status: "UP", latencyMs: 5 }),
      getSystemMetrics: () => ({
        version: "1.0.0",
        uptimeSeconds: 120,
        memory: { usedMb: 100, totalMb: 1000, percentage: 10 },
      }),
    };

    const useCase = new HealthQueryUseCase(mockProvider);
    const result = await useCase.getHealth();

    assert.strictEqual(result.status, "UP");
    assert.strictEqual(result.serviceName, "variamos_ms_languages");
    assert.strictEqual(result.checks.database.status, "UP");
    assert.strictEqual(result.checks.memory.percentage, 10);
    console.log("✔ Test 1 passed: status is UP");
  }

  // Test 2: DEGRADED
  {
    const mockProvider: IHealthDataProvider = {
      checkDatabase: async () => ({ status: "DOWN", latencyMs: 50, message: "Connection error" }),
      getSystemMetrics: () => ({
        version: "1.0.0",
        uptimeSeconds: 120,
        memory: { usedMb: 100, totalMb: 1000, percentage: 10 },
      }),
    };

    const useCase = new HealthQueryUseCase(mockProvider);
    const result = await useCase.getHealth();

    assert.strictEqual(result.status, "DEGRADED");
    assert.strictEqual(result.checks.database.status, "DOWN");
    console.log("✔ Test 2 passed: status is DEGRADED when DB is down");
  }

  console.log("All HealthQueryUseCase tests passed successfully! 🎉");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
