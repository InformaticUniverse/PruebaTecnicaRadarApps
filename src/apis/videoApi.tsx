import axios from "axios";

//En produccion se coloca en un archivo .env
const API_KEY = 'DdKJlVIJvMdeyzEIOLRdu4HPjFV9NxKyPHbkJbvsRucIBihK7Owte88j'

export const videoApi = axios.create({
  baseURL: 'https://api.pexels.com/videos',
  headers: {
    Authorization: API_KEY
  }
})

