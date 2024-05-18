import {pool} from './db';

export default function handler(req, res) {
    const {accountAddress} = req.query
    pool.connect();
  try {
    pool.query(`SELECT * FROM transactions WHERE fromaddress = '${accountAddress}'`, (err, result) => {
            if (!err) {
                let _data = JSON.stringify(result.rows)
                let _transactions = JSON.parse(_data)
                res.status(200).json({ data: _transactions })
            }
            console.log("error",err)
        });
  
     pool.end;
  
    } catch (error) {
      res.status(500).json({error: error});
    } 
}
