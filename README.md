# px-parser
[![NPM version](https://img.shields.io/npm/v/px-parser.svg)](https://www.npmjs.com/package/px-parser)

用于将文件里的css单位，按照指定比例和单位转换。
目前仅支持 px、rem、rpx

## 安装及使用
打开cmd，运行以下命令全局安装:
```
npm install -g px-parser
```
尝试转换一个名为index.css的文件，将里面所有px转为rem，并将数值除以100:
```
pxp -i index.css -x 0.01 -r px:rem
或者
pxp -i=index.css -x=0.01 -r=px:rem
```
然后按照提示进行选择。效果如下：  
index.css 转换前:
``` css
div{
 font-size: 20px;
}
```
index.css 转换后:
``` css
div{
 font-size: 0.2rem;
}
```


## 参数列表
| 指令 | 说明 |
| ---- | ---- |
| -i INPUT, --input INPUT | 需要转换的文件路径，如a.css， `-i a.css` 或 `--input a.css` |
| -o OUTPUT, --output OUTPUT | 准备输出的文件路径，不传则覆盖原文件。 |
| -x X | 指定倍数转换像素值，默认值为2 |
| -r R, --rule R | 指定转换单位，默认为px转为px，目前仅支持 px、rem、rpx。规则为: `-r 单位:单位`|
| -h, --help | 参数说明 |
| -v, --version | 当前px-parser版本 |

## 注意事项
建议用于转换.less、.css、.scss等样式文件。当然也可尝试转换.html、.vue、.jsx等文件中的样式。原理是正则匹配 数值px 进行替换。


