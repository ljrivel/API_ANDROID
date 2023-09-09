import e from 'express';
import { getConnection } from '../ConnectionBD.js';

export const getStudents = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL infoEstudiante()');
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

export const addStudent = async (req, res) => {
  try {
    const { nombre, apellido, email, carnet } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarEstudiante(?,?,?,?)',
      [nombre, apellido, email, carnet]
    );

    if (
      rows[0][0].mensaje === 'El estudiante ya existe en la tabla estudiante.'
    ) {
      return res.status(404).json({ error: 'El estudiante ya existe.' });
    } else {
      res.json({ mensaje: 'Estudiante agregado con éxito' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al agregar estudiante');
    res.status(500).json({ error: 'Error al agregar estudiante' });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { nombre, apellido, email, carnet } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EditarEstudiante(?,?,?,?)', [
      nombre,
      apellido,
      email,
      carnet,
    ]);
    if (rows[0][0].mensaje === 'Estudiante modificado correctamente.') {
      res.json({ mensaje: 'Estudiante editado con éxito' });
    } else {
      return res.status(404).json({ error: 'El estudiante no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al editar estudiante');
    res.status(500).json({ error: 'Error al editar estudiante' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { carnet } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL EliminarEstudiantePorCarnet(?)',
      [carnet]
    );
    if (rows[0][0].mensaje === 'Estudiante eliminado correctamente.') {
      res.json({ mensaje: 'Estudiante eliminado con éxito' });
    } else {
      return res.status(404).json({ error: 'El estudiante no existe.' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar estudiante');
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

export const getStudentsbyCarnet = async (req, res) => {
  try {
    const { carnet } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL infoEstudiantePorCarnet(?)', [
      carnet,
    ]);
    if (
      rows[0][0].mensaje ===
      'No se encontró un estudiante con el carnet proporcionado.'
    ) {
      return res.status(404).json({ error: 'El estudiante no existe.' });
    } else {
      res.json(rows[0]);
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al obtener estudiante');
    res.status(500).json({ error: 'Error al obtener estudiante' });
  }
};
