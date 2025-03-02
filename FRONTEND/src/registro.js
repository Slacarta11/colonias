import axios from "axios";

window.addColonia = function () {
  const Marca = document.getElementById("Marca").value;
  const Nombre = document.getElementById("Nombre").value;
  const Materiales = document.getElementById("Materiales").value;

  if (!Marca || !Nombre || !Materiales) {
    alert("Debes rellenar todos los campos para continuar");
    return;
  }

  axios.post("http://localhost:8081/colonias", {
    Marca: Marca,
    Nombre: Nombre,
    Materiales: Materiales,
  });

  document.getElementById("Marca").value = "";
  document.getElementById("Nombre").value = "";
  document.getElementById("Materiales").value = "";
};