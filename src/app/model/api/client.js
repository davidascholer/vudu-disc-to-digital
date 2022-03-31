//Low-fat wrapper for the amazing axios http client library.
import { create } from "apisauce";

//ipconfig getifaddr en0 to get ip address
const MY_IP = process.env.REACT_APP_MY_IP;
const PORT = '3001';
const DEVELOPMENT_ADDRESS = `${MY_IP}:${PORT}`;
const PRODUCTION_ADDRESS = process.env.REACT_APP_PRODUCTION_ADDRESS;

const apiClient = create({
    baseURL: PRODUCTION_ADDRESS
})

export default apiClient;
