import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://5ac6-2802-8012-2930-a901-6197-9b85-2698-663a.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "ngrok-skip-browser-warning": "true" },
});

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCliente, setNewCliente] = useState({
    nombre: "",
    direccion: "",
    correo: "",
    telefono: "",
    tarifa_mensual: "",
    actividades: [],
    profesores: [],
  });
  const [error, setError] = useState("");
  const [selectedActividad, setSelectedActividad] = useState(null);

  // Obtener actividades y profesores al cargar el componente
  useEffect(() => {
    axiosInstance
      .get("/actividades")
      .then((response) => setActividades(response.data))
      .catch((error) => console.error("Error fetching actividades:", error));

    axiosInstance
      .get("/profesores")
      .then((response) => setProfesores(response.data))
      .catch((error) => console.error("Error fetching profesores:", error));

    fetchClientes();
  }, []);

  // Obtener la lista de clientes
  const fetchClientes = () => {
    axiosInstance
      .get("/clientes/clientes-con-profesores-y-actividades")
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Error fetching clientes:", error));
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  // Manejar cambios en los selects del formulario
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setNewCliente({ ...newCliente, [name]: selectedValues });
  };

  // Enviar el nuevo cliente al backend
  const handleSubmitNewCliente = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/clientes", newCliente)
      .then((response) => {
        setClientes([...clientes, response.data]);
        setNewCliente({
          nombre: "",
          direccion: "",
          correo: "",
          telefono: "",
          tarifa_mensual: "",
          actividades: [],
          profesores: [],
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al agregar el cliente:", error);
        setError("Hubo un problema al agregar el cliente.");
      });
  };

  // Filtrar clientes por actividad
  const handleFilterByActividad = (actividad) => {
    if (actividad === "Mostrar Todos") {
      fetchClientes();
      setSelectedActividad(null);
    } else {
      axiosInstance
        .get(`/clientes/filtrar-por-actividad/${actividad}`)
        .then((response) => setClientes(response.data))
        .catch((error) =>
          console.error("Error filtrando clientes por actividad:", error)
        );
      setSelectedActividad(actividad);
    }
  };

  // Lista de actividades para filtrar
  const actividadesList = ["Pilates", "Spinning", "Yoga", "Mostrar Todos"];

  return (
    <div className="container bg-black p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Clientes
      </h1>

      {/* Botón para abrir el modal de agregar cliente */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-8"
      >
        Agregar Cliente
      </button>

      {/* Filtros por actividad */}
      <div className="mb-8 text-white">
        {actividadesList.map((actividad) => (
          <span
            key={actividad}
            onClick={() => handleFilterByActividad(actividad)}
            className={`cursor-pointer px-4 py-2 rounded transition duration-300 mr-4 mb-2 inline-block ${
              selectedActividad === actividad
                ? "bg-blue-200 text-white"
                : "hover:bg-green"
            }`}
          >
            {actividad}
          </span>
        ))}
      </div>

      {/* Mostrar errores */}
      {error && <div className="p-4 bg-red-500 text-white">{error}</div>}

      {/* Tabla de clientes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Lista de Clientes
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Actividad</th>
                <th className="hidden sm:table-cell px-4 py-2">Dirección</th>
                <th className="hidden sm:table-cell px-4 py-2">Teléfono</th>
                <th className="hidden sm:table-cell px-4 py-2">Correo</th>
                <th className="hidden sm:table-cell px-4 py-2">
                  Tarifa Mensual
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                // Convertir IDs de actividades a nombres
                const actividadesNombres = cliente.actividades
                  .map((id) => {
                    const actividad = actividades.find((a) => a._id === id);
                    return actividad ? actividad.nombre : "Desconocido";
                  })
                  .join(", ");

                return (
                  <React.Fragment key={cliente._id}>
                    {/* Fila principal (Nombre y Actividad) */}
                    <tr className="border-4 border-gray-700 rounded hover:bg-gray-900 text-white transition duration-300">
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">
                        {cliente.nombre}
                      </td>
                      <td className="px-4 bg-gray-900 text-gray-300 py-2">
                        {actividadesNombres}
                      </td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">
                        {cliente.direccion}
                      </td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">
                        {cliente.telefono}
                      </td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">
                        {cliente.correo}
                      </td>
                      <td className="hidden sm:table-cell px-4 bg-gray-900 text-gray-300 py-2">
                        {cliente.tarifa_mensual}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Clientes;
