export interface IProject {
  id: number;
  name?: string;
  desc?: string;
  startDate?: Date;
  endDate?: Date;
  status?: boolean;
  estimatedTime?: number;
  totalSpentTime?: number;
  estimatedDura?: number;
  clientId?: number;
  user?: [];
}
