import { Application, Request, Response } from "express";

import { DeviceController } from "./device.controller";
import { DeviceRepositoryImpl, DeviceServiceImpl } from "./device.service";

const deviceRepository = new DeviceRepositoryImpl();
const deviceService = new DeviceServiceImpl(deviceRepository);
const deviceController = new DeviceController(deviceService);

export const deviceRoutes = (app: Application): void => {
  app.get("/devices", (req: Request, res: Response) =>
    deviceController.getDevices(req, res)
  );
  app.get("/devices/:id", (req: Request, res: Response) =>
    deviceController.getDeviceById(req, res)
  );
  app.post("/devices", (req: Request, res: Response) =>
    deviceController.createDevice(req, res)
  );
  app.put("/devices/:id", (req, res) =>
    deviceController.updateDevice(req, res)
  );
  app.delete("/devices/:id", (req: Request, res: Response) =>
    deviceController.deleteDevice(req, res)
  );
};
