/**
 * 单位转换器函数
 * @param {*} inputStr
 * @param {*} x
 * @param {*} rule
 * @param {*} prop
 */
function converter(inputStr = "", x = 1, rule = "px:px", prop = "*") {
  let units = rule.split(":");
  const exp = `[ |:|\\(|,|\\*|/|\\+|-]-?((\\d+)?(\\.\\d+)?)(${units[0]})`;
  let result = "";
  if (prop !== "*") {
    let expWithProp =
      "(" +
      prop
        .split(",")
        .map((item) => item)
        .join("|") +
      `)${exp}`;
    result = inputStr
      .toString()
      .replace(new RegExp(expWithProp, "g"), function (f, s, v, p, u) {
        return f.replace(v, v * x).replace(units[0], units[1]);
      });
  } else {
    result = inputStr.toString().replace(new RegExp(exp, "g"), function (s, v) {
      return s.replace(v, v * x).replace(units[0], units[1]);
    });
  }
  return result
}

module.exports = converter;
