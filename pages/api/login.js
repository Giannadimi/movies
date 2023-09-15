import { pool } from '../../lib/dbHelper';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// import * as dotenv from "dotenv";
// dotenv.config();

export default async function login(req, res) {

  if (req.method === 'POST') {
    const client = await pool.connect();
        try {              
            const {email, password} = req.body;
            const user = { email };

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            if (accessToken) {
              res.status(200).json({ accessToken: accessToken })
            } else {
              res.status(400).json({message: "Token generation failed"})
            }
            const loginValid = await client.query('SELECT email, password FROM user WHERE email=$1', [email]);
            if (loginValid.rows.length != 0) {
              const res = await compare(password, loginValid.rows[0].password);
                if (res) {
                  console.log('Logged In!')
                }
                else {
                  console.log('Wrong password')
                }
            }
            else {
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

  if (req.method === 'DELETE') {
    try {
      refreshTokens = refreshTokens.filter(token => token !== req.body.token)
      res.status(200).json({ message: "Success Logout!"})
    } catch {
      res.status(400).json({ message: "Not Success Logout!"})
    }
  }
}
