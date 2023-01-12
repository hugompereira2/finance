import axios from "axios";

const hg_brasil = import.meta.env.VITE_HGBRASIL_API_KEY;

export const getFinance = async () => {
  try {
    const response = axios.get(`https://api.hgbrasil.com/finance?format=json-cors&key=${hg_brasil}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response;
  } catch (error) {
    return error.message;
  }
}

export const getHistory = async (currency = "USD") => {
  try {
    const response = axios.get(`https://economia.awesomeapi.com.br/json/daily`+ `/${currency}-BRL/5`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response;
  } catch (error) {
    return error.message;
  }
}
