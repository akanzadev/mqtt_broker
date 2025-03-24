import { Request, Response } from "express";
import { DeviceServiceImpl } from "./device.service"; // Ajusta la ruta según tu estructura de archivos

export class DeviceController {
  constructor(private metricService: DeviceServiceImpl) {}

  async getDevices(req: Request, res: Response): Promise<void> {
    try {
      const metrics = await this.metricService.getDevices();
      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDeviceById(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    try {
      const metric = await this.metricService.getDeviceById(metricId);
      if (!metric) {
        res.status(404).json({ message: "Métrica no encontrada" });
      } else {
        res.status(200).json(metric);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createDevice(req: Request, res: Response): Promise<void> {
    const metricData = req.body; // Asegúrate de que req.body tiene la estructura correcta
    try {
      const newDevice = await this.metricService.createDevice(metricData);
      res.status(201).json(newDevice);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDevice(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    const metricData = { _id: metricId, ...req.body }; // Asegúrate de que req.body tiene la estructura correcta
    try {
      const updatedDevice = await this.metricService.updateDevice(metricData);
      if (!updatedDevice) {
        res.status(404).json({ message: "Métrica no encontrada" });
      } else {
        res.status(200).json(updatedDevice);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<void> {
    const metricId = req.params.id;
    try {
      await this.metricService.deleteDevice(metricId);
      res.status(204).send(); // No content
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
