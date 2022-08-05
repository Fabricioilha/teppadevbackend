import { Router } from "express";
import { moviecontroller } from "../constroller/movies/movieControler";

const movieRoutes = Router()

movieRoutes.get("/movie", moviecontroller.getMovies);
movieRoutes.get("/movie/:id", moviecontroller.getMovieById);
movieRoutes.post("/movie", moviecontroller.postMovie);
movieRoutes.put("/movie/:id", moviecontroller.putMovie);
movieRoutes.delete("/movie/:id", moviecontroller.deleteMovie);

export default movieRoutes