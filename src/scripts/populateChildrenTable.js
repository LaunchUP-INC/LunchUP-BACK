const { Child, User, School } = require("../db");

const populateChildren = async () => {
  try {
    const children = [
      {
        firstname: "Maria",
        lastname: "Gomez",
        gradeLevel: "5A",
        UserId: "6daaf748-164e-4b5a-b8f9-03a8f29c0cae",
        SchoolId: "1",
      },
      {
        firstname: "Mateo",
        lastname: "Gomez",
        gradeLevel: "2A",
        UserId: "6daaf748-164e-4b5a-b8f9-03a8f29c0cae",
        SchoolId: "1",
      },

      {
        firstname: "Lucio",
        lastname: "Chavez",
        gradeLevel: "1b",
        UserId: "3ec06b64-86a0-4a01-b403-b6eb7761cecb",
        SchoolId: "3",
      },

      {
        firstname: "Mia",
        lastname: "Neruda",
        gradeLevel: "3A",
        UserId: "30ad56ff-dad5-421d-9678-631e5f02d040",
        SchoolId: "4",
      },

      {
        firstname: "Elias",
        lastname: "Rosini",
        gradeLevel: "6B",
        UserId: "e8670d75-ac33-42d6-be5b-757a3e60586c",
        SchoolId: "2",
      },
      {
        firstname: "Camila",
        lastname: "Rosini",
        gradeLevel: "4B",
        UserId: "e8670d75-ac33-42d6-be5b-757a3e60586c",
        SchoolId: "1",
      },
      {
        firstname: "Guadalupe",
        lastname: "Ledesma",
        gradeLevel: "5B",
        UserId: "7d68ec0b-f6e0-45ad-89f8-0eff82f5eda4",
        SchoolId: "3",
      },
      {
        firstname: "Martin",
        lastname: "Fernandez",
        gradeLevel: "1A",
        UserId: "4f1f3b40-ff9e-4ced-b8f1-cd430980ff4b",
        SchoolId: "2",
      },
      {
        firstname: "Bautista",
        lastname: "Aymar",
        gradeLevel: "2A",
        UserId: "526b22e6-3775-4da5-911e-55c0100739f9",
        SchoolId: "5",
      },
      {
        firstname: "Galo",
        lastname: "Serra",
        gradeLevel: "3B",
        UserId: "93f629dc-2662-40b5-914d-190d6bd1ab6a",
        SchoolId: "4",
      },
      {
        firstname: "Dante",
        lastname: "Mendez",
        gradeLevel: "6A",
        UserId: "144bb671-b97c-43cc-b358-49d87d98db1f",
        SchoolId: "5",
      },
      {
        firstname: "Paula",
        lastname: "Nadal",
        gradeLevel: "3A",
        UserId: "05fff7cd-b1d3-4b39-b909-dc9243338f1f",
        SchoolId: "5",
      },
    ];

    const findAll = await Child.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
        {
          model: School,
          attributes: ["id"],
        },
      ],
    });

    if (!findAll.length) {
      await Promise.all(
        children.map(async (childData) => {
          const { firstname, lastname, gradeLevel, UserId, SchoolId } =
            childData;

          const user = await User.findByPk(UserId);
          const school = await School.findByPk(SchoolId);

          if (user && school) {
            const newChild = await Child.create({
              firstname,
              lastname,
              gradeLevel,
              UserId,
              SchoolId,
            });
            await newChild.setUser(user);
            await newChild.setSchool(school);
          } else {
            console.error(
              `Usuario o escuela no encontrada para el niño: ${firstname} ${lastname}`
            );
          }
        })
      );
    } else {
      console.log("Los datos ya existen en la tabla Child.");
    }
  } catch (error) {
    console.error("Error al crear comensales:", error);
  }
};

module.exports = populateChildren;
