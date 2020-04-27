import fs from "fs";
import cheerio from "cheerio";
import superagent, { Response } from "superagent";
import chalk from "chalk";
import { Content, ResponseResult } from "./types";

class Util {
  // 6000 = 6s
  // 60000 = 60s
  // 6000000 = 600s = 60分钟
  
  // default 6S;
  static INTERVAL: number = 6000;

  constructor(private url: string) {}

  public async initial() {
    try {
      setTimeout(async () => {
        console.log(chalk.blue("爬虫开始"));
        const content: string = await this.getHtml();
        const result: ResponseResult = this.load(content);
        console.log(result);
        this.savaTextToJson("./data/data.json", result);
        console.log(chalk.blue("爬虫结束"));
      }, Util.INTERVAL);
    } catch (err) {
      console.log(err);
    }
  }

  public async getHtml() {
    const content = await superagent.get(this.url);
    return content.text;
  }
  public load(text: string): ResponseResult {
    const $ = cheerio.load(text);
    const contentItems = $(".mdui-card-primary");
    const content: Content[] = [];
    contentItems.map((index, ele) => {
      const result = $(ele).find(".mdui-card-primary-title").text();
      content.push({
        id: index,
        title: result,
      });
    });
    content.pop();
    return {
      time: new Date().toLocaleDateString(),
      data: content,
    };
  }
  public savaTextToJson(path: string, content: ResponseResult) {
    fs.writeFileSync(path, JSON.stringify(content));
  }
}

const url: string = "https://www.inlc.top/";

const util: Util = new Util(url);

util.initial();
