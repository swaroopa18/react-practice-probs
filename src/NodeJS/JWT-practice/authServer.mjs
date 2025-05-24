import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import { users } from "./server.mjs";

// require('crypto').randomBytes(64).toString('hex') - to create access token
dotenv.config();
const app = express();
app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Authenticate user
  const users=[]
  const user = users.find((u) => u.username === username);
  if (user == null) return res.status(400).send("User not found");

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.send("Not allowed");
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

app.listen(4000, () => {
    console.log("Auth server listening on port 4000");
  });
