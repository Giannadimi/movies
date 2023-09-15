import {deleteMovieById, editMovieById, getMovieById} from "../../../lib/dao"

export default async function handler(req, res) {

    const { id } = req.query;
    if (req.method === 'GET') {
      try{
        const movie = await getMovieById(id);
        res.status(200).json(movie);
      } catch {
        res.status(401).json({ message: "Movie not found!"});
      }

    }
    
    if (req.method === 'DELETE') {
      try {
        const successDel = await deleteMovieById(id);
        res.status(200).json({ message: "Success Delete!"});
      } catch {
        res.status(400).json({ message: "Not Success Delete!"});
      }
    }
    
    if (req.method === 'PUT') {
      try{
        const movieUpdate = await editMovieById(req.body);
      res.status(200).json({message: "Success Edit!"});
      } catch {
        res.status(400).json({message: "Not Success Edit!"});
      }
    }
  
  }
  

  