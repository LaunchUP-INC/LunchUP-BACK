const { User, Review } = require("../db");

const populateReviews = async () => {
  try {
    const reviews = [
      {
        comment: "Excelente solucion para la merienda escolar de mis hijos",
        score: 5,
        UserId: "8b195a37-5c26-40d9-8135-ae9fea6b3769",
      },

      {
        comment:
          "Muy útil para gestionar las comidas escolares. mucha variedad de platos",
        score: 5,
        UserId: "a9bf3931-84e4-4490-9ba2-735a8acfc1be",
      },

      {
        comment:
          "Excelente app. Puedo ver el menú del comedor escolar y planificar las comidas de mis hijos fácilmente.",
        score: 5,
        UserId: "2f707d37-df73-4fe2-bda6-0ae8cfb15113",
      },

      {
        comment:
          "Muy buena esta app. Puedo ver el menú escolar diario y gestionar los pagos sin problemas",
        score: 4,
        UserId: "44d0cadb-49f6-4de6-acaf-ac8ace79f0d9",
      },

      {
        comment:
          "Recomiendo esta app, me encanta que puedo seleccionar que tipo de plato prefiero para mi hijo",
        score: 4,
        UserId: "ab174d20-bf7d-4481-8bfc-479197af0b81",
      },

      {
        comment: "Muy buena aplicacion, facil de usar",
        score: 4,
        UserId: "4cdc43bc-9970-4a29-8474-d672fa7ae3a1",
      },
      {
        comment:
          "¡App genial! Me ayuda a estar al tanto del menú escolar y gestionar los pagos de manera sencilla. ¡Muy útil!",
        score: 5,
        UserId: "eb03ff4e-5b6b-46e6-afa8-225b61315895",
      },
      {
        comment:
          "Me facilita la merienda de mis hijos, puedo saber que esta consumiendo",
        score: 4,
        UserId: "81b9cd9e-16a5-49bf-8ae0-42b716e7224c",
      },
    ];

    const findAll = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });

    if (!findAll.length) {
      await Promise.all(
        reviews.map(async (reviewDat) => {
          const { comment, score, UserId } = reviewDat;

          const user = await User.findByPk(UserId);

          if (user) {
            const newReview = await Review.create({
              comment,
              score,
              UserId,
            });
            await newReview.setUser(user);
          } else {
            console.error(`Usuario no encontrados para la Review`);
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

module.exports = populateReviews;
