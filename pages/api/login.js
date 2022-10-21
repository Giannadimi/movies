import { pool } from '../../lib/dbHelper';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
const bcrypt = require('bcrypt');

// TODO: CTRL + ALT + F για να κάνεις auto format τον κώδικα
export default async function login(req, res) {
    
  if (req.method === 'POST') {
    const client = await pool.connect();
     try {
        const {email, password} = req.body;
        console.log(email,password);
        const loginValid = await client.query('SELECT email, password FROM person WHERE email=$1', [email]);
        console.log(loginValid.rows);
       
        if(loginValid.rows.length != 0){
        const res = await compare(password, loginValid.rows[0].password);
        console.log(res)
        if(res){
          console.log('Logged In!')
        }
        else{
          console.log('Wrong password')
        }
        }
        else{
        console.log('Wrong email or password')
        res.status(400).json({ message: 'Wrong email or password, please try again or sign up.'})
        }
        res.send()
      }
      catch (error) {
        console.error(error)
        res.status(500).json({message: 'Something went wrong!'})
      } finally {
        client.release();
    }
  }
  else{
    res.status(200).json({ message: 'Post only' });
  }
}
