import axios from 'axios';

window.readColonias = function(){
    axios.get('http://localhost:8080/colonias')
        .then((response) => {
            const coloniaslist = responde.data;

        });
}  