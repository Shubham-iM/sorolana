import {pool} from './db';

pool.connect();
export default function handler(req, res) {
  const { amount, tokenAddress, tokenChain, from, to, toChain, fee,status, messages } = req.body
  try {
    try {
      pool.query(`INSERT INTO transactions (amount, tokenaddress, tokenchain, fromaddress, toaddress, tochain, fee,status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
      [ amount , tokenAddress, tokenChain, from, to, toChain, fee,status]
        );
      res.status(201).send({
        message: 'Message added successfully!'
      });
      pool.end;

    } catch (error) {
      console.error('Error', error);
      res.status(500).send({
        message: 'something went wrong'
      });
    }
  } catch (error) {
    console.log('🚀 ~ handler ~ error', error);
  }
  pool.end;
}
