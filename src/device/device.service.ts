import { IDevice, DeviceModel } from "./device.model";

export interface IDeviceRepository {
  getDevices(): Promise<IDevice[]>;
  getDeviceById(metricId: string): Promise<IDevice | null>;
  createDevice(metric: IDevice): Promise<IDevice>;
  updateDevice(metric: IDevice): Promise<IDevice | null>;
  deleteDevice(metricId: string): Promise<void>;
}

export class DeviceRepositoryImpl implements IDeviceRepository {
  async getDevices(): Promise<IDevice[]> {
    return await DeviceModel.find().exec();
  }

  async getDeviceById(metricId: string): Promise<IDevice | null> {
    return await DeviceModel.findById(metricId).exec();
  }

  async createDevice(metric: IDevice): Promise<IDevice> {
    return await DeviceModel.create(metric);
  }

  async updateDevice(metric: IDevice): Promise<IDevice | null> {
    return await DeviceModel.findByIdAndUpdate(metric._id, metric, {
      new: true,
    }).exec();
  }

  async deleteDevice(metricId: string): Promise<void> {
    await DeviceModel.findByIdAndDelete(metricId).exec();
  }
}

export interface IDeviceService {
  getDevices(): Promise<IDevice[]>;
  getDeviceById(metricId: string): Promise<IDevice | null>;
  createDevice(metric: IDevice): Promise<IDevice>;
  updateDevice(metric: IDevice): Promise<IDevice | null>;
  deleteDevice(metricId: string): Promise<void>;
}

export class DeviceServiceImpl implements IDeviceService {
  constructor(private deviceRepository: IDeviceRepository) {}

  getDevices(): Promise<IDevice[]> {
    return this.deviceRepository.getDevices();
  }

  getDeviceById(metricId: string): Promise<IDevice | null> {
    return this.deviceRepository.getDeviceById(metricId);
  }

  createDevice(metric: IDevice): Promise<IDevice> {
    return this.deviceRepository.createDevice(metric);
  }

  updateDevice(metric: IDevice): Promise<IDevice | null> {
    return this.deviceRepository.updateDevice(metric);
  }

  deleteDevice(metricId: string): Promise<void> {
    return this.deviceRepository.deleteDevice(metricId);
  }
}
