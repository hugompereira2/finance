import axios from "axios";

export const getFinance = async () => {
  try {
    const response = axios.get("api", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    return response;
  } catch (error) {
    return error.message;
  }
}

export const getHistory = async (currency = "USD") => {
  try {
    const response = axios.get(`economia`+ `/${currency}-BRL/5`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    return response;
  } catch (error) {
    return error.message;
  }
}
