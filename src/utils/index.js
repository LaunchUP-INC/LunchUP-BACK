const validate = (req, res, next) => {
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

module.exports = {
  validate,
}