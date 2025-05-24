import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(express.json());

export let users = [];

const posts = [
  {
    id: 1,
    username: "swaroopa",
    title: "Hello World",
    content: "This is my first post!",
  },
  {
    id: 2,
    username: "srija",
    title: "Hello Universe",
    content: "This is my second post!",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/user", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    users.push({
      name:req.body.username,
      password: hashPassword,
    });
    res.send("Success");
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username == req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3002, () => {
  console.log("Server listening on port 3000");
});
