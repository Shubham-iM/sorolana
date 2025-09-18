// import {pool} from './db';
// export default async function handler(req, res) {
//   try {
//     const client = await pool.connect();

//     try {
//       const result = await client.query(`SELECT * FROM chains`);

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


import { pool } from './db';

export default async function handler(req, res) {
  try {
    // Simulate a database connection, but using hardcoded values instead
    const chains = [
      { id: 2, name: "Solana" },
      { id: 1, name: "Soroban" }
    ];

    // Log the hardcoded data (optional)
    console.log("Chains:", chains);

    // Send the hardcoded chains data as the response
    res.status(200).json({ data: chains });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
