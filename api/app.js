const express = require("express");
const app = express();
const { sessionRouter } = require("./routes/session.routes.js");
const { characterRouter } = require("./routes/character.routes.js");
const { highscoreRouter } = require("./routes/highscore.routes.js");
const { statusRouter } = require("./routes/status.routes.js");

const cors = require("cors");
const port = 3000;

app.use(express.json());

// Read the two frontend urls from env
const allowedOrigins = [process.env.FRONTEND_URL];

// Enable CORS for allowed frontends
app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use("/sessions", sessionRouter);
app.use("/characters", characterRouter);
app.use("/highscores", highscoreRouter);
app.use("/status", statusRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
