import { getConnection } from '../ConnectionBD.js';

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

export const addRegister = async (req, res) => {
  try {
    const { carnet, codigo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarMatriculaConCodigoCarnet(?,?)',
      [codigo,carnet]
    );

    if (
      rows[0][0].mensaje === 'El estudiante ya está matriculado en este curso.'
    ) {
      return res.status(200).json({
        error: 'El estudiante ya está matriculado en el curso.',
      });
    } else {
      if (
        rows[0][0].mensaje ===
        'No se encontró un curso con el código o un estudiante con el carnet proporcionado.'
      ) {
        return res.status(404).json({
          error: 'El estudiante y/o el curso no existen en la base de datos.',
        });
      } else {
        res.json({ mensaje: 'Matricula agregada con éxito' });
      }
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al agregar matricula');
    res.status(500).json({ error: 'Error al agregar matricula' });
  }
};

export const editRegister = async (req, res) => {
  try {
    const { id, fecha } = req.body;

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ModificarFechaMatricula(?,?)',
      [id, fecha]
    );

    if (rows[0][0].mensaje === 'Fecha de matrícula modificada correctamente.') {
      res.json({ mensaje: 'Fecha de matrícula modificada correctamente.' });
    } else {
      res.status(404).json({ error: 'La matrícula no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al modificar fecha de matrícula');
    res.status(500).json({ error: 'Error al modificar fecha de matrícula' });
  }
};

export const deleteRegister = async (req, res) => {
  try {
    const { id } = req.body;

    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarMatricula(?)', [id]);

    if (rows[0][0].mensaje === 'Matrícula eliminada correctamente.') {
      res.json({ mensaje: 'Matrícula eliminada correctamente.' });
    } else {
      res.status(404).json({ error: 'La matrícula no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar matrícula');
    res.status(500).json({ error: 'Error al eliminar matrícula' });
  }
};

export const getRegisterByID = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL GetMatriculaPorID(?)', [id]);
    if (
      rows[0][0].mensaje ===
      'No se encontró una matrícula con el ID proporcionado.'
    ) {
      return res.status(404).json({ error: 'no se encontro el id' });
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
