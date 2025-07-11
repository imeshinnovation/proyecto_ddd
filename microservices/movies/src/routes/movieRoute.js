const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { verifyToken } = require("../libs/helpers");

router.get("/movies", verifyToken, movieController.getMovies);

module.exports = router