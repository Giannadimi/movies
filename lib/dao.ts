import { pool } from "./dbHelper";

export const getAllMovies = async () => {
    const client = await pool.connect();
    try {
        const all = await client.query("SELECT * FROM movie");
        return all.rows;   
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

export const getMovieById = async (id:any) => {
    const client = await pool.connect();
    try {
        const movie = await client.query("SELECT * FROM movie where id=$1", [id]);
        return movie.rows[0];   
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

export const deleteMovieById = async(id:any) => {

    const client = await pool.connect();
    try {       
        const remove = await client.query("DELETE FROM movie where id=$1", [id]);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
    
}

export const addNewMovie = async(name_movie: string, description: string, rating: number, date_created: Date, photo_url: string) => {
    const client = await pool.connect();
    // console.log(name_movie, description, rating, date_created, photo_url);
    try {
        const movieName = await client.query('INSERT INTO movie(name_movie, description, date_created, rating, photo_url) values ($1, $2, $3, $4, $5) returning *', [name_movie, description, date_created, rating, photo_url]);
        console.log(movieName?.rows[0]);
        return movieName?.rows[0];
        } catch (error) {
        console.error(error);
        } finally {
        client.release();
        }    
}

    
