import axios from "axios";
import { API_BASE_URL } from "../constants/constants";


export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});