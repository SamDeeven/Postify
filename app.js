const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 5001





mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => console.log("Mongo DB is connected"));
mongoose.connection.on("error !!!", (err) => console.log("There is error in the Mongo DB connection", err));


require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/register'))
app.use(require('./routes/post'))


app.get('/', (req, res) => {
    res.send('Server is connected')
})


app.listen(5001, () => console.log("Server is listening at 5001"));