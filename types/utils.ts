interface IResponse<T> {
  status: "success" | "error";
  code: number;
  data: T;
  msg: string | null;
}