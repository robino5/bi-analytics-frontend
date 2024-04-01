export interface IResponse<T> {
  status: "success" | "error";
  code: number;
  data: T;
  message: string | null;
}