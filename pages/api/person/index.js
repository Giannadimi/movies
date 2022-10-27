import { getAllUsers } from "../../../lib/dao";
import { pool } from "../../../lib/dbHelper"


export default async function handler(req, res) {
  const client = await pool.connect();
  console.log(client);

  if (req.method === 'GET') {  
      try{
        const users = await getAllUsers();
        console.log("Users:", users);
        res.status(200).json(users);
      } catch {    
        res.status(400).json({ message: 'Failed' });
      }   
  }

}
