import axios from "axios";

const api = axios.create({
    // baseURL: "https://pokeapi.co/api/v2/",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    }
})

// axios.create({
//     headers: {
//         "content-type":	"application/json; charset=utf-8",
//         'Access-Control-Allow-Origin': '*',

//     }
// });

export const getFinance = () => {
    api.get("https://api.hgbrasil.com/finance?format=json-cors").then((response) => {
        return response;
    })
}

export default api;
