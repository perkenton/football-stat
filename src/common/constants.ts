import axios from 'axios';

export const apiUrl = process.env.REACT_APP_API_URL;
export const apiToken = process.env.REACT_APP_API_TOKEN;
export const instance = axios.create({
  baseURL: apiUrl,
  headers: { 'X-Auth-Token': apiToken! }
});