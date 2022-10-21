import { addUser, getUser } from "../../../lib/dao";

export default async function handler(req, res) {

    const { id } = req.query;
    if (req.method === 'GET') {
        try {
          const res = await getUser(id);
          res.status(200).json(res)
        } catch {
          res.status(401).json({ message: "User not found!"})
        }
  
      }
       
    if (req.method === 'PUT') {
      try{
        const {id, username, email, password} = req.body;
        // console.log(req.body);
        const personAdded = await addUser(id, username, email, password);
        console.log(personAdded);
      res.status(200).json({message: "Success Register!"})
      } catch {
        res.status(400).json({message: "Not Success Register!"})
      }
    }

  }
  