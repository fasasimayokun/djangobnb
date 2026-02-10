import { error } from "console";
import { getAccessToken } from "../lib/actions";

const apiService = {

  get: async function (url: string): Promise<any> {
      const token = await getAccessToken();

      return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(reponse => reponse.json())
      .then((json) => {
        console.log('Response', json);

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });    
    })
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(json => {
        console.log("Response", json);

        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(json => {
        console.log("Response", json);

        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
    });
  },


}

export default apiService;