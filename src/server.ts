import express, { json, Request, Response } from 'express';
import cors from 'cors';
import movieRoutes from './Routes/movieRoutes';


const server = express();
server.use(json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
const PORT = 3001

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