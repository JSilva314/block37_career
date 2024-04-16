const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const prisma = require("../client");

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send(401).send({ message: "Incorrect username or password" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const isValid = await bcrpyt.compare(password, user.password);

    if (!isValid) {
      res.status(401).send({ message: "Not authorized!" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
  }
});
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrpyt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
