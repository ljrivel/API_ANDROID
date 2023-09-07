import { getConnection } from '../ConnectionBD';

export const getCourses = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query('CALL infoCurso()');
    if (rows[0][0].mensaje === 'La tabla curso está vacía.') {
      return res.status(404).json({ error: 'La tabla curso está vacía.' });
    } else {
      res.json(rows[0]);
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al obtener los cursos');
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};
