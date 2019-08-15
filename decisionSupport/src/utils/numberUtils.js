// 将数字转化为标准展示 三位隔开

export function numberToShow(number) {
    if (!number) {
        return '0';
    }
    if (number < 0) {
        return String(number);
    }
    let numArr = [];
    numArr = String(number).split("");
    for (let i = numArr.length - 3; i > 0; i -= 3) {
        numArr.splice(i, 0, ',');
    }
    return numArr.join("");
}