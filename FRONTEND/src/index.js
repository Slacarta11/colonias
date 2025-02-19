import axios from "axios";

window.readColonias = function () { //creamos metodo readcolonias
  axios
    .get("http://localhost:8081/colonias") //endpoint de /colonias
    .then((response) => {
      const coloniaslist = response.data; //es la respuesta que da el backend al frontend
      console.log(coloniaslist);

      const coloniasUl = document.getElementById("colonias"); //document para llamar al HTML, siempre que quieras llamar HTML
      console.log(coloniasUl);

      coloniaslist.forEach((colonia) => { //creamos metodo de array a la variable coloniaslist
        console.log(colonia);
        const listItem = document.createElement("li"); //crea un nuevo elemento HTML de tipo <li>. Este es un "contenedor" vacío
        listItem.appendChild(
          document.createTextNode( // document.createTextNode es una cadena de texto
            colonia.Marca +
              " " +
              colonia.Materiales +
              " " +
              colonia.Nombre +
              " " +
              colonia.ID
          )
        );
        coloniasUl.appendChild(listItem); //appendchild es para añadir lo que este entre parentesis
      });
    });
};