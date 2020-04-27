"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var superagent_1 = __importDefault(require("superagent"));
var chalk_1 = __importDefault(require("chalk"));
var Util = /** @class */ (function () {
    function Util(url) {
        this.url = url;
    }
    Util.prototype.initial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var content, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(chalk_1.default.blue("爬虫开始"));
                                    return [4 /*yield*/, this.getHtml()];
                                case 1:
                                    content = _a.sent();
                                    result = this.load(content);
                                    console.log(result);
                                    this.savaTextToJson("./data/data.json", result);
                                    console.log(chalk_1.default.blue("爬虫结束"));
                                    return [2 /*return*/];
                            }
                        });
                    }); }, Util.INTERVAL);
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
            });
        });
    };
    Util.prototype.getHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, content.text];
                }
            });
        });
    };
    Util.prototype.load = function (text) {
        var $ = cheerio_1.default.load(text);
        var contentItems = $(".mdui-card-primary");
        var content = [];
        contentItems.map(function (index, ele) {
            var result = $(ele).find(".mdui-card-primary-title").text();
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
    };
    Util.prototype.savaTextToJson = function (path, content) {
        fs_1.default.writeFileSync(path, JSON.stringify(content));
    };
    // 6000 = 6s
    // 60000 = 60s
    // 6000000 = 600s = 60分钟
    // default 6S;
    Util.INTERVAL = 6000;
    return Util;
}());
var url = "https://www.inlc.top/";
var util = new Util(url);
util.initial();
