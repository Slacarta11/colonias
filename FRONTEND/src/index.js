import axios from 'axios';

window.readColonias = function(){
    axios.get('http://localhost:8081/colonias')
        .then((response) => {
            const coloniaslist = response.data;
            const coloniasUl= document.getElementById('colonias');

            coloniaslist.forEach(colonia => {
                const listItem = document.createElement('li');//crea un nuevo elemento HTML de tipo <li>. Este es un "contenedor" vacío
                listItem.appendChild(document.createTextNode(colonia.brand + ' (' + colonia.name + ') ' + colonia.description));
                coloniasUl.appendChild(listItem);
                
            });

        });
}  