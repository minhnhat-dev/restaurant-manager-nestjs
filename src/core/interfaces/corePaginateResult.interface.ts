export interface CorePaginateResult {
  status?: boolean;
  statusCode: number;
  data?: {
    list: any;
    total: number;
    skip: number;
    limit: number;
  } | null;
  message: string;
}
