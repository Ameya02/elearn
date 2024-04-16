const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/connection');
dotenv.config();
const PORT = process.env.PORT || 3001;

const routes = require('./routes/routes.js');
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes)

sequelize.sync().then(()=>{
    console.log("Database synced");
    app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})});