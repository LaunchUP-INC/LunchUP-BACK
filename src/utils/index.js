const validateDish = (req, res, next) => {
  const { name, price, image } = req.body;
  if ( 
    !name ||
    !price
  ) {
    return res.status(400).json({ error: 'Faltan datos necesarios para crear el plato de comida' });
  } 

  if (!/^[a-zA-Z\s-]+$/.test(name)) {
    return res.status(400).json({ error: 'El nombre no puede contener simbolos' });
  }

  const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  if (image && !isValidUrl(image)) {
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

module.exports = {
  validateDish,
  validateUser
}