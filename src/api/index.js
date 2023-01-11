import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hgbrasil.com/",
  headers: {
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
  api.get("finance", {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    return response;
  })
}

export default api;
