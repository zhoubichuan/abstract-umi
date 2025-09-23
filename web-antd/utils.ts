export function toFixed(num: any, fixed: number = 2, format = 'string') {
  if (num === '--') {
    return num;
  }
  let target = Number.isInteger(+num) ? +num : Number(num).toFixed(fixed);
  if (format === 'string') {
    return target + '';
  } else {
    return target;
  }
}
