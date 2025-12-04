import {getMovieCollection} from '../config/db.js';
import { ObjectId } from "mongodb";

export class movie {
    constructor({title, director, year}){
        if (!title || !director || !year || year < 1700) {
            throw new Error("Invalid movie data");
        }
        this.title = title;
        this.director = director;
        this.year = year;
    }

    static async findAll(filters = {}) {
        const collection = getMovieCollection();
        let results = await collection.find({}).toArray();
        
        if (filters.director) {
            results = results.filter(movie => movie.director.toLowerCase().includes(filters.director.toLowerCase()));
        }
        if (filters.year) {
            results = results.filter(movie => movie.year === parseInt(filters.year));
        }
        return results;
    }

    static async findById(id) {
        const collection = getMovieCollection();
        return await collection.findOne({ _id: new ObjectId(id) });
    }

    static async update(id, data){
        const updatedMovie = new movie(data);
        const collection = getMovieCollection();

        await collection.replaceOne({_id: new ObjectId(id)}, updatedMovie);
        return updatedMovie;
    }

    static async create(data) {
        const collection = getMovieCollection();
        const newMovie = new movie(data);
        await collection.insertOne(newMovie);
        return newMovie;
    }

    static async delete(id){
        const collection = getMovieCollection();
        const movieToDelete = await collection.deleteOne({_id: new ObjectId(id)});
        return movieToDelete;
    }
}