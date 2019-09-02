// 将数字转化为标准展示 三位隔开

export function numberToShow(number) {
  if (!number) {
    return '0';
  }
  if (number < 0) {
    return String(number);
  }
  let numArr = [];
  numArr = String(number).split('');
  for (let i = numArr.length - 3; i > 0; i -= 3) {
    numArr.splice(i, 0, ',');
  }
  return numArr.join('');
}

// 数字简化 保留两位小数  args1: 数值  args2:保留单位 10000表示除以10000后保留两位小数
export function numberSimplify(number, unit) {
  const temp = number / unit;
  return Math.floor(temp * 100) / 100;
}
