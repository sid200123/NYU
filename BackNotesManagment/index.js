const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require("./config/config.js");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", require("./routes/user.routes.js"))
app.use("/note", require("./routes/note.routes.js"))

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})