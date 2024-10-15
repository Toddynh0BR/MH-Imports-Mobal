import axios from "axios";

export const api = axios.create({
    baseURL: "https://mh-imports-back.onrender.com"
})
