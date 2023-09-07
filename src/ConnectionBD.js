import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9645024',
  password: 'atUuhlD2uY',
  database: 'sql9645024',
};

export async function getConnection() {
  try {
    const pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    throw error;
  }
}
