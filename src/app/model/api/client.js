//Low-fat wrapper for the amazing axios http client library.
import { create } from "apisauce";

//ipconfig getifaddr en0 to get ip address
const MY_IP = 'http://192.168.1.149';
const PORT = '3001';
const DEVELOPMENT_ADDRESS = `${MY_IP}:${PORT}`;
const PRODUCTION_ADDRESS = 'https://vamplitude-master-server.herokuapp.com/';

const apiClient = create({
    baseURL: PRODUCTION_ADDRESS
})

export default apiClient;
