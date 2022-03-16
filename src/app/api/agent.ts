import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {history} from "../.."
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
const sleep = () => new Promise(resolve => {setTimeout(resolve, 500)});
axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch(status)
    {
        case 400:
            if(data.error) {
                const modelStateErrors: string[] = [];
                for(const key in data.error) {
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            })
            //toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

const resquests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string) => axios.post(url).then(responseBody),
    put: (url: string) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => resquests.get('products'),
    details: (id: number) => resquests.get(`products/${id}`)
}

const testErrors = {
    get400Error: () => resquests.get('buggy/bad-request'),
    get401Error: () => resquests.get('buggy/unauthorized'),
    get404Error: () => resquests.get('buggy/not-found'),
    get500Error: () => resquests.get('buggy/server-error'),
    getValidationError: () => resquests.get('buggy/validation-error')
}

const Basket = {
    get: () => resquests.get('basket'),
    addItem: (productId: number, quantity=1) => resquests.post(`basket?productId=${productId}&quantity=${quantity}`),
    removeItem: (productId: number, quantity=1) => resquests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    testErrors,
    Basket
}
export default agent;