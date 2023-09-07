import { getConnection } from '../ConnectionBD';

export const getStudents = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL infoEstudiante()');
    console.log(rows[0][0].mensaje);
    if (rows[0][0].mensaje === 'La tabla estudiante está vacía.') {
      return res.status(404).json({ error: 'La tabla estudiante está vacía.' });
    } else {
      res.json(rows[0]);
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al obtener estudiantes');
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};
