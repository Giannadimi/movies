import { hash } from 'bcrypt';
import { pool } from '../../lib/dbHelper';
const bcrypt = require('bcrypt');

export default async function register(req, res) {

  const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;  
  }
  
  if (req.method === 'POST') {
    const client = await pool.connect();
    try {
        const { username, email, password } = req.body;
        const hash = hashPassword(password);
        const reg_email = await client.query('SELECT email FROM user WHERE email = $1', [email]);
        if (reg_email.rows.length == 0 ) {
          const statement = await client.query('INSERT INTO user (username, email, password) values ($1, $2, $3) returning *', [username, email, hash ]);
          res.status(200).json({ username: statement.rows[0].username, email: statement.rows[0].email, password: statement.rows[0].password }); 
        }
        else {
          console.log('Duplicate email')
          res.status(400).json({ message: 'Account already exists, please login or try another email!'})
        }
     
      
      } catch (error) {
        console.error(error);
      } finally {
        client.release();
      }    

    }
}