import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "antd";
nProgress.configure({showSpinner: false});

const http = axios.create({
    // baseURL: process.env.REACT_APP_BE_API,
    
    headers: {
        Authorization: 'PVEAPIToken=root@pam!abcdefgh=eee0a9ca-16c9-44aa-a2a4-853a4844f760'
    }
    // timeout: 3000
});


http.interceptors.request.use(
    config => {

        //
        nProgress.start();

    
        return config;
    },
    error => {
        //
        nProgress.done();
  
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    response => {
   
        //
        nProgress.done();

        return response;
    },
    error => {
        //
        nProgress.done();

        if(error?.response?.status !== 200){

            switch (error?.response?.status) {
                case 403:
                    message.warning("请重新登录 !").then(()=>{
                        // userStore.logout();
                        // window.location.href = "/";
                    })
                    
                    break;
            
                default:
                    if(error?.response )
                        message.error(error?.response?.data?.message)
                    else
                        message.error(`请检查网络连接 ${error.message}`)
                    break;
            }
        }
     
        return Promise.reject(error);
    }
)

export default http
