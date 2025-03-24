import { Application, Request, Response } from "express";

import { MetricController } from "./metric.controller";
import { MetricRepositoryImpl, MetricServiceImpl } from "./metric.service";

const metricRepository = new MetricRepositoryImpl();
const metricService = new MetricServiceImpl(metricRepository);
const metricController = new MetricController(metricService);

export const metricRoutes = (app: Application): void => {
  app.get("/metrics", (req: Request, res: Response) =>
    metricController.getMetrics(req, res)
  );
  app.get("/metrics/:id", (req: Request, res: Response) =>
    metricController.getMetricById(req, res)
  );
  app.post("/metrics", (req: Request, res: Response) =>
    metricController.createMetric(req, res)
  );
  app.put("/metrics/:id", (req, res) =>
    metricController.updateMetric(req, res)
  );
  app.delete("/metrics/:id", (req: Request, res: Response) =>
    metricController.deleteMetric(req, res)
  );
};
