const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const voterRoute = require("./routes/voter");
const statsRoute = require("./routes/stats");


const PORT = process.env.PORT || "8080";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(voterRoute);
app.use(statsRoute);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});