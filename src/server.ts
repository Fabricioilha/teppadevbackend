import express, { json, Request, Response } from 'express';
import cors from 'cors';
import movieRoutes from './Routes/movieRoutes';
import dotenv from 'dotenv'


const server = express();
dotenv.config()
server.use(json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
const PORT = process.env.PORT || 3000

server.use(movieRoutes)

server.get("/", async (req, res) => {
    res.send("back end works...")
})
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: "Endpoint não encontrado" })
})
server.listen(PORT, () => {
    console.log(`Server runing at http://localhost:${PORT}`)
})