# LunchUP-BACK
## Configuracion de entorno

1. Crear un archivo .env con la siguiente estructura:

```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=lunchup
```

2. Crear una base de datos con el nombre `lunchup` con PostgreSQL

3. Hacer `$ npm install `

4. Ejecutar `$ npm start` para que se creen las tablas por primera vez y levantar el servidor de trabajo.

## API

### Dishes

Este documento describe las rutas disponibles para interactuar con la entidad Dish en la API REST. Las operaciones incluidas son la creación, consulta y actualización de platos (Dishes).

*GET /dishes*

Esta ruta permite obtener todos los platos disponibles.

*Parámetros de consulta*

Ninguno.

*Respuesta exitosa (200)*
```
{
    "allDishes": [
        {
            "id": 4,
            "name": "pizza",
            "description": "mezcla fresca de frutas tropicales",
            "price": 25,
            "image": "",
            "Meal_Type": {
                "id": 1,
                "name": "Almuerzo"
            }
        },
        {
            "id": 3,
            "name": "ensalada de frutas",
            "description": "mezcla fresca de frutas tropicales",
            "price": 25,
            "image": "",
            "Meal_Type": {
                "id": 1,
                "name": "Almuerzo"
            }
        },
        {
            "id": 2,
            "name": "ensalada de frutas",
            "description": "mezcla fresca de frutas tropicales",
            "price": 25,
            "image": "",
            "Meal_Type": {
                "id": 1,
                "name": "Almuerzo"
            }
        },
        {
            "id": 1,
            "name": "ensalada de frutas",
            "description": "mezcla fresca de frutas tropicales",
            "price": 25,
            "image": "",
            "Meal_Type": {
                "id": 1,
                "name": "Almuerzo"
            }
        }
    ]
}
```

*GET /dishes/:id*

Esta ruta permite obtener un plato específico por su ID.

*Parámetros de ruta*

id: ID del plato (entero).

*Respuesta exitosa (200)*
```
{
  "id": 1,
  "name": "Nombre del plato",
  "description": "Descripción del plato",
  "price": 10.99,
  "image": "URL de la imagen"
  "Meal_Type": {
    "id": 1,
    "nam": "Vegano"
  }
}
```

*GET /dishes/?name=*

Esta ruta permite obtener un plato o varios por su nombre.

*Parámetros de ruta*

name: Nombre del plato o parte de el.

*Respuesta exitosa (200)*
```
{
    "dishByName": [
        {
            "id": 4,
            "name": "pizza",
            "description": "mezcla fresca de frutas tropicales",
            "price": 25,
            "image": "",
            "Meal_Type": {
                "id": 1,
                "name": "Almuerzo"
            }
        }
    ]
}
```

*POST /dishes*

Esta ruta permite crear un nuevo plato.

*Body de la solicitud*

```
{
  "name": "Nombre del plato",
  "description": "Descripción del plato",
  "price": 10.99,
  "image": "URL de la imagen"
  "mealTypeId": 1
}
```

*Respuesta exitosa (200 Created)*
```
{
  "newId": 1
}
```

*Respuesta si hay errores de validación (400 Bad Request)*
```
{
  "error": [DINAMICO Y DESCRIPTIVO]
}
```

