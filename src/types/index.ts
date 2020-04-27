export interface Content {
  title: string;
  id: number;
}

export interface ResponseResult {
  time: string;
  data: Content[];
}