const express = require("express");
const env = require("dotenv").config().parsed
const dba = require("./services/dba");
const userRouter = require("./routes/userRoute");
const logger = require("./libs/logger");
const app1 = express();

dba.conn().then(()=>{
    logger.info("Users: Connected to MongoDB")
}).catch(()=>{
    logger.warn("Users: There is no connection with MongoDB");
})

app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use("/", userRouter);

app1.listen(env.PORT, "0.0.0.0", ()=>{
    console.log("Service listen on port:", env.PORT)
})


