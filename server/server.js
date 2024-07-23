const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser')
const port = process.env.PORT

require("./config/config");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const BoardRoutes = require("./routes/boards.routes");
BoardRoutes(app)

app.listen(port, () => console.log(`You're connected on port ${port}`))