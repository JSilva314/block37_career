const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

router.get("/", async (req, res, next) => {
  try {
    const cars = await prisma.cars.findMany();
    res.status(200).send(cars);
  } catch (error) {
    console.error(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const cars = await prisma.cars.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(cars);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", verify, async (req, res, next) => {
  const { color, make, model, year, img } = req.body;
  try {
    const car = await prisma.cars.create({
      data: {
        color,
        make,
        model,
        year,
        img,
        userId: req.user.id,
      },
    });
    res.status(201).send(car);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
