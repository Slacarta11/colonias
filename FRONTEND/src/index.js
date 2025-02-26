import axios from "axios";

window.readColonias = function () { //creamos metodo readcolonias
  axios
    .get("http://localhost:8081/colonias") //endpoint de /colonias
    .then((response) => {
      const coloniaslist = response.data; //es la respuesta que da el backend al frontend
      const coloniaTable = document.getElementById("tableBody"); //document para llamar al HTML, siempre que quieras llamar HTML
      
      coloniaslist.forEach(colonia => { //creamos metodo de array a la variable coloniaslist
        
        const row = document.createElement('tr');
        row.ID = 'colonia-' + colonia.ID;
        row.innerHTML = '<th>'+ colonia.Marca + '</th>' + 
                        '<th>'+ colonia.Nombre + '</th>' + 
                        '<th>'+ colonia.Materiales + '</th>' + 
                        '<a class="btn btn-primary"href="modificar.html">Modificar</a> <a class="btn btn-danger"href="javascript:eliminarColonia(' + colonia.ID + ')">Eliminar</a>';
                    
        coloniaTable.appendChild(row);
      });

    });

  window.eliminarColonia = function (ID) {
    if (confirm("¿Está seguro de eliminar su colonia?")) {
      axios
        .delete("http://localhost:8081/colonias/" + ID) 
        .then((response) => {
          if (response.status === 204) {
            console.log("Se ha eliminado la colonia");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la colonia:", error);
        });
        
    }
  };
  
};