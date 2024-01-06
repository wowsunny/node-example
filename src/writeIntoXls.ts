import { IExcelInputSourceData, ISourceData } from "./types";
import { writeExcel } from "./utils/excel_IO";

export const writeIntoXls = (
  sourceDataList: ISourceData[],
  originData: any
) => {
  if (!sourceDataList?.length) {
    return;
  }

  const inputData: IExcelInputSourceData = sourceDataList
    ?.map((dataItem) => {
      const title = dataItem?.title;
      const deadValueList = dataItem?.value.map((item) => item.deadValue) || [];
      const valueLength = deadValueList?.[0]?.length;

      const indexList = new Array(valueLength)
        .fill(0)
        .map((item, index) => index + 1);

      const header = [["天数", "组别", "状态", ...indexList, "sum"]];
      // 常规死亡记录
      const rows1 = dataItem?.value?.map((item, index) => {
        const row = [
          item.dateNum,
          title,
          "死",
          ...item?.deadValue,
          item?.deadCount,
        ];
        return row;
      });

      // for liveSpan
      const rows2 = [];
      dataItem?.value?.forEach((item, index) => {
        const isLast = index == dataItem.value.length - 1;
        // 没有开始死亡的天数，不需要添加liveSpan记录
        if (!item?.deadCount && !rows2.length) {
          return;
        }
        // 中间的天数有0次死亡记录，添加占位行
        if (!item?.deadCount) {
          rows2.push([item?.dateNum, 0]);
        }
        // 正常状态
        else {
          const row = new Array(item?.deadCount).fill([item?.dateNum, 1]);
          rows2.push(...row);
        }
        // 最后一行，若有还存活的，则补充占位
        if (isLast && item?.liveCount > 0) {
          const row = new Array(item?.liveCount).fill([
            Number(item?.dateNum) + 1,
            0,
          ]);
          rows2.push(...row);
        }
      });
      // 给rows2预留空行
      rows2.unshift([], [], []);

      return {
        name: dataItem?.title,
        data: [...header, ...rows1, ...rows2],
        options: {},
      };
    })
    .filter((item) => !!item);

  // 原始数据
  inputData.unshift(...originData);
  
  writeExcel(inputData, "./result.xlsx");
};
