const { Dish, Meal_Type } = require("../db");

const populateDishes = async () => {
  try {
    const dishes = [
      {
        name: "Hamburguesa",
        description: "Deliciosa hamburguesa con carne, lechuga y tomate.",
        price: 230,
        image: "https://gestion.pe/resizer/i5vGkdDtf5Hm87rWfJgyCvkwEyI=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IOUUSANWTNDP7G3IJPGGO6NZOI.jpg",
        mealTypeId: 1, 
      },
      {
        name: "Ensalada César",
        description: "Ensalada fresca con pollo, lechuga, crutones y aderezo César.",
        price: 120,
        image: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
        mealTypeId: 2, 
      },
      {
        name: "Empanada de carne",
        description: "Empanadas rellenas de carne, cebolla, huevo duro y aceitunas, cocidas al horno.",
        price: 100,
        image: "https://img.bekiacocina.com/cocina/0000/265-h.jpg",
        mealTypeId: 1, 
      },
      {
        name: "Milanesa a la napolitana",
        description: "Milanesa de carne empanizada, cubierta con salsa de tomate, jamón y queso derretido.",
        price: 250,
        image: "https://imag.bonviveur.com/milanesa-a-la-napolitana.jpg",
        mealTypeId: 3, 
      },
      {
        name: "Milanesa de carne",
        description: "Filete de carne vacuna rebozado con pan rallado y huevo.",
        price: 200,
        image: "https://www.unileverfoodsolutions.com.ar/dam/global-ufs/mcos/sla/argentina/calcmenu/recipes/AR-recipes/pack-shot-truth-visual/milanesas-de-peceto/main-header.jpg",
        mealTypeId: 4, 
      },
      {
        name: "Milanesa de pollo",
        description: "Filete de carne aviar rebozado con pan rallado y huevo.",
        price: 200,
        image: "https://thriftandspice.com/wp-content/uploads/2022/09/milanesa-de-pollo.jpg",
        mealTypeId: 4, 
      },
      {
        name: "Ensalada de quinoa con verduras asadas",
        description: "Ensalada refrescante y nutritiva preparada con quinoa, mezclada con verduras asadas como pimientos, calabacines y berenjenas, aliñada con aceite de oliva, limón y hierbas frescas.",
        price: 130,
        image: "https://blogscdn.thehut.net/wp-content/uploads/sites/406/2018/07/26142315/1200x672_Quinoa-Salad_1200x672_acf_cropped.jpg",
        mealTypeId: 4, 
      },
      {
        name: "Tarta de jamón y queso",
        description: "Tarta preparada con masa casera rellena de jamón cocido, queso y crema.",
        price: 150,
        image: "https://alicante.com.ar/wp-content/uploads/2022/06/87_receta.jpg",
        mealTypeId: 1, 
      },
      {
        name: "Guiso de lentejas",
        description: "Guiso casero preparado con lentejas, zanahorias, cebolla y pimientos, condimentado con comino y laurel.",
        price: 230,
        image: "https://educacional.org.ar/wp-content/uploads/2022/09/WhatsApp-Image-2019-05-14-at-9.10.40-PM-1-scaled-1.jpeg",
        mealTypeId: 3, 
      },
      {
        name: "Sándwich de jamón y queso",
        price: 120,
        image: "https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1002601.jpg",
        mealTypeId: 1, 
      },
      {
        name: "Sopa de verduras",
        description: "Sopa caliente y reconfortante preparada con una variedad de verduras frescas y caldo casero.",
        price: 200,
        image: "https://cocinemosjuntos.com.co/media/mageplaza/blog/post/r/e/recetas-faciles-para-preparar-sopa-de-verduras_1_.jpg",
        mealTypeId: 2, 
      },
    ];

    for (let dishData of dishes) {
      const { name, description, price, image, mealTypeId } = dishData;

      const newDish = await Dish.create({
        name,
        description,
        price,
        image,
      });

      const mealType = await Meal_Type.findByPk(mealTypeId);
      if (!mealType) {
        throw new Error(`El tipo de comida con ID ${mealTypeId} no existe.`);
      }
      await newDish.setMeal_Type(mealType);
    }
  } catch (error) {
    console.error("Error al crear platos mockeados:", error);
  }
};

module.exports = populateDishes;