import fs from "fs";
import path from "path";
import { readExcel } from "./utils/excel_IO";
import { formatSourceData } from "./formatSourceData";
import { writeIntoXls } from "./writeIntoXls";

const [sheet] = readExcel(path.resolve(__dirname, '../assets/input.xlsx'))||[];
if(!sheet){
  throw new Error('未找到数据');
}

const res = formatSourceData(sheet);
writeIntoXls(res, [sheet]);