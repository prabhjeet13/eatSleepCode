import axios from 'axios';

export const axiosInstance = axios.create({withCredentials: true});

export const apiConnect = (method,url,bodydata,headers) => {
    return axiosInstance({
        method : `${method}`,
        url : `${url}`,
        data : bodydata ? bodydata : null,
        headers : headers ? headers : null,
    })
} 