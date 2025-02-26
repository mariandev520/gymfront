import React from 'react';

const ClienteForm = ({ onSubmit, onCancel, cliente, actividades, profesores, isEdit = false }) => {
  const [formData, setFormData] = React.useState(cliente || {
    nombre: '',
    direccion: '',
    correo: '',
    telefono: '',
    tarifa_mensual: '',
    actividades: [],
    profesores: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Nombre del cliente"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Dirección del cliente"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Correo del cliente"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Teléfono del cliente"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tarifa Mensual</label>
            <input
              type="number"
              name="tarifa_mensual"
              value={formData.tarifa_mensual}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Tarifa mensual"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Actividades</label>
            <select
              name="actividades"
              value={formData.actividades}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              multiple
              required
            >
              {actividades.map(actividad => (
                <option key={actividad.id} value={actividad.id}>
                  {actividad.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profesores</label>
            <select
              name="profesores"
              value={formData.profesores}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              multiple
              required
            >
              {profesores.map(profesor => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {isEdit ? 'Guardar Cambios' : 'Agregar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;