import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnect = (method,url,bodydata,headers) => {
    return axiosInstance({
        method : `${method}`,
        url : `${url}`,
        data : bodydata ? bodydata : null,
        headers : headers ? headers : null
    })
} 