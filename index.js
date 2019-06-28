#! /usr/bin/env node

(function(global) {
  const fs = require("fs");
  const confirm = require("confirm-cli");
  const ArgumentParser = require("argparse").ArgumentParser;
  const unitsConfig = ["px", "px", "rem", "rem", "rpx"];
  console.log(Array.from(new Set(queue(unitsConfig, 2).map(item => item.join(":")))))
  const parser = new ArgumentParser({
    version: "1.0.0",
    addHelp: true,
    description: "Argparse example"
  });
  parser.addArgument(["-i", "--input"], {
    help: "要转换的文件路径"
  });
  parser.addArgument(["-o", "--output"], {
    help: "输出的文件路径，不传则覆盖原文件"
  });
  parser.addArgument("-x", {
    help: "指定倍数转换像素值",
    type: "float",
    defaultValue: 2
  });
  parser.addArgument(["-r", "--rule"], {
    help: "指定转换单位，默认为 px:px，px转为px",
    defaultValue: "px:px",
    choices: Array.from(new Set(queue(unitsConfig, 2).map(item => item.join(":"))))
  });
  const args = parser.parseArgs();

  if (args.input) {
    main(args);
  } else {
    console.log("\033[31mError: input参数不能为空！请运行-h查看帮助。\033[0m ");
  }
  function main(query) {
    console.log(`正在读取 ${query.input} 文件...`);
    let inputStr = fs.readFileSync(query.input);
    let units = query.rule.split(":");
    let result = inputStr
      .toString()
      .replace(new RegExp(`[ |:](\\d+(\\.\\d+)?)(${units[0]})`, "g"), function(s, v, p ,u) {
        console.log(s, v, p, u)
        return s.replace(v, v * query.x).replace(u, units[1]);
      });
    let resultName = query.output || query.input;
    if (resultName === query.input) {
      confirm(
        "是否覆盖原文件？",
        function() {
          // yes
          fs.writeFileSync(resultName, result);
          console.log(`已覆盖 ${resultName} 文件`);
        },
        function() {
          //no
          fs.writeFileSync(resultName, result);
          console.log(`已写入 ${resultName} 文件`);
          let arr = query.input.split(".");
          let fileName = arr.splice(0, arr.length - 1).join(".");
          let type = arr[arr.length - 1];
          fs.writeFileSync(
            fileName + "-" + Math.random() + "." + type,
            inputStr
          );
          console.log(`原文件已备份到 ${resultName} 中`);
        },
        {
          text: ["是", "否"]
        }
      );
    }
  }
  function queue(arr, size) {
    if (size > arr.length) {
      return;
    }
    var allResult = [];

    (function f(arr, size, result) {
      if (result.length == size) {
        allResult.push(result);
      } else {
        for (var i = 0, len = arr.length; i < len; i++) {
          var newArr = [].concat(arr),
            curItem = newArr.splice(i, 1);
            f(newArr, size, [].concat(result, curItem));
        }
      }
    })(arr, size, []);

    return allResult;
  }
})(global);
