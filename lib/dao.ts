import { IMovie } from "../pages/types";
import { pool } from "./dbHelper";

export const getUser = async (id: number) => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM user WHERE id=$1', [id]);
        return res.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

export const getAllUsers = async () => {
    const client = await pool.connect();
    try {
        const users = await client.query("SELECT id, email, username FROM user");
        return users.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

export const addUser = async (username: string, email: string) => {
    const client = await pool.connect();
    try {
        const newUser = await client.query('UPDATE user SET username = $1, email = $2, where id = $3 returning *', [username, email]);
        return newUser?.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

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

export const getMovieById = async (id: number) => {
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

export const deleteMovieById = async (id: number) => {
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

export const addNewMovie = async (newMovie: IMovie) => {
    const client = await pool.connect();
    const { name_movie, description, rating, date_created, photo_url } = newMovie;
    try {

        const movieName = await client.query('INSERT INTO movie(name_movie, description, date_created, rating, photo_url) values ($1, $2, $3, $4, $5) returning *', [name_movie, description, date_created, rating, photo_url]);
        return movieName?.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

export const editMovieById = async (edit: IMovie) => {
    const client = await pool.connect();
    const { name_movie, description, rating, date_created, photo_url } = edit;
    try {
        const editMovie = await client.query('UPDATE movie SET name_movie = $1, description = $2, date_created= $3, rating= $4, photo_url= $5 WHERE id=$6 returning *', [name_movie, description, date_created, rating, photo_url, id]);
        return editMovie?.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}






