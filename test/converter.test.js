const converter = require("../src/converter.js");
const { expect } = require('chai')
describe("converter的测试用例 - 数值校验", () => {
  it('20px->40px', () => {
    expect(converter(`*{font-size:20px}`, 2)).to.equals(`*{font-size:40px}`)
    expect(converter(`*{font-size: 20px}`, 2)).to.equals(`*{font-size: 40px}`)
    expect(converter(`*{font-size:40px}`, 0.5)).to.equals(`*{font-size:20px}`)
    expect(converter(`*{font-size: 40px}`, 0.5)).to.equals(`*{font-size: 20px}`)
  })
  it('20px->20px', () => {
    expect(converter(`*{font-size:20px}`)).to.equals(`*{font-size:20px}`)
  })
  it('-20px->-20px', () => {
    expect(converter(`*{margin-top:-20px}`)).to.equals(`*{margin-top:-20px}`)
  })
  it('-20px->-40px', () => {
    expect(converter(`*{margin-top:-20px}`, 2)).to.equals(`*{margin-top:-40px}`)
    expect(converter(`*{margin-top: -20px}`, 2)).to.equals(`*{margin-top: -40px}`)
    expect(converter(`*{margin-top: calc(2*20px)}`, 2)).to.equals(`*{margin-top: calc(2*40px)}`)
    expect(converter(`*{margin-top: calc(2* 20px)}`, 2)).to.equals(`*{margin-top: calc(2* 40px)}`)
    expect(converter(`*{margin-top: calc(20px+20px)}`, 2)).to.equals(`*{margin-top: calc(40px+40px)}`)
    expect(converter(`*{margin-top: calc(20px-20px)}`, 2)).to.equals(`*{margin-top: calc(40px-40px)}`)
    expect(converter(`*{margin-top: calc(20px/2)}`, 2)).to.equals(`*{margin-top: calc(40px/2)}`)
  })
})

describe("converter的测试用例 - 单位校验", () => {
  it('20px->40rpx', () => {
    expect(converter(`*{font-size:20px}`, 2, 'px:rpx')).to.equals(`*{font-size:40rpx}`)
    expect(converter(`*{font-size:40rpx}`, 0.5, 'rpx:px')).to.equals(`*{font-size:20px}`)
  })
  it('20px->0.2rem', () => {
    expect(converter(`*{font-size:20px}`, 0.01, 'px:rem')).to.equals(`*{font-size:0.2rem}`)
    expect(converter(`*{font-size:0.2rem}`, 100, 'rem:px')).to.equals(`*{font-size:20px}`)
  })
  it('20rpx->20px', () => {
    expect(converter(`*{font-size:20rpx}`, 1, 'rpx:px')).to.equals(`*{font-size:20px}`)
  })
  it('-20rpx->-0.2rem', () => {
    expect(converter(`*{font-size:-20rpx}`, 0.01, 'rpx:rem')).to.equals(`*{font-size:-0.2rem}`)
  })
})

describe("converter的测试用例 - 其他综合", () => {
  it('多属性', () => {
    expect(converter(`*{font-size:20px;width:100px}`, 1, 'px:rpx')).to.equals(`*{font-size:20rpx;width:100rpx}`)
    expect(converter(`*{font-size:20px;width:100px}`, 0.01, 'px:rem')).to.equals(`*{font-size:0.2rem;width:1rem}`)
    expect(converter(`*{font-size:20px;width:100px}\na{font-size:12px;}`, 0.01, 'px:rem')).to.equals(`*{font-size:0.2rem;width:1rem}\na{font-size:0.12rem;}`)
  })
  it('特殊属性', () => {
    expect(converter(`.div{transform:translate(12px,12px)}`, 0.01, 'px:rem')).to.equals(`.div{transform:translate(0.12rem,0.12rem)}`)
    expect(converter(`.div{transform:translate(12px, -12px)}`, 0.01, 'px:rem')).to.equals(`.div{transform:translate(0.12rem, -0.12rem)}`)
    expect(converter(`.div{transform:translate( 12px, -12px)}`, 0.01, 'px:rem')).to.equals(`.div{transform:translate( 0.12rem, -0.12rem)}`)
    expect(converter(`.div{transform:translate( 12px,-12px)}`, 0.01, 'px:rem')).to.equals(`.div{transform:translate( 0.12rem,-0.12rem)}`)
  })
  it('指定属性font-size', () => {
    expect(converter(`.div{transform:translate(12px,12px)};font-size: 12px`, 0.01, 'px:rem', 'font-size')).to.equals(`.div{transform:translate(12px,12px)};font-size: 0.12rem`)
    expect(converter(`.div{transform:translate(12px,12px)};font-size:12px`, 0.01, 'px:rem', 'font-size')).to.equals(`.div{transform:translate(12px,12px)};font-size:0.12rem`)
  })
  
  it('test', () => {
    expect(converter(`.div1{ width: 100px;font-size: 20px } .div2{ width: 200px;font-size: 20px }`, 0.01, 'px:rem')).to.equals(`.div1{ width: 1rem;font-size: 0.2rem } .div2{ width: 2rem;font-size: 0.2rem }`)
    
  })
})
