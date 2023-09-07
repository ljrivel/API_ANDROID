import { getConnection } from '../ConnectionBD';

export const getRegister = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL infoCursoMatriculado()');
    if (rows[0][0].mensaje === 'La tabla cursoMatriculado está vacía.') {
      return res
        .status(404)
        .json({ error: 'La tabla cursoMatriculado está vacía.' });
    } else {
      res.json(rows[0]);
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al obtener las matriculas');
    res.status(500).json({ error: 'Error al obtener las matriculas' });
  }
};
