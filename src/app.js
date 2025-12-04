import movieRouter from "./routes/movies.js"
import authRouter from "./routes/auth.js"
import {setupDB} from "./config/db.js";
import express from "express";
import morgan from "morgan";
const app = express();
const PORT = process.env.MONGO_DB_PORT;

await setupDB();

app.use(morgan("dev"));
app.use(express.json());
app.use('/movies', movieRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    res.status(404).send("This page does not exist");
})

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})



