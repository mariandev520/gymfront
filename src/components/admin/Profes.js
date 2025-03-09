import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "ngrok-skip-browser-warning": "true" },
});

const Profes = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfesor, setNewProfesor] = useState({ nombre: "" });
  const [editProfesor, setEditProfesor] = useState(null);
  const [error, setError] = useState("");

  // 🔹 Obtener los profesores desde la API
  useEffect(() => {
    axiosInstance
      .get("/profesores")
      .then((response) => {
        setProfesores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los profesores:", error);
        setError("Hubo un problema al obtener los profesores.");
        setLoading(false);
      });
  }, []);

  // 🔹 Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  // 🔹 Agregar un nuevo profesor
  const handleSubmitNewProfesor = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/profesores", newProfesor)
      .then((response) => {
        setProfesores([...profesores, response.data]);
        setNewProfesor({ nombre: "" });
      })
      .catch((error) => {
        console.error("Error al agregar el profesor:", error);
        setError("Hubo un problema al agregar el profesor.");
      });
  };

  // 🔹 Eliminar un profesor
  const handleDeleteProfesor = (id) => {
    axiosInstance
      .delete(`/profesores/${id}`)
      .then(() => {
        setProfesores(profesores.filter((profesor) => profesor._id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el profesor:", error);
        setError("Hubo un problema al eliminar el profesor.");
      });
  };

  // 🔹 Editar un profesor
  const handleEditProfesor = (profesor) => {
    setEditProfesor(profesor);
  };

  // 🔹 Actualizar un profesor
  const handleUpdateProfesor = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/profesores/${editProfesor._id}`, editProfesor)
      .then((response) => {
        setProfesores(
          profesores.map((profesor) =>
            profesor._id === editProfesor._id ? response.data : profesor
          )
        );
        setEditProfesor(null);
      })
      .catch((error) => {
        console.error("Error al actualizar el profesor:", error);
        setError("Hubo un problema al actualizar el profesor.");
      });
  };

  // 🔹 Mostrar mensaje de carga
  if (loading) {
    return <div className="text-center py-8 text-white">Cargando profesores...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Profesores</h1>

      {/* Mensaje de error */}
      {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-6">{error}</div>}

      {/* Formulario para agregar un nuevo profesor */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agregar Profesor</h2>
        <form onSubmit={handleSubmitNewProfesor} className="bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={newProfesor.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
              placeholder="Nombre del profesor"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
            Agregar Profesor
          </button>
        </form>
      </section>

      {/* Formulario para actualizar un profesor */}
      {editProfesor && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Profesor</h2>
          <form onSubmit={handleUpdateProfesor} className="bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-white">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={editProfesor.nombre}
                onChange={(e) => setEditProfesor({ ...editProfesor, nombre: e.target.value })}
                className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
              Actualizar Profesor
            </button>
          </form>
        </section>
      )}

      {/* Lista de profesores */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Profesores</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <table className="w-full text-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profesores.map((profesor) => (
                <tr key={profesor._id} className="border-b border-gray-700 hover:bg-gray-800 transition duration-300">
                  <td className="px-4 py-2">{profesor.nombre}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                        onClick={() => handleEditProfesor(profesor)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                        onClick={() => handleDeleteProfesor(profesor._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Profes;
