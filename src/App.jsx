import React from 'react';
import { firebase } from './firebase';

function App() {

  const [tareas, setTareas] = React.useState([]);
  const [tarea, setTarea] = React.useState('');
  const [modoedicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection('tareas').get();
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('esta vacio')
      return
    }

    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        nombre: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea);
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea('');

    } catch (error) {
      console.log(error);
    }

    console.log(tarea);
  }

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()
      const arrayFlitrado = tareas.filter(item => item.id != id);
      setTareas(arrayFlitrado);

    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.nombre);
    setId(item.id);
  }

  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('esta vacio')
      return
    }
    try {
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).update({
        nombre: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, fecha: item.fecha, nombre: tarea } : item
      ))
      setTareas(arrayEditado);
      setModoEdicion(false);
      setTarea('');
      setId('');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.nombre} - {item.fecha}
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button
                    className="btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>{modoedicion ? 'Editar Tarea' : 'Agregar Tarea'}</h3>
          <form onSubmit={modoedicion ? editar : agregar}>
            <input
              type="text"
              placeholder="Ingresa tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)} value={tarea} />
            <button className={modoedicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'}
              type="submit">{modoedicion ? 'Editar' : 'Agregar'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
