import {pool} from './db';
pool.connect();
export default function handler(req, res) {
  try {
    pool.query(`SELECT * FROM transactions`, (err, result) => {
      if (!err) {
        let _pa = JSON.stringify(result.rows);
        let _str = JSON.parse(_pa);
        res.status(200).json({data: _str});
      }
    });
    pool.end;
  } catch (error) {
    res.status(500).json({error: error});
  }
}
