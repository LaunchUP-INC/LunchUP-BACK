const { Dish, Meal_Type } = require("../db");

const populateDishes = async () => {
  try {
    const dishes = [
      {
        name: "Hamburguesa",
        description: "Deliciosa hamburguesa con carne, lechuga y tomate.",
        price: 230,
        images: ["https://gestion.pe/resizer/i5vGkdDtf5Hm87rWfJgyCvkwEyI=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IOUUSANWTNDP7G3IJPGGO6NZOI.jpg"],
        mealTypes: [1, 4], 
      },
      {
        name: "Ensalada César",
        description: "Ensalada fresca con pollo, lechuga, crutones y aderezo César.",
        price: 120,
        images: ["https://imag.bonviveur.com/ensalada-cesar-casera.jpg"],
        mealTypes: [2, 3], 
      },
      {
        name: "Empanada de carne",
        description: "Empanadas rellenas de carne, cebolla, huevo duro y aceitunas, cocidas al horno.",
        price: 100,
        images: ["https://img.bekiacocina.com/cocina/0000/265-h.jpg"],
        mealTypes: [1], 
      },
      {
        name: "Milanesa a la napolitana",
        description: "Milanesa de carne empanizada, cubierta con salsa de tomate, jamón y queso derretido.",
        price: 250,
        images: ["https://imag.bonviveur.com/milanesa-a-la-napolitana.jpg"],
        mealTypes: [3, 4], 
      },
      {
        name: "Milanesa de carne",
        description: "Filete de carne vacuna rebozado con pan rallado y huevo.",
        price: 200,
        images: ["https://www.unileverfoodsolutions.com.ar/dam/global-ufs/mcos/sla/argentina/calcmenu/recipes/AR-recipes/pack-shot-truth-visual/milanesas-de-peceto/main-header.jpg"],
        mealTypes: [1, 4], 
      },
      {
        name: "Milanesa de pollo",
        description: "Filete de carne aviar rebozado con pan rallado y huevo.",
        price: 200,
        images: ["https://thriftandspice.com/wp-content/uploads/2022/09/milanesa-de-pollo.jpg"],
        mealTypes: [3, 4, 5], 
      },
      {
        name: "Ensalada de quinoa con verduras asadas",
        description: "Ensalada refrescante y nutritiva preparada con quinoa, mezclada con verduras asadas como pimientos, calabacines y berenjenas, aliñada con aceite de oliva, limón y hierbas frescas.",
        price: 130,
        images: ["https://blogscdn.thehut.net/wp-content/uploads/sites/406/2018/07/26142315/1200x672_Quinoa-Salad_1200x672_acf_cropped.jpg"],
        mealTypes: [4], 
      },
      {
        name: "Tarta de jamón y queso",
        description: "Tarta preparada con masa casera rellena de jamón cocido, queso y crema.",
        price: 150,
        images: ["https://alicante.com.ar/wp-content/uploads/2022/06/87_receta.jpg"],
        mealTypes: [1], 
      },
      {
        name: "Guiso de lentejas",
        description: "Guiso casero preparado con lentejas, zanahorias, cebolla y pimientos, condimentado con comino y laurel.",
        price: 230,
        images: ["https://educacional.org.ar/wp-content/uploads/2022/09/WhatsApp-Image-2019-05-14-at-9.10.40-PM-1-scaled-1.jpeg"],
        mealTypes: [3], 
      },
      {
        name: "Sándwich de jamón y queso",
        description: "Sándwich emparedado con jamón y queso dentro de dos rebanadas de pan. Se sirve tostado, tras untarlo con mantequilla.",
        price: 120,
        images: ["https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1002601.jpg"],
        mealTypes: [1], 
      },
      {
        name: "Sopa de verduras",
        description: "Sopa caliente y reconfortante preparada con una variedad de verduras frescas y caldo casero.",
        price: 200,
        images: ["https://cocinemosjuntos.com.co/media/mageplaza/blog/post/r/e/recetas-faciles-para-preparar-sopa-de-verduras_1_.jpg"],
        mealTypes: [1, 2] 
      },
    ];

    const findAll = await Dish.findAll({
      include: {
        model: Meal_Type,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    });

    if (!findAll.length) {
      for (let dishData of dishes) {
        const { name, description, price, images, mealTypes } = dishData;
  
        const newDish = await Dish.create({
          name,
          description,
          price,
          images,
        });
  
        const result = await Meal_Type.findAll({
          where: {
            id: mealTypes.map(id => parseInt(id))
          }
        });
      
        await newDish.setMeal_Types(result);      
      }
    }
  } catch (error) {
    console.error("Error al crear platos mockeados:", error);
  }
};

module.exports = populateDishes;