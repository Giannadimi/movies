import {deleteMovieById, getMovieById} from "../../../lib/dao"

export default async function handler(req, res) {

    const { id } = req.query;
    if (req.method === 'GET') {
      const movie = await getMovieById(id);
      if(movie){
        res.status(200).json(movie)
      }
      else {
        res.status(401).json({ message: "Movie not found!"})
      }

    }
    
    if (req.method === 'DELETE') {
      const successDel = deleteMovieById(id);
      if (successDel){
      res.status(200).json({ message: "Success Delete!"})
      } else {
        res.status(400).json({ message: "Not Success Delete!"})
      }
    }
      
    // if (req.method === 'PUT') {
    //   const statement = await db.prepare('UPDATE movie set name_movie=?, description=?, rating=?, date_created=?, photo_url=? where id=?');
      
    //   const result = await statement.run(
    //     req.body.name_movies, 
    //     req.body.description,
    //     req.body.rating, 
    //     req.body.date_created,
    //     req.body.photo_url,
    //     req.query.id
    //     );
    //  result.finalize();
    // }

  }

  