const prisma = require("./src/server/client");

async function seed() {
  const donatello = await prisma.user.create({
    data: {
      username: "donatello",
      password: "123",
    },
  });
  const michaelangelo = await prisma.user.create({
    data: {
      username: "michaelangelo",
      password: "123",
    },
  });
  const raphael = await prisma.user.create({
    data: {
      username: "raphael",
      password: "123",
    },
  });
  const leonardo = await prisma.user.create({
    data: {
      username: "leonardo",
      password: "123",
    },
  });

  const car1 = await prisma.cars.create({
    data: {
      color: "Red",
      make: "Toyota",
      model: "Supra",
      year: 2024,
      img: "placeholder",

      userId: donatello.id,
    },
  });
  const car2 = await prisma.cars.create({
    data: {
      color: "Black",
      make: "Acura",
      model: "Integra",
      year: 2023,
      img: "placeholder",

      userId: leonardo.id,
    },
  });
  const car3 = await prisma.cars.create({
    data: {
      color: "White",
      make: "Honda",
      model: "Civic Type R",
      year: 2024,
      img: "placeholder",
      userId: raphael.id,
    },
  });
  const car4 = await prisma.cars.create({
    data: {
      color: "Blue",
      make: "Subaru",
      model: "Impreza WRX",
      year: 2016,
      img: "placeholder",

      userId: michaelangelo.id,
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
