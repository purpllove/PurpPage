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
  const data = axios.post('/getPages',page);
  return data;
}

/** getPages */
export const getPages = async (page: ApiPageManagement.Page | null) => {
    axios.defaults.baseURL = "http://192.168.8.83:9080/legacy";
    if (page === null) {
      page = {};
    }
    // const data = await request.post<ApiPageManagement.LegacyPage | null>('/getPages', page);
    const data = axios.post('/getPages',page);
    return (await data).data;
  };
  
  /** 删除网页 */
  export const deletePage = (ids: number[] | null) => {
    axios.defaults.baseURL = "http://192.168.8.83:9080/legacy";
    // const data = request.post<ApiPageManagement.Page[] | null>('/deletePages', ids);
    const data = axios.post('/deletePages',ids);
    return data;
  };
  
  /** 新增修改网页 */
  export const addPage = async (page: ApiPageManagement.Page | null, update: boolean) => {
    axios.defaults.baseURL = "http://192.168.8.83:9080/legacy";
    // const data = await request.post<ApiPageManagement.Page[] | null>(update ? '/addPages' : '/updatePages', page);
    const data = axios.post(update ? '/addPages' : '/updatePages', page);
    return data;
  };