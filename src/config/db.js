import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const movies = [
    {title: "Inception", director: "Christopher Nolan", year: 2010},
    {title: "The Matrix", director: "The Wachowskis", year: 1999},
    {title: "Parasite", director: "Bong Joon-ho", year: 2019}
];
let db;
let movieCollection;

export async function setupDB() {
  try{
    console.log("trying to connect");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    db = client.db(process.env.MONGO_DB_NAME);
    movieCollection = db.collection("movies");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const dbIsEmpty = await movieCollection.countDocuments() ===0;
    if(dbIsEmpty){
      await movieCollection.insertMany(movies);
      console.log("New movies inserted");
    }
    else{
      console.log("Database already includes data, nothing new inserted");
    }
  }
  catch(err){
    console.error("Database failed to connect",err);
    throw err;
  }
}

export const getDB = () => db;
export const getMovieCollection = () => movieCollection;

