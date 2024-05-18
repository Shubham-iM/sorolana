// @ts-ignore
import * as XDR from 'js-xdr';
import * as SorobanClient from 'stellar-sdk'; // // import * as SorobanClient from "stellar-sdk"
import BigNumber from 'bignumber.js';
import * as Stellar from 'stellar-sdk';
import { decode } from './utilities/base64';
import * as hex from './utilities/hex';

export const parse = (xdr, type = null) => {
  const parsed = parseRaw(xdr, type);
  return type ? { [type]: parsed } : parsed;
};
export const parseRaw = (xdr, parentType) => {
  if (xdr instanceof XDR.Struct) {
    const buffer = {};
    for (const attributeName in xdr._attributes) {
      buffer[attributeName] = parse(xdr._attributes[attributeName], null);
    }
    return buffer;
  }
  if (xdr instanceof XDR.Union) {
    if (Number.isInteger(xdr._switch)) {
      return xdr._switch;
    }
    if (xdr._value !== undefined) {
      const type = typeof xdr._arm === 'string' ? xdr._arm : null;
      return parse(xdr._value, type);
    }
    return parse(xdr._switch, null);
  }
  if (xdr instanceof XDR.Enum) {
    return xdr.name;
    return {
      [xdr.name]: parse(xdr.value, null),
    };
  }
  if (xdr instanceof XDR.Hyper) {
    const number = (BigInt(xdr.high) << BigInt.asIntN(32, xdr.high)) | BigInt(xdr.low);

    if (number === BigInt(Number.parseInt(number.toString()))) {
      return Number.parseInt(number.toString());
    }
    return number;
  }
  if (xdr instanceof XDR.UnsignedHyper) {
    const number = (BigInt(xdr.high) << BigInt(32)) | BigInt(xdr.low);
    

    if (number === BigInt(Number.parseInt(number.toString()))) {
      return Number.parseInt(number.toString());
    }

    return number;
  }
  if (Number.isInteger(xdr)) {
    return Number.parseInt(xdr);
  }
  if (xdr instanceof Uint8Array) {
    if (parentType === 'ed25519') {
      try {
        // const keys = new Keys(xdr);
        return xdr;
      } catch (error) {}
    } else if (parentType === 'sym') {
      const symbol = new TextDecoder().decode(xdr);

      return symbol;
    }
    return hex.encode(xdr);
  }
  if (xdr instanceof Array) {
    // console.log('🚀 ~ parseRaw261 ~ xdr', xdr);
    return xdr.map((xdr) => parse(xdr));
  }
  const symbol = new TextDecoder().decode(xdr);

  return null;
};

function bigNumberFromBytes(signed, ...bytes){
  let sign = 1;
  if (signed && bytes[0] === 0x80) {
    // top bit is set, negative number.
    sign = -1;
    bytes[0] &= 0x7f;
  }
  let b = BigInt(0);
  for (const byte of bytes) {
    b <<= BigInt(8);
    b |= BigInt(byte);
  }
  return BigNumber(b.toString()).multipliedBy(sign);
}
const formatAmount = (value, decimals = 7)=>
  value
    .shiftedBy(decimals * -1)
    .toNumber()
    .toLocaleString();
