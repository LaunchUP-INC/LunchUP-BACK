require('dotenv').config();
const { Client } = require('pg');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const createDatabase = async () => {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: 'postgres' // Conectarse a la base de datos por defecto de PostgreSQL
  });

  try {
    await client.connect();

    // Comprobar si la base de datos existe
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]);

    if (res.rowCount === 0) {
      // Crear la base de datos si no existe
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully`);
    } else {
      console.log(`Database ${DB_NAME} already exists`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase();