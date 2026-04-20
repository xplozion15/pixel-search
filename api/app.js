const express = require("express");
const app = express();
const { gameRouter } = require("./routes/game.routes.js");
const { characterRouter } = require("./routes/character.routes.js");
const cors = require("cors");
const port = 3000;

// Read the two frontend urls from env
const allowedOrigins = [process.env.FRONTEND_URL];

// Enable CORS for allowed frontends
app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use("/sessions", gameRouter);
app.use("/characters", characterRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
