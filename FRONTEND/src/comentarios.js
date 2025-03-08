import axios from "axios";

// Función para leer comentarios
window.readComentarios = function () {
  const coloniaID = new URLSearchParams(window.location.search).get("ID");
  axios
    .get(`http://localhost:8081/COMENTARIOS/${coloniaID}`)
    .then((response) => {
      const comentarios = response.data;
      const comentariosTable = document.getElementById("comentariosTableBody");

      comentariosTable.innerHTML = "";

      comentarios.forEach((comentario) => {
        console.log(comentarios);
        const row = document.createElement("tr");
        row.id = `comentario${comentario.ID}`;
        console.log(row.id);
        row.innerHTML = `
                    <td>${comentario.Descripcion}</td>
                    <td>${comentario.Valoracion}</td>
                    <td>
                        <a class="btn btn-primary" href="modificarComentario.html?ID=${comentario.ID}">Modificar</a>
                        <a class="btn btn-danger" href="javascript:eliminarComentario(${comentario.ID})">Eliminar</a>
                    </td>
                `;
        comentariosTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los comentarios:", error);
    });
};

// Función para agregar un comentario
window.addComentario = function () {
  const coloniaID = new URLSearchParams(window.location.search).get("ID");
  const descripcion = document.getElementById("Descripcion").value;
  const valoracion = document.getElementById("Valoracion").value;

  if (!descripcion || !valoracion) {
    alert("Debes rellenar todos los campos para continuar.");
    return;
  }

  if (valoracion < 1 || valoracion > 5) {
    alert("La valoración debe estar entre 1 y 5.");
    return;
  }

  axios
    .post("http://localhost:8081/COMENTARIOS/" + coloniaID, {
      Descripcion: descripcion,
      Valoracion: valoracion,
    })
    .then((response) => {
      if (response.status === 201) {
        alert("Comentario agregado exitosamente.");
        document.getElementById("Descripcion").value = "";
        document.getElementById("Valoracion").value = "";
        window.readComentarios();
      }
    })
    .catch((error) => {
      console.error("Error al agregar comentario:", error);
      alert("Hubo un error al agregar el comentario.");
    });
};

// Función para eliminar un comentario
window.eliminarComentario = function (comentarioID) {
  if (confirm("¿Estás seguro de eliminar este comentario?")) {
    axios
      .delete(`http://localhost:8081/COMENTARIOS/${comentarioID}`)
      .then((response) => {
        if (response.status === 204) {
          alert("Comentario eliminado exitosamente.");
          const comentarioElement = document.getElementById(
            `comentario${comentarioID}`
          );
          if (comentarioElement) {
            comentarioElement.remove();
          }
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el comentario:", error);
        alert("Hubo un error al eliminar el comentario.");
      });
  }
};

// Función para modificar un comentario
window.modificarComentario = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const comentarioParam = urlParams.get("ID");
  console.log(comentarioParam);

  const Descripcion = document.getElementById("Descripcion").value;
  const Valoracion = document.getElementById("Valoracion").value;

  if (!Descripcion || !Valoracion) {
    alert("Debes rellenar todos los campos para continuar");
    return;
  }

  if (Valoracion < 1 || Valoracion > 5) {
    alert("La valoración debe estar entre 1 y 5.");
    return;
  }

  // Realizamos la solicitud PUT si todas las validaciones son correctas
  if (confirm("¿Está seguro de modificar su comentario?")) {
    axios
      .put(`http://localhost:8081/COMENTARIOS/${comentarioParam}`, {
        Descripcion: Descripcion,
        Valoracion: Valoracion,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Comentario modificado exitosamente.");
          window.location.replace("comentarios.html"); // Redirigir a la lista de comentarios
        }
      })
      .catch((error) => {
        console.error("Error al modificar el comentario:", error);
        alert("Hubo un error al modificar el comentario.");
      });
  }
};
