# px-parser
[![NPM version](https://img.shields.io/npm/v/px-parser.svg)](https://www.npmjs.com/package/px-parser)

用于将文件里的css单位，按照指定比例和单位转换。输出新的文件。
目前仅支持 px、rem、rpx单位

## 安装及使用
打开cmd，运行以下命令全局安装:
```
npm install -g px-parser
```
### 转换单个文件
安装完成后，尝试转换一个名为index.css的文件，将里面所有px转为rem，并将数值除以100。
首先需要在当前目录按shift + 鼠标右键，选择 `在此处打开命令窗口`，输入以下命令：
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
### 转换某个文件夹内所有文件
```
pxp -i src -x 0.01 -r px:rem
或者
pxp -i=src -x=0.01 -r=px:rem
```


## 参数列表
| 指令 | 说明 |
| ---- | ---- |
| -i INPUT, --input INPUT | 需要转换的文件`相对路径`，支持文件夹批量操作，如a.css或a文件夹， `-i a.css` 或 `--input a.css` 或 `-i a` |
| -x X | 指定倍数转换像素值，默认值为2 |
| -r R, --rule R | 指定转换单位，默认为px转为px，目前仅支持 px、rem、rpx。规则为: `-r 单位:单位`|
| -h, --help | 参数说明 |
| -v, --version | 当前px-parser版本 |

## 注意事项
建议转换前git提交代码或备份，以免误转换或写错参数。


