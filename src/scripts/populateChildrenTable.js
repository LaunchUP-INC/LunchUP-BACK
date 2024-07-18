const { Child, User, School } = require("../db");

const populateChildren = async () => {
  try {
    const children = [
      {
        firstname: "Maria",
        lastname: "Gomez",
        gradeLevel: "5A",
        UserId: "8b195a37-5c26-40d9-8135-ae9fea6b3769",
        SchoolId: "1",
      },
      {
        firstname: "Mateo",
        lastname: "Gomez",
        gradeLevel: "2A",
        UserId: "8b195a37-5c26-40d9-8135-ae9fea6b3769",
        SchoolId: "1",
      },

      {
        firstname: "Lucio",
        lastname: "Chavez",
        gradeLevel: "1b",
        UserId: "a9bf3931-84e4-4490-9ba2-735a8acfc1be",
        SchoolId: "3",
      },

      {
        firstname: "Mia",
        lastname: "Neruda",
        gradeLevel: "3A",
        UserId: "2f707d37-df73-4fe2-bda6-0ae8cfb15113",
        SchoolId: "4",
      },

      {
        firstname: "Elias",
        lastname: "Rosini",
        gradeLevel: "6B",
        UserId: "44d0cadb-49f6-4de6-acaf-ac8ace79f0d9",
        SchoolId: "2",
      },
      {
        firstname: "Camila",
        lastname: "Rosini",
        gradeLevel: "4B",
        UserId: "44d0cadb-49f6-4de6-acaf-ac8ace79f0d9",
        SchoolId: "1",
      },
      {
        firstname: "Guadalupe",
        lastname: "Ledesma",
        gradeLevel: "5B",
        UserId: "ab174d20-bf7d-4481-8bfc-479197af0b81",
        SchoolId: "3",
      },
      {
        firstname: "Martin",
        lastname: "Fernandez",
        gradeLevel: "1A",
        UserId: "64a22e84-e4ac-4995-a4c9-0fbb9a378dad",
        SchoolId: "2",
      },
      {
        firstname: "Bautista",
        lastname: "Aymar",
        gradeLevel: "2A",
        UserId: "4cdc43bc-9970-4a29-8474-d672fa7ae3a1",
        SchoolId: "5",
      },
      {
        firstname: "Galo",
        lastname: "Serra",
        gradeLevel: "3B",
        UserId: "eb03ff4e-5b6b-46e6-afa8-225b61315895",
        SchoolId: "4",
      },
      {
        firstname: "Dante",
        lastname: "Mendez",
        gradeLevel: "6A",
        UserId: "81b9cd9e-16a5-49bf-8ae0-42b716e7224c",
        SchoolId: "5",
      },
      {
        firstname: "Paula",
        lastname: "Nadal",
        gradeLevel: "3A",
        UserId: "db8a8499-bed3-438a-8fd1-c910ba16bd8d",
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
