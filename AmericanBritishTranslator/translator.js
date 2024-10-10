// 引入美式英语特有的单词
const americanOnly = require('./american-only.js');
// 引入美式英语到英式英语的拼写转换字典
const americanToBritishSpelling = require('./american-to-british-spelling.js');
// 引入美式英语到英式英语的标题转换字典
const americanToBritishTitles = require("./american-to-british-titles.js")
// 引入英式英语特有的单词
const britishOnly = require('./british-only.js')

// 将字典的键值对反转，键变成值，值变成键
const reverseDict = (obj) => {
    return Object.assign(
        {},
        ...Object.entries(obj).map(([k, v]) => ({ [v]: k }))
    );
};

// 定义翻译器类
class Translator {
    // 将文本转换为英式英语
    toBritishEnglish(text) {
        // 合并美式英语特有的单词和拼写转换字典
        const dict = { ...americanOnly, ...americanToBritishSpelling };
        // 获取美式英语到英式英语的标题转换字典
        const titles = americanToBritishTitles;
        // 定义时间的正则表达式，用于匹配时间格式
        const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;
        // 调用翻译方法进行转换
        const translated = this.translate(
            text,
            dict,
            titles,
            timeRegex,
            "toBritish"
        );

        // 如果没有翻译结果，返回原文本
        if (!translated) {
            return text;
        }

        // 返回翻译后的文本
        return translated;
    }

    // 将文本转换为美式英语
    toAmericanEnglish(text) {
        // 合并英式英语特有的单词和拼写转换字典的反向字典
        const dict = { ...britishOnly, ...reverseDict(americanToBritishSpelling) };
        // 获取美式英语到英式英语的标题转换字典的反向字典
        const titles = reverseDict(americanToBritishTitles);
        // 定义时间的正则表达式，用于匹配时间格式
        const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;
        // 调用翻译方法进行转换
        const translated = this.translate(
            text,
            dict,
            titles,
            timeRegex,
            "toAmerican"
        );

        // 如果没有翻译结果，返回原文本
        if (!translated) {
            return text;
        }
        // 返回翻译后的文本
        return translated;
    }

    // 通用翻译方法
    translate(text, dict, titles, timeRegex, locale) {
        const lowerText = text.toLowerCase();
        // 创建一个用于保存匹配项的映射
        const matchesMap = {};

        // 遍历标题字典，如果文本包含键，则添加到映射中
        Object.entries(titles).map(([k, v]) => {
            if (lowerText.includes(k)) {
                matchesMap[k] = v.charAt(0).toUpperCase() + v.slice(1);
            }
        });

        // 创建一个包含需要替换的带空格短语的字典
        const wordsWithSpace = Object.fromEntries(
            Object.entries(dict).filter(([k, v]) => k.includes(" "))
        );

        // 遍历带空格短语字典，如果文本包含键，则添加到映射中
        Object.entries(wordsWithSpace).map(([k, v]) => {
            if (lowerText.includes(k)) {
                matchesMap[k] = v;
            }
        });

        // 匹配文本中的单词，如果有对应的转换，则添加到映射中
        lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach((word) => {
            if (dict[word]) matchesMap[word] = dict[word];
        });

        // 匹配时间格式，并根据 locale 进行转换
        const matchedTimes = lowerText.match(timeRegex);

        if (matchedTimes) {
            matchedTimes.map((e) => {
                if (locale === "toBritish") {
                    return (matchesMap[e] = e.replace(":", "."));
                }
                return (matchesMap[e] = e.replace(".", ":"));
            })
        }

        // 如果映射中没有匹配项，则返回 null
        if (Object.keys(matchesMap).length === 0) return null;

        // 打印匹配映射
        console.log("matchesMap :>> ", matchesMap);
        // 替换文本中所有匹配的单词
        const translation = this.replaceAll(text, matchesMap);

        // 替换文本中所有匹配的单词，并添加高亮显示
        const translationWithHighlight = this.replaceAllWithHighlight(
            text,
            matchesMap
        );

        // 返回翻译后的文本和高亮显示的文本
        return [translation, translationWithHighlight];
    }

    // 替换文本中所有匹配的单词，并添加高亮显示
    replaceAllWithHighlight(text, map) {
        const re = new RegExp(Object.keys(map).join("|"), "gi");
        return text.replace(re, (matched) => {
            return `<span class="highlight">${map[matched.toLowerCase()]}</span>`;
        });
    }

    // 替换文本中所有匹配的单词
    replaceAll(text, map) {
        const re = new RegExp(Object.keys(map).join("|"), "gi");
        return text.replace(re, (matched) => map[matched.toLowerCase()]);
    }

}

// 导出 Translator 类
module.exports = Translator;