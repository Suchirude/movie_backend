import {Router} from 'express';
import {
    getMovies,
    getMovieByID,
    addMovie,
    updateMovie,
    removeMovie
} from '../controllers/movieController.js';
import {validateMovie} from '../middlewares/validateMovie.js';
import {logger} from '../middlewares/logger.js';
import { authenticate } from "../middlewares/auth.js";


const movieRouter = Router();

movieRouter.get('/', logger, getMovies);
movieRouter.get('/:id', getMovieByID);
movieRouter.post('/', authenticate, validateMovie, logger, addMovie);
movieRouter.put('/:id', authenticate, validateMovie, updateMovie);
movieRouter.delete('/:id', authenticate, removeMovie);

export default movieRouter;