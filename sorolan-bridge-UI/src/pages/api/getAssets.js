// import { pool } from './db';
// export default async function handler(req, res) {
//   try {
//     const client = await pool.connect();

//     try {
//       const result = await client.query('SELECT * FROM assets');
//       console.log("result",result);

//       let _pa = JSON.stringify(result.rows);
//       console.log("_pa",_pa);
//       let _str = JSON.parse(_pa);
//       console.log("_str",_str);
//       res.status(200).json({ data: _str });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// process.on('beforeExit', () => {
//   pool.end();
// });

import { pool } from './db';

export default async function handler(req, res) {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT * FROM assets');
      console.log("Database Result:", result);

      // Hardcoded assets for SOL and XLM
      const hardcodedAssets = [
        { id: 1, name: 'SOL (Solana)', value: 1500 },
        { id: 2, name: 'XLM (Stellar)', value: 500 }
      ];

      // Merge database result with hardcoded assets
      const mergedAssets = [...result.rows, ...hardcodedAssets];
      
      // Convert to JSON string and back to object (optional step)
      let _pa = JSON.stringify(mergedAssets);
      console.log("Merged Assets:", _pa);
      let _str = JSON.parse(_pa);
      console.log("Parsed Assets:", _str);

      // Send the merged result as the response
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

process.on('beforeExit', () => {
  pool.end();
});
