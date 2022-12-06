import axios from "axios";
import authHeader from "../auth-header"

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: authHeader(),
});