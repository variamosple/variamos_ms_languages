import { Router } from "express";
import { HealthDataProvider } from "../DataProviders/Health/HealthDataProvider";
import { HealthQueryUseCase } from "../Domain/Health/UseCase/HealthQueryUseCase";

export const HEALTH_ROUTE = "/health";

const healthRouter = Router();
const healthDataProvider = new HealthDataProvider();
const healthUseCase = new HealthQueryUseCase(healthDataProvider);

healthRouter.get("/", async (_req, res) => {
  try {
    const health = await healthUseCase.getHealth();
    res.status(health.status === "UP" ? 200 : 503).json(health);
  } catch (error) {
    res.status(500).json({
      status: "DOWN",
      serviceName: "variamos_ms_languages",
      error: (error as Error).message,
    });
  }
});

export default healthRouter;
