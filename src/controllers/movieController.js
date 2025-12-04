import {movie} from "../models/movie.js";


export const getMovies = async (req, res) => {
    try{
        const results = await movie.findAll(req.query);

        return res.json(results);
    }
    catch(err){
        console.log("Get /movies error: " + err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const updateMovie = async(req, res) => {
    try{
        const updatedMovie = await movie.update(req.params.id, req.body);

        return res.status(201).json(updatedMovie);
    }
    catch(err){
        console.log("Put movies/:id error: " + err);
        return res.status(500).send("Internal server error");
    }
}

export const getMovieByID = async (req, res) => {
    try{
        let result = await movie.findById(req.params.id);

        return res.json(result);
    }
    catch(err){
        console.log("Get /movies:id error: " + err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const addMovie = async (req, res) => {
    try{
        const newMovie = await movie.create(req.body);

        res.status(201).json(newMovie);
    }
    catch(err){
        console.log("Post /movies error: " + err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const removeMovie = async (req, res) => {
    try{
        const movieToDelete = await movie.delete(req.params.id);

        res.status(204).json(movieToDelete);
    }
    catch(err){
        console.log("Delete /movies:id error: " + err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

