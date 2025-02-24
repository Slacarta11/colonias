import axios from "axios";

window.readColonias = function () { //creamos metodo readcolonias
  axios
    .get("http://localhost:8081/colonias") //endpoint de /colonias
    .then((response) => {
      const coloniaslist = response.data; //es la respuesta que da el backend al frontend
      const coloniasUl = document.getElementById("colonias"); //document para llamar al HTML, siempre que quieras llamar HTML
      
      coloniaslist.forEach((colonia) => { //creamos metodo de array a la variable coloniaslist
        
        const listItem = document.createElement('li'); //crea un nuevo elemento HTML de tipo <li>. Este es un "contenedor" vacío
        listItem.className = 'list-group-item'
        listItem.appendChild(document.createTextNode(colonia.Marca + " " + colonia.Materiales + " " + colonia.Nombre + " " )// document.createTextNode es una cadena de texto   
        );
        coloniasUl.appendChild(listItem); //appendchild es para añadir lo que este entre parentesis
      });
    });
};