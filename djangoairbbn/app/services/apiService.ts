import { getAccessToken, handleRefresh } from "../lib/actions";
import { API_HOST } from "../lib/config";

const apiService={
    get: async function(url: string): Promise<any>{
        console.log('get',url);

        let token=await getAccessToken();

        const doFetch = (token:string | null) => fetch(`${API_HOST}${url}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        return new Promise((resolve,reject)=>{
            doFetch(token)
            .then(async response => {
                if (response.status === 401) {
                    const newToken = await handleRefresh();
                    if (newToken) {
                        return doFetch(newToken);
                    }
                    return response;
                }
                return response;
            })
            .then(async response => {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    console.log('Response:', json);
                    resolve(json);
                } catch {
                    console.log('Non-JSON response:', text);
                    resolve({ error: text });
                }
             })
             .catch(error => {
                reject(error);
             })
        })
    },

    post: async function(url: string,data:any):Promise<any>{
        console.log('post ', url, data);
        let token=await getAccessToken();

        const doFetch = (token:string | null) => fetch(`${API_HOST}${url}`,{
            method:'POST',
            body:data,
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })

        return new Promise((resolve,reject)=>{
            doFetch(token)
            .then(async response => {
                if (response.status === 401) {
                    const newToken = await handleRefresh();
                    if (newToken) {
                        return doFetch(newToken);
                    }
                    return response;
                }
                return response;
            })
            .then(response =>response.json())
             .then((json)=>{
                console.log('Response:',json);

                resolve(json);
             })
             .catch((error=>{
                reject(error);
             }))
        })
    },

    postWithoutToken: async function(url: string,data:any):Promise<any>{
        console.log('post ', url, data);
        return new Promise((resolve,reject)=>{
            fetch(`${API_HOST}${url}`,{
                method:'POST',
                body:data,
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(response =>response.json())
             .then((json)=>{
                console.log('Response:',json);

                resolve(json);
             })
             .catch((error=>{
                reject(error);
             }))
        })
    }
}

export default apiService;