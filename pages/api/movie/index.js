import {addNewMovie, getAllMovies} from "../../../lib/dao"

export default async function handler(req, res) {

    if (req.method === 'GET') { 
      try {
          const movie = await getAllMovies();
          console.log('Movies:', movie);
          res.status(200).json(movie);
      } catch (error) {
          console.error(error);
          res.status(400).json({ message: 'Failed' });  
      } 
    }

    if (req.method ==='POST') { 
      try {
        console.log(req.body);
        const successAdd = await addNewMovie(req.body);
        res.status(200).json({ name: successAdd.name_movie, description: successAdd.description, rating: successAdd.rating, date: successAdd.date_created, photoUrl: successAdd.photo_url });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Not success Add!' });  
      }
    }

  }
  