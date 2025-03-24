import { Request, Response } from "express";
import { MetricServiceImpl } from "./metric.service"; // Ajusta la ruta según tu estructura de archivos

export class MetricController {
  constructor(private metricService: MetricServiceImpl) {}

  async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      const metrics = await this.metricService.getMetrics();
      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMetricById(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    try {
      const metric = await this.metricService.getMetricById(metricId);
      if (!metric) {
        res.status(404).json({ message: "Métrica no encontrada" });
      } else {
        res.status(200).json(metric);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createMetric(req: Request, res: Response): Promise<void> {
    const metricData = req.body; // Asegúrate de que req.body tiene la estructura correcta
    try {
      const newMetric = await this.metricService.createMetric(metricData);
      res.status(201).json(newMetric);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMetric(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    const metricData = { _id: metricId, ...req.body }; // Asegúrate de que req.body tiene la estructura correcta
    try {
      const updatedMetric = await this.metricService.updateMetric(metricData);
      if (!updatedMetric) {
        res.status(404).json({ message: "Métrica no encontrada" });
      } else {
        res.status(200).json(updatedMetric);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteMetric(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    try {
      await this.metricService.deleteMetric(metricId);
      res.status(204).send(); // No content
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
