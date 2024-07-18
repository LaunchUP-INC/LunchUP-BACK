const { User } = require("../db");

const populateUsers = async () => {
  try {
    const users = [
      {
        firstname: "Sabrina",
        lastname: "Gomez",
        telephone: 155743365,
        email: "sgomez@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Paula",
        lastname: "Chavez",
        telephone: 155743444,
        email: "pchavez@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Pablo",
        lastname: "Neruda",
        telephone: 156543365,
        email: "pneruda@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Lucas",
        lastname: "Rosini",
        telephone: 155743111,
        email: "lrosini@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Marcos",
        lastname: "Ledesma",
        telephone: 155743555,
        email: "mledesma@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Laura",
        lastname: "Fernandez",
        telephone: 155743365,
        email: "lfernandez@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Luciana",
        lastname: "Aymar",
        telephone: 155722365,
        email: "laymar@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Julia",
        lastname: "Serra",
        telephone: 155743115,
        email: "jserra@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Agustin",
        lastname: "Mendez",
        telephone: 155743365,
        email: "amendez@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
      {
        firstname: "Ivana",
        lastname: "Nadal",
        telephone: 153443365,
        email: "inadal@gmail.com",
        password: "Hola!123",
        isAdmin: false,
      },
    ];

    const findAll = await User.findAll();

    if (!findAll.length) {
      for (let userData of users) {
        const { firstname, lastname, telephone, email, password, isAdmin } =
          userData;

        const newUser = await User.create({
          firstname,
          lastname,
          telephone,
          email,
          password,
          isAdmin,
        });
      }
    }
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
};

module.exports = populateUsers;
