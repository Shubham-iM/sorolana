import * as SorobanClient from 'stellar-sdk';
import { bigValue } from '../../utils/formatNumber';
import { encode } from '../encode';
import { getAccount, transactionBuilder, server } from '../jsClient';
import * as convert from '../decode';

const { xdr } = SorobanClient;
export const calculateLentValue = async (val, addr ) => {
  if (val <= '0') {
    //   setDisableButtonWD(true)
    return null;
  }
  // setDisableButtonWD(false)

  try {
    //   setIsloading(true)
    const account = await getAccount(addr);
    const method = 'get_lent'; // method name
    const params1 = {
      type: 'scoI128',
      value: bigValue(val),
    };
    const args1 = encode(params1); // encode input value according to rust data type
    const allParams = [args1];
    // create transaction build
    const transaction = transactionBuilder(account, method, allParams);

    // simulate transaction
    const { results } = await server.simulateTransaction(transaction);
    if (!results || results.length !== 1) {
      throw new Error('Invalid response from simulateTransaction');
    }
    // get footprint
    const result = results[0];
    const _convert = convert.scvalToBigNumber(xdr.ScVal.fromXDR(result.xdr, 'base64')).toNumber();
    return _convert;
    //   setCalculateLentVal(_convert / 10 ** 7)
    //   setIsloading(false)
  } catch (error) {
    //   setIsloading(false)

    console.log('🚀 ~ calculatelent ~ error', error);
  }
};
