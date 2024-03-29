export { formatBoolean, formatDate, formatNum };

// 布尔值
function formatBoolean(value) {
  return value ? "是" : "否";
}
// 时间戳转换
function formatDate(value) {
  let date = new Date(parseInt(value));
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  // let D = date.getDate();
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + "." + M + "." + D + " " + h + ":" + m + ":" + s;
}
// 数值
function formatNum(num) {
  num = (num || 0).toString();
  let result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}
