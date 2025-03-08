import axios from "axios";

window.readColonias = function () { //creamos metodo readcolonias
  axios
    .get("http://localhost:8081/colonias") //endpoint de /colonias
    .then((response) => {
      const coloniaslist = response.data; //es la respuesta que da el backend al frontend
      const coloniaTable = document.getElementById("tableBody"); //document para llamar al HTML, siempre que quieras llamar HTML
      
      coloniaslist.forEach(colonia => { //creamos metodo de array a la variable coloniaslist
        
        const row = document.createElement('tr');
        row.id = 'colonia' + colonia.ID;
        console.log (row)
        row.innerHTML = '<th>'+ colonia.Marca + '</th>' + 
                        '<th>'+ colonia.Nombre + '</th>' + 
                        '<th>'+ colonia.Materiales + '</th>' + 
                        '<a class="btn btn-primary" href="modificar.html?ID=' + colonia.ID + '">Modificar</a> <a class="btn btn-danger" href="javascript:eliminarColonia(' + colonia.ID + ')">Eliminar</a><a class="btn btn-primary" href="comentarios.html?ID=' + colonia.ID + '">Comentarios</a>';
                    
        coloniaTable.appendChild(row);
      });

    });
};

  window.eliminarColonia = function (ID) {
    if (confirm("¿Está seguro de eliminar su colonia?")) {
      axios
        .delete("http://localhost:8081/colonias/" + ID)
        .then((response) => {
          if (response.status === 204) {
            console.log("Se ha eliminado la colonia");

            const coloniaElement = document.getElementById("colonia" + ID);
            console.log("funciona,", coloniaElement);
            if (coloniaElement) {
              coloniaElement.remove();
            }
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la colonia:", error);
        });
    }
  };

  window.modificarColonia = function () {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("ID");
    console.log(myParam)

    const Marca = document.getElementById("Marca").value;
    const Nombre = document.getElementById("Nombre").value;
    const Materiales = document.getElementById("Materiales").value;

    
    
    if (confirm("¿Está seguro de modificar su colonia?")) {

      if (!Marca || !Nombre || !Materiales) {
        alert("Debes rellenar todos los campos para continuar");
        return;
      }

      axios
        .put("http://localhost:8081/colonias/" + myParam, {
          Marca: Marca,
          Nombre: Nombre,
          Materiales: Materiales,
        })
        
        

        .then((response) => {
          if (response.status === 204) {
            console.log("Se ha modificado la colonia");
          }
          window.location.replace("index.html");

        
        })
        .catch((error) => {
          console.error("Error al modificar la colonia:", error);
        });

    }
  };




  