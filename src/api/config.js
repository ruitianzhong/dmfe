
import router from "@/router";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"

axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        console.log("send ", err)
        return err;
    }
)

axios.interceptors.response.use(
    res =>{
        return res
    },
    err =>{
        const { status } = err.response;
        if (status==401 || status==404){
            router.push({ path: "/" })
            
        }
        return Promise.reject(err);

    }
)