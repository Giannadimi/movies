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
        console.log(username, email, hash);
        const reg_email = await client.query('SELECT email FROM person WHERE email = $1', [email]);
        console.log('a', reg_email.rows);

        if (reg_email.rows.length == 0 ) {
          const statement = await client.query('INSERT INTO person (username, email, password) values ($1, $2, $3) returning *', [username, email, hash ]);
          console.log(statement.rows[0])
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