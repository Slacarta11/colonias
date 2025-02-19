import axios from "axios";

window.addColonia = function () {
  const Marca = document.getElementById("Marca").value;
  const Nombre = document.getElementById("Nombre").value;
  const Materiales = document.getElementById("Materiales").value;

  const nuevaColonia = {
    // Creamos la variable con los datos a enviar
    Marca,
    Nombre,
    Materiales,
  };
  axios.post("http://localhost:8081/colonias", {
    Marca: Marca,
    Nombre: Nombre,
    Materiales: Materiales,
  });

  document.getElementById("Marca").value = "";
  document.getElementById("Nombre").value = "";
  document.getElementById("Materiales").value = "";
};