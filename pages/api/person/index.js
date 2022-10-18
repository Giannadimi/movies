import { pool } from "../../../lib/dbHelper"


export default async function handler(req, res) {
    const client = await pool.connect();
    console.log(client);

    if (req.method === 'GET') {
           
      const people = await client.query("SELECT id, email, username FROM person");
      console.log('Users', people.rows);
      res.status(200).json(people.rows);

    }
    
  }
  