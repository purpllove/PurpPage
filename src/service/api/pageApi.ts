import { ref } from 'vue'
import axios from 'axios';

interface Page {
    type: number;
}

export function getAllPage(){
    axios.defaults.baseURL = "http://192.168.8.83:9080/legacy";
    const data = axios.post('/getPages',{});
    return data;
    // return axios.post('/getPages',{});
}

export function getPageById(page:Page){
    return axios.post('/getPages',page);
}