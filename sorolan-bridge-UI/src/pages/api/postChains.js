import {pool} from './db';

pool.connect();
export default function handler(req, res) {
  const { id,name } = req.body
  try {
    try {
      pool.query(`INSERT INTO chains (id ,name) VALUES ($1, $2)`, 
      [id ,name]
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
