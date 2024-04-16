const express = require("express");
const router = express.Router();
const prisma = require("../client");

//Get /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
