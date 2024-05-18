import numeral from 'numeral';
import BigNumber from 'bignumber.js';
import bigInt from 'big-integer';

// ----------------------------------------------------------------------


export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}
export function bigValue(number) {
  const val = bigInt(Number(number) * 10 ** 7);
  return val.toString();
}
export function smallValue(number) {
  const val = Number(number) / 10 ** 7;
  return val.toString();
  // return '0'
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}

export function fNumberToMB(amount) {
  const num = new BigNumber(amount);

  // billion
  const b = 1000000000;
  if (num.gte(b)) {
    return `${num.div(b).toFormat(2)}B`;
  }

  // million
  const m = 1000000;
  if (num.gte(m)) {
    return `${num.div(m).toFormat(2)}M`;
  }

  // thousand
  const k = 1000;
  if (num.gte(k)) {
    return `${num.div(k).toFormat(2)}K`;
  }

  // smallest amount
  const min = 0.001;
  if (num.lt(min)) {
    if (num.isZero()) {
      return `0.00`;
    }

    return `0.00`;
  }

  return `${num.toFormat(2)}`;
}
