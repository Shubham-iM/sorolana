// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import {pool} from './db';
// client.connect();
// export default function handler(req, res) {
//   try {
//     client.query(`SELECT * FROM transactions`, (err, result) => {
//       if (!err) {
//         let _pa = JSON.stringify(result.rows);
//         let _str = JSON.parse(_pa);
//         res.status(200).json({data: _str});
//       }
//     });
//     client.end;
//   } catch (error) {
//     res.status(500).json({error: error});
//   }
// }

import {pool} from './db';
export default async function handler(req, res) {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query(`SELECT * FROM transactions`);
      let _pa = JSON.stringify(result.rows);
      let _str = JSON.parse(_pa);
      res.status(200).json({ data: _str });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


