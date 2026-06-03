const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToMongo = require("./db");

dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

connectToMongo();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "iNotebook API is running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
