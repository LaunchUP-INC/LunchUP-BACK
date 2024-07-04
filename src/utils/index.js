const cloudinary = require('../../cloudinaryConfig');

const validateDish = (req, res, next) => {
  const { name, description, price, images } = req.body;
  if ( 
    !name ||
    !description ||
    !price
  ) {
    return res.status(400).json({ error: 'Faltan datos necesarios para crear el plato de comida' });
  } 

  if (!/^[a-zA-Z\s-]+$/.test(name)) {
    return res.status(400).json({ error: 'El nombre no puede contener simbolos' });
  }

  const isValidUrl = (urls) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    for (const url of urls) {
      if (!urlPattern.test(url)) {
        return false;
      }
    }
  
    return true;
  };

  if (images && !isValidUrl(images)) {
    return res.status(400).json({ error: 'La URL de la imagen no es válida '});
  }
  
  next();
};

const validateUser = (req, res, next) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = req.body;

  if (
    !firstname || 
    !lastname || 
    !telephone || 
    !email || 
    !password || 
    isAdmin === undefined
  ) {
    return res.status(400).json({ error: 'Todos los campos deben ser completados' });
  }

  if (!/^[a-zA-Z\s-]+$/.test(firstname)) {
    return res.status(400).json({ error: 'El nombre no puede contener simbolos' });
  }

  if (!/^[a-zA-Z\s-]+$/.test(lastname)) {
    return res.status(400).json({ error: 'El apellido no puede contener simbolos' });
  }

  const validatePhone = (phone) => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(phone);
  };

  if (!validatePhone(telephone)) {
    return res.status(400).json({ error: 'El número de teléfono no es válido' });
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "La contraseña debe contener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial" });
  }

  if (typeof isAdmin !== "boolean") {
    return res.status(400).json({ error: 'El campo "isAdmin" debe ser un booleano' });
  }

  next();
};

const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'dishes',
      resource_type: 'image'
    });

    return result.secure_url;
  } catch (error) {
    throw new Error(`Error al subir imagen a Cloudinary: ${error.message}`);
  }
};

const handleDishesImages = async (allDishes) => {
  try {
    for (const dish of allDishes) {
      const uploadedImages = await Promise.all(
        dish.images.map(async (image) => await uploadImage(image, 'dishes'))
      );

      dish.images = uploadedImages;
    }
    
    return allDishes;
  } catch (error) {
    throw new Error(`Error al manejar imágenes de platos: ${error.message}`);
  }
};

module.exports = {
  validateDish,
  validateUser,
  uploadImage,
  handleDishesImages
}