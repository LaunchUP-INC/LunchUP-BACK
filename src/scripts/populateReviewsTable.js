// const { User, Review } = require("../db");

// const populateReviews = async () => {
//   try {
//     const reviews = [
//       {
//         comment: "Excelente solucion para la merienda escolar de mis hijos",
//         score: 5,
//         UserId: "6daaf748-164e-4b5a-b8f9-03a8f29c0cae",
//       },

//       {
//         comment:
//           "Muy útil para gestionar las comidas escolares. mucha variedad de platos",
//         score: 5,
//         UserId: "3ec06b64-86a0-4a01-b403-b6eb7761cecb",
//       },

//       {
//         comment:
//           "Excelente app. Puedo ver el menú del comedor escolar y planificar las comidas de mis hijos fácilmente.",
//         score: 5,
//         UserId: "30ad56ff-dad5-421d-9678-631e5f02d040",
//       },

//       {
//         comment:
//           "Muy buena esta app. Puedo ver el menú escolar diario y gestionar los pagos sin problemas",
//         score: 4,
//         UserId: "e8670d75-ac33-42d6-be5b-757a3e60586c",
//       },

//       {
//         comment:
//           "Recomiendo esta app, me encanta que puedo seleccionar que tipo de plato prefiero para mi hijo",
//         score: 4,
//         UserId: "7d68ec0b-f6e0-45ad-89f8-0eff82f5eda4",
//       },

//       {
//         comment: "Muy buena aplicacion, facil de usar",
//         score: 4,
//         UserId: "4f1f3b40-ff9e-4ced-b8f1-cd430980ff4b",
//       },
//       {
//         comment:
//           "¡App genial! Me ayuda a estar al tanto del menú escolar y gestionar los pagos de manera sencilla. ¡Muy útil!",
//         score: 5,
//         UserId: "526b22e6-3775-4da5-911e-55c0100739f9",
//       },
//       {
//         comment:
//           "Me facilita la merienda de mis hijos, puedo saber que esta consumiendo",
//         score: 4,
//         UserId: "93f629dc-2662-40b5-914d-190d6bd1ab6a",
//       },
//     ];

//     const findAll = await Review.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["id"],
//         },
//       ],
//     });

//     if (!findAll.length) {
//       await Promise.all(
//         reviews.map(async (reviewDat) => {
//           const { comment, score, UserId } = reviewDat;

//           const user = await User.findByPk(UserId);

//           if (user) {
//             const newReview = await Review.create({
//               comment,
//               score,
//               UserId,
//             });
//             await newReview.setUser(user);
//           } else {
//             console.error(`Usuario no encontrado para la Review`);
//           }
//         })
//       );
//     } else {
//       console.log("Los datos ya existen en la tabla Child.");
//     }
//   } catch (error) {
//     console.error("Error al crear comensales:", error);
//   }
// };

// module.exports = populateReviews;
