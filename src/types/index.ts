export interface Content {
  title: string;
  id: number;
}

export interface ResponseResult {
  time: string;
  data: Content[];
}

export interface IFormatSourceDataProps {
  data: Array<Array<string | number>>;
}

type IDataItem = (number | string)[];

export interface ISourceDataInDay {
  dateStr: string;
  dateNum: number;
  liveValue: IDataItem;
  lostValue: IDataItem;
  deadValue: IDataItem;
  liveCount: number;
  lostCount: number;
  deadCount: number;
}

export interface ISourceData {
  title: string;
  value: ISourceDataInDay[];
}

export enum StatusEnum {
  live = "活",
  dead = "死",
  lost = "丢",
}

export interface IExcelInputSourceDataItem {
  name: string;
  data: (string|number)[][];
  options: {};
}

export type IExcelInputSourceData = IExcelInputSourceDataItem[];
