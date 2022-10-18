import {addNewMovie, getAllMovies} from "../../../lib/dao"

export default async function handler(req, res) {

    if (req.method === 'GET') {  
      const movie = await getAllMovies();
      console.log('Movies', movie);
      res.status(200).json(movie);
    }

    if (req.method ==='POST') { 
      try {
        console.log(req.body);
        const { name_movie, description, rating, date_created, photo_url } = req.body;
        const successAdd = await addNewMovie(name_movie, description, rating, date_created, photo_url);
        res.status(200).json({ name: successAdd.name_movie, description: successAdd.description, rating: successAdd.rating, date: successAdd.date_created, photoUrl: successAdd.photo_url });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Not success Add!' });  
    }
    }

  }
  