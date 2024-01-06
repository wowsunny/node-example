import fs from "fs";
import xlsx from 'node-xlsx';
import { IExcelInputSourceData } from "../../types";

export function readExcel(filePath: string) {
    const workSheetsFromFile = xlsx.parse(filePath);
    return workSheetsFromFile;
}

export function writeExcel(workSheets: IExcelInputSourceData, filePath: string) {
  const buffer = xlsx.build(workSheets);
  fs.writeFileSync(filePath, buffer, 'binary');
  console.log('写入成功！') ;
}
