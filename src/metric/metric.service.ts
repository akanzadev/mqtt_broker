import { IMetric, MetricModel } from "./metric.model";

export interface IMetricRepository {
  getMetrics(): Promise<IMetric[]>;
  getMetricById(metricId: string): Promise<IMetric | null>;
  createMetric(metric: IMetric): Promise<IMetric>;
  updateMetric(metric: IMetric): Promise<IMetric | null>;
  deleteMetric(metricId: string): Promise<void>;
}

export class MetricRepositoryImpl implements IMetricRepository {
  async getMetrics(): Promise<IMetric[]> {
    return await MetricModel.find().exec();
  }

  async getMetricById(metricId: string): Promise<IMetric | null> {
    return await MetricModel.findById(metricId).exec();
  }

  async createMetric(metric: IMetric): Promise<IMetric> {
    return await MetricModel.create(metric);
  }

  async updateMetric(metric: IMetric): Promise<IMetric | null> {
    return await MetricModel.findByIdAndUpdate(metric._id, metric, {
      new: true,
    }).exec();
  }

  async deleteMetric(metricId: string): Promise<void> {
    await MetricModel.findByIdAndDelete(metricId).exec();
  }
}

export interface IMetricService {
  getMetrics(): Promise<IMetric[]>;
  getMetricById(metricId: string): Promise<IMetric | null>;
  createMetric(metric: IMetric): Promise<IMetric>;
  updateMetric(metric: IMetric): Promise<IMetric | null>;
  deleteMetric(metricId: string): Promise<void>;
}

export class MetricServiceImpl implements IMetricService {
  constructor(private metricRepository: IMetricRepository) {}

  getMetrics(): Promise<IMetric[]> {
    return this.metricRepository.getMetrics();
  }

  getMetricById(metricId: string): Promise<IMetric | null> {
    return this.metricRepository.getMetricById(metricId);
  }

  createMetric(metric: IMetric): Promise<IMetric> {
    return this.metricRepository.createMetric(metric);
  }

  updateMetric(metric: IMetric): Promise<IMetric | null> {
    return this.metricRepository.updateMetric(metric);
  }

  deleteMetric(metricId: string): Promise<void> {
    return this.metricRepository.deleteMetric(metricId);
  }
}
