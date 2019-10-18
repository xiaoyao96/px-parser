#! /usr/bin/env node

(function(global) {
  const fs = require("fs");
  const inquirer = require("inquirer");
  const chalk = require("chalk")
  const logSymbols = require("log-symbols");

  const ArgumentParser = require("argparse").ArgumentParser;
  const unitsConfig = ["px", "px", "rem", "rem", "rpx", "rpx"];
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
    choices: Array.from(
      new Set(queue(unitsConfig, 2).map(item => item.join(":")))
    )
  });
  const args = parser.parseArgs();

  if (args.input) {
    main(args);
  } else {
    console.log("\033[31mError: input参数不能为空！请运行-h查看帮助。\033[0m ");
  }
  function main(query) {
    if(!fs.existsSync(query.input)){
      console.log(logSymbols.error, chalk.red(query.input + '目录不存在'));
      return;
    }
    console.log(logSymbols.info, `正在读取 ${query.input}...`);
    const promptList = [
      {
        type: 'confirm',
        name: 'goOn',
        message: "即将覆盖文件/文件夹" + chalk.yellow(query.input) + "，是否继续？"
      }
    ]
    inquirer.prompt(promptList).then(answer => {
      if(answer.goOn){
        DirHandler(query.input, function(path) {
          let inputStr = fs.readFileSync(path);
          let units = query.rule.split(":");
          let result = inputStr
            .toString()
            .replace(
              new RegExp(`[ |:|\(]-?((\\d+)?(\\.\\d+)?)(${units[0]})`, "g"),
              function(s, v, p, u) {
                return s
                  .replace(v, v * query.x)
                  .replace(u, units[1]);
              }
            );
          // yes
          if(result !== inputStr.toString()){
            fs.writeFileSync(path, result);
          }
        })
      }
    })
  }
  function DirHandler(path = "./", handler) {
    if (fs.lstatSync(path).isDirectory()) {
      let folder = path[path.length - 1] === '/' ? path : path + '/'
      let result = fs.readdirSync(folder);
      result.forEach(item => {
        DirHandler(folder + item, handler);
      });
    } else {
      if(/\.(css|less|scss|sass|wxss|stylus|ux|vue|js|jsx|ts|tsx|wxml|html|php)$/.test(path)) typeof handler === "function" && handler(path);
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
