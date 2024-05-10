import { IFormatSourceDataProps, ISourceData, StatusEnum } from "./types";

const dateReg = /D(\d\d|\d) (?:\d\d|\d)\.(?:\d\d|\d)/;
const isInStatus = (value:string|number)=>(['活','死','丢'].findIndex(item=>item==value)>=0)

const getSumInDay = (value: (string | number)[]) => {
  let sum = 0;
  if (!value) {
    return NaN;
  }
  value.forEach((item, index) => {
    if (index >= 2) {
      sum += +item;
    }
  });
  return sum;
};

const getDateNum = (value: string)=>{
  const reg = /D(\d+) \d+\.\d+/;
  const regRes = value?.match(reg);
  if(regRes){
    return +regRes?.[1];
  }
  return NaN;
}

export const formatSourceData = (props: IFormatSourceDataProps) => {
  const { data } = props;
  if (!data.length) {
    return [];
  }
  const dateList: (string | number)[][][] = [];
  const result: ISourceData[] = [];

  // 初始处理，按照日期分组
  data.forEach((item) => {
    // 开始按照日期分组
    let curRow: (string | number)[][];

    // 遇到了日期行，另其新行
    if (item.length == 1 && dateReg.test(item[0]?.toString())) {
      curRow = [];
      dateList.push(curRow);
      curRow.push(item);
      return;
    }

    // 特殊情况，第一行不是日期行
    if (!dateList?.length) {
      curRow = [item];
      dateList.push(curRow);
      return;
    }

    // 常规情况，往本行添加数据
    curRow = dateList[dateList?.length - 1];
    curRow.push(item);
  });


  // console.log(JSON.stringify(dateList))

  // 进阶处理，分组细化
  dateList.forEach((dateData) => {
    if(!dateData?.length){
      return;
    }
    const dateStr = dateData[0]?.[0]?.toString?.();
    const dateNum = getDateNum(dateStr);
    dateData.forEach((row) => {
      if(!row.length || !isInStatus(row?.[1])) {
        return;
      }
      const title = row?.[0]?.toString();
      let curSourceData = result.find(item=>item.title==title);
      if(!curSourceData){
        curSourceData = {
          title,
          value: []
        }
        result.push(curSourceData)
      }
      
      let curResItem = curSourceData?.value.find(item=>item.dateStr==dateStr);
      if(!curResItem){
        curResItem = {
          dateStr,
          dateNum,
          liveValue: [],
          lostValue: [],
          deadValue: [],
          liveCount: 0,
          lostCount: 0,
          deadCount: 0
        }
        curSourceData.value.push(curResItem)
      }

      if (row[1]==StatusEnum.live) {
        curResItem.liveCount = (getSumInDay(row))
        curResItem.liveValue = row?.slice(2)
      }
      if (row[1]==StatusEnum.dead) {
        curResItem.deadCount = (getSumInDay(row))
        curResItem.deadValue = row?.slice(2)
      }
      if (row[1]==StatusEnum.lost) {
        curResItem.lostCount = (getSumInDay(row))
        curResItem.lostValue = row?.slice(2)
      }
    });

  });
  console.log(JSON.stringify(result))
  return result;
};