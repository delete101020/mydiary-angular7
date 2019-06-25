export interface IFunction {
  id: number;
  name?: string;
  estimatedTime?: number;
  logTime?: number;
  startDate?: Date;
  endDate?: Date;
  priority?: number;
  desc?: string;
  status?: boolean;
  type?: number;
  projectId?: number;
  userId?: number;
}
