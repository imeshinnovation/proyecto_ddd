const Movies = require("../models/movieModel");

const getMovies = async (req, res) => {
    const allMovies = await Movies.find({}).lean();
    res.json(allMovies);
}


module.exports = { getMovies }