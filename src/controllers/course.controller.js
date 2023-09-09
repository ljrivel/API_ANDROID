import { getConnection } from '../ConnectionBD.js';

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

export const addCourse = async (req, res) => {
  try {
    const { nombre, codigo, descripcion } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.query('CALL InsertarCurso(?,?,?)', [
      codigo,
      nombre,
      descripcion,
    ]);

    if (rows[0][0].mensaje === 'El curso ya existe en la tabla curso.') {
      return res.status(404).json({ error: 'El curso ya existe.' });
    } else {
      res.json({ mensaje: 'Curso agregado con éxito' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al agregar curso');
    res.status(500).json({ error: 'Error al agregar curso' });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { codigo, nombre, descripcion } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.query('CALL ModificarCurso(?,?,?)', [
      codigo,
      nombre,
      descripcion,
    ]);
    if (rows[0][0].mensaje === 'Curso modificado correctamente.') {
      res.json({ mensaje: 'Curso editado con éxito' });
    } else {
      return res.status(404).json({ error: 'El curso no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al editar curso');
    res.status(500).json({ error: 'Error al editar curso' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { codigo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.query('CALL EliminarCurso(?)', [codigo]);
    if (rows[0][0].mensaje === 'Curso eliminado correctamente.') {
      res.json({ mensaje: 'Curso eliminado con éxito' });
    } else {
      return res.status(404).json({ error: 'El curso no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar curso');
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
};

export const getCoursesByCode = async (req, res) => {
  try {
    const { codigo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.query('CALL GetCursoPorCodigo(?)', [
      codigo,
    ]);
    if (rows[0][0].mensaje === 'El curso no existe en la tabla curso.') {
      return res.status(404).json({ error: 'El curso no existe.' });
    } else {
      res.json(rows[0]);
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al obtener el curso');
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};
