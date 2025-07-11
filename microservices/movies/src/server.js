const express = require("express");
const env = require("dotenv").config().parsed
const dba = require("./services/dba");
const movieRouter = require("./routes/movieRoute");
const morgan = require("morgan");
const logger = require("./libs/logger");

const app1 = express();
app1.use(morgan("dev"));

dba
  .conn()
  .then(() => {
    logger.info("Movies: Connected to MongoDB");
  })
  .catch(() => {
    logger.warn("Movies: There is no connection with MongoDB");
  });

app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use("/", movieRouter);

app1.listen(env.PORT, "0.0.0.0", ()=>{
    console.log("Service listen on port:", env.PORT)
})


