import { pool } from './db';
export default async function handler(req, res) {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT * FROM assets');
      console.log("result",result);

      let _pa = JSON.stringify(result.rows);
      console.log("_pa",_pa);
      let _str = JSON.parse(_pa);
      console.log("_str",_str);
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
