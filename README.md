# px-parser
[![NPM version](https://img.shields.io/npm/v/px-parser.svg)](https://www.npmjs.com/package/px-parser)

用于将文件夹或文件里的css单位，按照指定比例和单位转换，并输出新的文件。
- 支持 px、rem、rpx单位。 
- 单个文件或者单目录批量转换。 

## 使用情景
某程序猿：上次做的那个h5里的`css文件`好像这次小程序也能用，但是单位是px，我想转成rpx，而且之前是375写的...要是有个命令行能一键转化`数字`和`单位`就好了...  
我：必须有啊！文档地址拿去!  ↓

## 安装及使用
打开cmd，运行以下命令全局安装:
```
npm install -g px-parser
```
### 转换单个文件
安装完成后，尝试转换一个名为index.css的文件，将里面所有px转为rem，并将数值除以100。
首先需要在当前目录按shift + 鼠标右键，选择 `在此处打开命令窗口`，输入以下命令：
```
pxp -i=index.css -x=0.01 -r=px:rem
或者
pxp -i index.css -x 0.01 -r px:rem
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
转换src下所有文件的单位
```
pxp -i=src -x=0.01 -r=px:rem
或
pxp -i src -x 0.01 -r px:rem
```
注意，pxp会转换src目录下所有`css、less、scss、sass、wxss、stylus、ux、vue、js、jsx、ts、tsx、wxml、html、php`文件中的css单位。

### 转换具体属性
pxp提供-p属性，用于转换特定属性，可指定多个如 font-size和margin：
```
pxp -i=a.css -x=0.75 -r=px:px -p=font-size,margin
```
目前暂不支持指定transform、以及calc等多元数值属性。

## 参数列表
| 指令 | 说明 |
| ---- | ---- |
| -i INPUT, --input INPUT | 需要转换的文件`相对路径`，支持`文件夹`批量操作，如a.css使用`-i a.css`，src文件夹使用 `-i src` |
| -x X | 指定倍数转换像素值，默认值为1 |
| -p P | 指定css属性转换，默认值为*，即所有 |
| -r R, --rule R | 指定转换单位，默认为px转为px，目前仅支持 px、rem、rpx。规则为: `-r 单位:单位`|
| -h, --help | 参数说明 |
| -v, --version | 当前px-parser版本 |

## 注意事项
建议转换前git提交代码或备份，以免误转换或写错参数。  
如有bug请提issues



