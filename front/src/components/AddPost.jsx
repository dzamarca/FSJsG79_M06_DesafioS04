import { errorToast } from "../utils/toast";
import { useState } from "react";

export default function AddPost({ createPost }) {
  const [values, setValues] = useState({
    titulo: "",
    img: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { titulo, img, descripcion } = values;

    if (!titulo.trim() || !img.trim() || !descripcion.trim())
      return errorToast("Todos los campos son obligatorios");

    // Validar largo de URL (img)
    if (img.trim().length > 1000) {
      return errorToast("La URL de la imagen no puede tener más de 1000 caracteres");
    }

    const post = {
      titulo: titulo.trim(),
      img: img.trim(),
      descripcion: descripcion.trim(),
    };

    createPost({ ...post });

    setValues({
      titulo: "",
      img: "",
      descripcion: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label
          htmlFor="titulo"
          className="form-label"
        >
          Titulo
        </label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          name="titulo"
          onChange={handleChange}
          value={values.titulo}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="img"
          className="form-label"
        >
          Imagen URL
        </label>
        <input
          type="text"
          className="form-control"
          id="img"
          name="img"
          onChange={handleChange}
          value={values.img}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="descripcion"
          className="form-label"
        >
          Descripcion
        </label>
        <textarea
          id="descripcion"
          className="form-control"
          name="descripcion"
          onChange={handleChange}
          value={values.descripcion}
        />
      </div>
      <button
        type="submit"
        className="btn btn-light mx-auto d-block"
        disabled={
          !values.titulo.trim() ||
          !values.img.trim() ||
          !values.descripcion.trim() 
        }
      >
        Agregar
      </button>
    </form>
  );
}
