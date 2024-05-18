import {pool} from './db';

export default function handler(req, res) {
  const {message_id} = req.query;
  console.log('🚀 ~ handler ~ message_id', message_id)
  pool.connect();
  let query=`SELECT * FROM signature WHERE mid = '${message_id}'`
  console.log('🚀 ~ handler ~ query', query)
  try {
    pool.query(
      query,
      (err, result) => {
        if (!err) {
          console.log('🚀 ~ handler ~ result.rows', result)
          res.status(200).json(result?.rows)
          pool.end
        }
        else{
          console.log("err",err)
          res.status(500).json(err)
        }
      }
    );
  } catch (error) {
    console.log('🚀 ~ handler ~ error', error);
    pool.end;
  }
}
